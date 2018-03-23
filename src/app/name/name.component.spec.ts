import { StatusComponent } from './../status/status.component';
import {async, TestBed, ComponentFixture, fakeAsync } from '@angular/core/testing';

import { NameComponent } from './name.component';
import {  FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { TextComponent } from '../text/text.component';
import { StatusService } from '../services/status/status.service';

describe('NameComponent', () => {
  let component: NameComponent;
  let fixture: ComponentFixture<NameComponent>;
  let compiled;
  let inputElement: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        NameComponent,
        TextComponent,
        StatusComponent
      ],
      // schemas: [ NO_ERRORS_SCHEMA],
      providers: [StatusService],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ]
    })
      .compileComponents();
  });
  describe('test not required', () => {
    beforeEach(async(() => {
        fixture = TestBed.createComponent(NameComponent);
        component = fixture.componentInstance;
        component.name = 'first_name';
        component.submitted = false;
        component.group = new FormGroup({});
    }));
    it('should be created', async( () => {
      expect(component).toBeTruthy();
    }));
    it('should not display error when input is touched', fakeAsync(() => {

      component.ngOnInit();
      fixture.detectChanges();
      compiled = fixture.debugElement.nativeElement;
      inputElement = compiled.querySelector('input');
      const control = component.group.controls.first_name;
      // without event input no value will be set
      inputElement.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(control.valid).toEqual(true);
      expect(control.pristine).toEqual(true);
      expect(control.touched).toEqual(true);
      expect(control.value).toEqual('');
      expect(compiled.querySelector('.first_name-error').innerText).toEqual('');
      let errors = {};
      const name = component.group.controls['first_name'];
      errors = name.errors || {};
      expect(errors['required']).toBeFalsy();
    }));
    it('should not display error when input is touched', fakeAsync(() => {
      component.required = 'true';
      component.ngOnInit();
      fixture.detectChanges();
      compiled = fixture.debugElement.nativeElement;
      inputElement = compiled.querySelector('input');
      const control = component.group.controls.first_name;
      // without event input no value will be set
      inputElement.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(control.valid).toEqual(false);
      expect(control.pristine).toEqual(true);
      expect(control.touched).toEqual(true);
      expect(control.value).toEqual('');
      expect(compiled.querySelector('.first_name-error').innerText).toEqual('');
      let errors = {};
      const name = component.group.controls['first_name'];
      errors = name.errors || {};
      expect(errors['required']).toEqual(true);
    }));
  });
});
