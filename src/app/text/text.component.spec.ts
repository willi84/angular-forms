import {async, TestBed, ComponentFixture, tick,  fakeAsync } from '@angular/core/testing';

import { TextComponent } from './text.component';
import { FormControl, FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { By } from '@angular/platform-browser';

describe('TextComponent', () => {
  let component: TextComponent;
  let fixture: ComponentFixture<TextComponent>;
  let compiled;
  let inputElement: any;

  function showNoError( _compiled, _component) {
   
      
      const errorElement = _compiled.querySelector('div');
      console.log(errorElement);
      const errorStyles = errorElement.querySelector('div').getAttribute('style');
      expect(errorStyles).toMatch('visibility: visible');

      const errorMessage = _compiled.querySelector('[name="error-message"]');
      const errorRequired = _compiled.querySelector('[name="error-required"]');
      const errorPattern = _compiled.querySelector('[name="error-pattern"]');
      const errorDefault = _compiled.querySelector('[name="error-default"]');
      const errorIcon = errorElement.querySelector('[name="error-icon"]');

      console.log(errorPattern);
      expect(errorIcon.getAttribute('hidden')).toBeFalsy();
      expect(errorRequired.getAttribute('hidden')).toBeFalsy();
      expect(errorMessage.getAttribute('style')).toMatch('visibility: hidden');
      expect(errorPattern.getAttribute('hidden')).toEqual('');
      expect(errorDefault.getAttribute('hidden')).toEqual('');
      // expect(errorIcon.getAttribute('style')).toMatch('visibility: visible');
      // expect(errorRequired.getAttribute('style')).toMatch('visibility: hidden');
      // expect(errorPattern.getAttribute('style')).toMatch('visibility: hidden');
      // expect(errorDefault.getAttribute('style')).toMatch('visibility: hidden');


  }
  function showRequired( _compiled, _component) {
   
      
    const errorElement = _compiled.querySelector('div');
    console.log(errorElement);
    const errorStyles = errorElement.querySelector('div').getAttribute('style');
    expect(errorStyles).toMatch('visibility: visible');

    const errorMessage = _compiled.querySelector('[name="error-message"]');
    const errorRequired = _compiled.querySelector('[name="error-required"]');
    const errorPattern = _compiled.querySelector('[name="error-pattern"]');
    const errorDefault = _compiled.querySelector('[name="error-default"]');
    const errorIcon = errorElement.querySelector('[name="error-icon"]');

    console.log(errorPattern);
    expect(errorIcon.getAttribute('hidden')).toBeFalsy();
    expect(errorRequired.getAttribute('hidden')).toBeFalsy();
    expect(errorMessage.getAttribute('style')).toMatch('visibility: visible');
    expect(errorPattern.getAttribute('hidden')).toEqual('');
    expect(errorDefault.getAttribute('hidden')).toEqual('');
    // expect(errorIcon.getAttribute('style')).toMatch('visibility: visible');
    // expect(errorRequired.getAttribute('style')).toMatch('visibility: hidden');
    // expect(errorPattern.getAttribute('style')).toMatch('visibility: hidden');
    // expect(errorDefault.getAttribute('style')).toMatch('visibility: hidden');


}

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TextComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ]
    })
      .compileComponents();

      
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TextComponent);
    component = fixture.componentInstance;
    component.name = 'foo';
    component.submitted = false;
    component.required = 'true';
    component.group = new FormGroup({
      foo:   new FormControl('', [Validators.required])
    });
    component.ngOnInit();
    // component.submitted = false;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    inputElement = compiled.querySelector('input');
  }));
  describe('not submitted', () => {

    it('should be created', async( () => {
      expect(component).toBeTruthy();
    }));
    it('should not display error when input is touched', fakeAsync(() => {
      const control = component.group.controls.foo;
      // without event input no value will be set
      inputElement.dispatchEvent(new Event('blur'));

      fixture.detectChanges();
      expect(control.valid).toEqual(false);
      expect(control.pristine).toEqual(true);
      expect(control.touched).toEqual(true);
      expect(control.value).toEqual('');
      expect(component.showError).toEqual('');
    }));
    it('should not display error when input is given', fakeAsync(() => {
      const control = component.group.controls.foo;
      const name = component.group.controls['foo'];
      // without event input no value will be set
      inputElement.value = '';
      inputElement.dispatchEvent(new Event('blur'));
      inputElement.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      // tick();
      expect(control.valid).toEqual(false);
      expect(control.pristine).toEqual(false);
      expect(control.touched).toEqual(true);
      expect(control.value).toEqual('');
      expect(component.showError).toEqual('');

    }));
    it('should not display error when input is given', fakeAsync(() => {
      const control = component.group.controls.foo;
      const name = component.group.controls['foo'];
      // without event input no value will be set
      inputElement.value = 'xxx';
      inputElement.dispatchEvent(new Event('blur'));
      inputElement.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      expect(control.valid).toEqual(true);
      expect(control.pristine).toEqual(false);
      expect(control.touched).toEqual(true);
      expect(control.value).toEqual('xxx');
      expect(component.showError).toEqual('');

// const bgColor = errorElement.nativeElement.style.css;
//   expect(bgColor).toBe('yellow');

      // let errors = {};
      // const name = component.group.controls['foo'];
      // errors = name.errors || {};
      // expect(errors['required']).toEqual(true);
    }));

  });

  describe('submitted', () => {
    beforeEach(async(() => {
      component.submitted = true;
    }));
    it('should be created', async( () => {
      expect(component).toBeTruthy();
    }));
    it('should display error when input is active', fakeAsync(() => {
      const control = component.group.controls.foo;
      const name = component.group.controls['foo'];
      // without event input no value will be set
      inputElement.dispatchEvent(new Event('blur'));
      inputElement.dispatchEvent(new Event('focus'));

      fixture.detectChanges();
      expect(control.valid).toEqual(false);
      expect(control.pristine).toEqual(true);
      expect(control.touched).toEqual(true);
      expect(control.value).toEqual('');
      expect(component.showError).toEqual('required');

      // let errors = {};
      // errors = name.errors || {};
      // expect(errors['required']).toEqual(true);
      showRequired( compiled, component);

      // visibility: visible;
    }));
    it('should not display error when input is touched', fakeAsync(() => {
      const control = component.group.controls.foo;
      const name = component.group.controls['foo'];
      // without event input no value will be set
      inputElement.dispatchEvent(new Event('blur'));
      // inputElement.dispatchEvent(new Event('focus'));

      fixture.detectChanges();
      expect(control.valid).toEqual(false);
      expect(control.pristine).toEqual(true);
      expect(control.touched).toEqual(true);
      expect(control.value).toEqual('');
      expect(component.showError).toEqual('required');

      // let errors = {};
      // errors = name.errors || {};
      // expect(errors['required']).toEqual(true);
      showNoError( compiled, component);

      // visibility: visible;
    }));
    it('should not display error when input is given', fakeAsync(() => {
      const control = component.group.controls.foo;
      const name = component.group.controls['foo'];
      // without event input no value will be set
      inputElement.value = '';
      inputElement.dispatchEvent(new Event('blur'));
      inputElement.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      // tick();
      expect(control.valid).toEqual(false);
      expect(control.pristine).toEqual(false);
      expect(control.touched).toEqual(true);
      expect(control.value).toEqual('');
      expect(component.showError).toEqual('required');

      let errors = {};
      errors = name.errors || {};
      expect(errors['required']).toEqual(true);

      inputElement.dispatchEvent(new Event('focus'));
      fixture.detectChanges();

      const errorElement = compiled.querySelector('div');
      const errorMessage = compiled.querySelector('[name="error-message"]');
      const errorRequired = compiled.querySelector('[name="error-required"]');
      const errorPattern = compiled.querySelector('[name="error-pattern"]');
      const errorDefault = compiled.querySelector('[name="error-default"]');
      const errorIcon = errorElement.querySelector('[name="error-icon"]');

      console.log(errorIcon);
      expect(errorIcon.getAttribute('hidden')).toBeFalsy(); 
      // console.log(errorIcon.getAttribute('style'));
      // expect(errorIcon.getAttribute('style')).toMatch('visibility: visible');
      expect(errorMessage.getAttribute('style')).toMatch('visibility: visible');

      // const styles = errorElement.querySelector('div').getAttribute('style');
      // console.log(errorElement.querySelector('[name="error-message"]').textContent);
      // console.log(errorElement.querySelector('[name="error-icon"]'));
      // expect(styles).toMatch('visibility: visible');

    }));
    it('should not display error when input is given', fakeAsync(() => {
      const control = component.group.controls.foo;
      const name = component.group.controls['foo'];
      // without event input no value will be set
      inputElement.value = 'xxx';
      inputElement.dispatchEvent(new Event('blur'));
      inputElement.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      expect(control.valid).toEqual(true);
      expect(control.pristine).toEqual(false);
      expect(control.touched).toEqual(true);
      expect(control.value).toEqual('xxx');
      expect(component.showError).toEqual('');

      let errors = {};
      errors = name.errors || {};
      expect(errors['required']).toEqual(undefined);
    }));

  });
});

