import {async, TestBed, ComponentFixture, tick,  fakeAsync } from '@angular/core/testing';

import { TextComponent } from './text.component';
import { FormControl, FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { By } from '@angular/platform-browser';
import { customMatchers, expect } from '../../utils/testing/custom-matcher';



describe('TextComponent', () => {
  let component: TextComponent;
  let fixture: ComponentFixture<TextComponent>;
  let compiled;
  let inputElement: any;

  

  function showNoError( _compiled, _component) {
    expect(_compiled).hideErrorMessage('required');
    expect(_compiled).hideErrorMessage('pattern');
    expect(_compiled).hideErrorMessage('default');
    // check dass nicht wackelt
    expect(_compiled).showErrorIcon(true);

  }
  function showSuccess( _compiled, _component) {
    expect(_compiled).hideErrorMessage('required');
    expect(_compiled).hideErrorMessage('pattern');
    expect(_compiled).showErrorMessage('default');
    expect(_compiled).showErrorIcon(false);
  }
  function showDefault( _compiled, _component) {
    // @TODO: müsste hiden show error messag esein
    expect(_compiled).showHiddenErrorMessage('default');
    expect(_compiled).hideErrorMessage('required');


    expect(_compiled).hideErrorMessage('pattern');
    expect(_compiled).showErrorIcon(false);
  }
  function showRequired( _compiled, _component) {
    expect(_compiled).showErrorMessage('required');
    expect(_compiled).hideErrorMessage('pattern');
    expect(_compiled).hideErrorMessage('default');
    expect(_compiled).showErrorIcon(true);
}

  beforeEach(() => {

    jasmine.addMatchers(customMatchers);
    TestBed.configureTestingModule({
      declarations: [
        TextComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ]
    }).compileComponents();
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

    }));
    it('should not display error when input is give and correct', fakeAsync(() => {
      const control = component.group.controls.foo;
      const name = component.group.controls['foo'];
      // without event input no value will be set
      inputElement.dispatchEvent(new Event('focus'));
      inputElement.value = 'xxx';
      inputElement.dispatchEvent(new Event('input'));
      inputElement.dispatchEvent(new Event('blur'));

      fixture.detectChanges();
      expect(control.valid).toEqual(true);
      expect(control.pristine).toEqual(false);
      expect(control.touched).toEqual(true);
      expect(control.value).toEqual('xxx');
      expect(component.showError).toEqual('');

      showDefault( compiled, component);
      component.submitted = true;
      fixture.detectChanges();
      showDefault( compiled, component);

    }));

  });

  describe('when submitted', () => {
    beforeEach(async(() => {
      component.submitted = true;
    }));
    it('should be created', async( () => {
      expect(component).toBeTruthy();
    }));
    it('should display required error when input is active', fakeAsync(() => {
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
    it('should display no error after input has correctly changed', fakeAsync(() => {
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

      inputElement.value = 'xxx';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(control.valid).toEqual(true);
      expect(control.pristine).toEqual(false);
      expect(control.touched).toEqual(true);
      expect(control.value).toEqual('xxx');
      expect(component.showError).toEqual('');

      // let errors = {};
      // errors = name.errors || {};
      // expect(errors['required']).toEqual(true);
      showSuccess( compiled, component);


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
    }));
  });
});

