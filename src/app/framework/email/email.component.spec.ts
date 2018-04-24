// angular
import { async, TestBed, ComponentFixture,  fakeAsync, TestModuleMetadata } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';

// to be tested
import { EmailComponent } from './email.component';

// shared
import { StatusComponent } from '@shared/status/status.component';
import { TextComponent } from '@shared/text/text.component';

// services
import { StatusService } from '@services/status/status.service';

// testing
import { setUpTestBed } from '@utils/testing/make-tests-faster-again';

describe('EmailComponent', () => {
  let component: EmailComponent;
  let fixture: ComponentFixture<EmailComponent>;
  let compiled;
  let inputElement: any;

  const moduleDef: TestModuleMetadata = {
    declarations: [
      EmailComponent,
      TextComponent,
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
    fixture = TestBed.createComponent(EmailComponent);
    component = fixture.componentInstance;

    component.tagName = 'email';
    component.submitted = false;
    component.group = new FormGroup({
    });
    // component.ngOnInit();
    // // component.submitted = false;
    // fixture.detectChanges();
    // compiled = fixture.debugElement.nativeElement;
    // inputElement = compiled.querySelector('input');


    // component.group = new FormGroup({
    //   email:   new FormControl('', Validators.required),
    // })
    // component.ngOnInit();
    // // component.submitted = false;
    // fixture.detectChanges();
    // compiled = fixture.debugElement.nativeElement;
    // inputElement = compiled.querySelector('input[formcontrolname="email"]');
  }));

  it('should be created', async( () => {
    expect(component).toBeTruthy();
  }));
  it('should not display error when input is touched', fakeAsync(() => {
    component.required = 'true';
    component.ngOnInit();
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    inputElement = compiled.querySelector('input');
    const control = component.group.controls.email;
    // without event input no value will be set
    inputElement.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    expect(control.valid).toEqual(false);
    expect(control.pristine).toEqual(true);
    expect(control.touched).toEqual(true);
    expect(control.value).toEqual('');
    expect(compiled.querySelector('.email-error').innerText).toEqual('');
    let errors = {};
    const name = component.group.controls['email'];
    errors = name.errors || {};
    expect(errors['required']).toEqual(true);
  }));
  it('should not display error when input is given', fakeAsync(() => {
    component.required = 'true';
    component.ngOnInit();
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    inputElement = compiled.querySelector('input');
    const control = component.group.controls.email;
    // without event input no value will be set
    inputElement.value = 'xxx';
    inputElement.dispatchEvent(new Event('blur'));
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(control.valid).toEqual(false);
    expect(control.pristine).toEqual(false);
    expect(control.touched).toEqual(true);
    expect(control.value).toEqual('xxx');

    expect(compiled.querySelector('.email-error').innerText).not.toContain('Name is required');
    const errors = control.errors || {};
    expect(errors['required']).toEqual(undefined);
  }));
  it('should not display error when input is given', fakeAsync(() => {
    component.required = 'false';
    component.ngOnInit();
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    inputElement = compiled.querySelector('input');
    const control = component.group.controls.email;
    // without event input no value will be set
    inputElement.value = 'xxx';
    inputElement.dispatchEvent(new Event('blur'));
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(control.valid).toEqual(false);
    expect(control.pristine).toEqual(false);
    expect(control.touched).toEqual(true);
    expect(control.value).toEqual('xxx');

    expect(compiled.querySelector('.email-error').innerText).not.toContain('Name is required');
    const errors = control.errors || {};
    expect(errors['required']).toEqual(undefined);
  }));
});
