// angular
import { async, TestBed, ComponentFixture, fakeAsync, TestModuleMetadata } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';

// to be tested
import { MessageComponent } from './message.component';

// shared
import { TextAreaComponent } from '@shared/textarea/textarea.component';
import { StatusComponent } from '@shared/status/status.component';

// services
import { StatusService } from '@services/status/status.service';

// testing
import { setUpTestBed } from '@utils/testing/make-tests-faster-again';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let compiled;
  let inputElement: any;

  const moduleDef: TestModuleMetadata = {
    declarations: [
      MessageComponent,
      TextAreaComponent,
      StatusComponent
    ],
    providers: [StatusService],
    imports: [
      FormsModule,
      ReactiveFormsModule,
    ]
};
setUpTestBed(moduleDef);


  beforeEach(async(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;

    component.tagName = 'message';
    component.submitted = false;
    component.required = 'true';
    component.group = new FormGroup({
      message:  new FormControl('', [Validators.required])
    });
    component.ngOnInit();
    // component.submitted = false;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    inputElement = compiled.querySelector('textarea');
  }));

  it('should be created', async( () => {
    expect(component).toBeTruthy();
  }));
  it('should not display error when input is touched', fakeAsync(() => {
    const control = component.group.controls.message;
    // without event input no value will be set
    inputElement.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    expect(control.valid).toEqual(false);
    expect(control.pristine).toEqual(true);
    expect(control.touched).toEqual(true);
    expect(control.value).toEqual('');
    expect(compiled.querySelector('.message-error').innerText).toEqual('');
    let errors = {};
    const name = component.group.controls['message'];
    errors = name.errors || {};
    expect(errors['required']).toEqual(true);
  }));
  xit('should not display error when input is given', fakeAsync(() => {
    const control = component.group.controls.message;
    // without event input no value will be set
    inputElement.value = 'xxx';
    inputElement.dispatchEvent(new Event('blur'));
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(control.valid).toEqual(true);
    expect(control.pristine).toEqual(false);
    expect(control.touched).toEqual(true);
    expect(control.value).toEqual('xxx');

    expect(compiled.querySelector('.message-error').innerText).not.toContain('Name is required');
    const errors = control.errors || {};
    expect(errors['required']).toEqual(undefined);
    // let errors = {};
    // const name = component.group.controls['message'];
    // errors = name.errors || {};
    // expect(errors['required']).toEqual(true);
  }));
});
