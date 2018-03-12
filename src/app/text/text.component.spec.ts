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
  let _oldValue: string;

  function doAction( action: string , new_value?: string) {

    switch (action) {
      case 'change_input':
        // without event input no value will be set
        inputElement.dispatchEvent(new Event('focus'));
        inputElement.value = new_value;
        inputElement.dispatchEvent(new Event('input'));
        break;
      case 'changed_input':
        // without event input no value will be set
        inputElement.dispatchEvent(new Event('focus'));
        inputElement.value = new_value;
        inputElement.dispatchEvent(new Event('input'));
        inputElement.dispatchEvent(new Event('blur'));
        break;
      case 'touch':
        inputElement.dispatchEvent(new Event('focus'));
        break;
      case 'touched':
        inputElement.dispatchEvent(new Event('focus'));
        inputElement.dispatchEvent(new Event('blur'));
        break;
      case 'active_input':
        inputElement.dispatchEvent(new Event('blur'));
        inputElement.dispatchEvent(new Event('focus'));
        break;
      case 'default':
        // inputElement.dispatchEvent(new Event('input'));
        break;
      }
      fixture.detectChanges();

  }


  function showMessage(action, _compiled, _component) {

    switch (action) {
      case 'has_error':
        expect(_compiled).hideErrorMessage('required');
        expect(_compiled).hideErrorMessage('pattern');
        expect(_compiled).hideErrorMessage('default');
        // check dass nicht wackelt
        expect(_compiled).showErrorIcon(true);
        expect(_component.hasFocus).toEqual(false);
        break;
      case 'has_success':
        expect(_compiled).hideErrorMessage('required');
        expect(_compiled).hideErrorMessage('pattern');
        expect(_compiled).showErrorMessage('default');
        expect(_compiled).showErrorIcon(false);
        expect(_component.hasFocus).toEqual(true);
        break;
      case 'default':
        expect(_compiled).showHiddenErrorMessage('default');
        expect(_compiled).hideErrorMessage('required');
        expect(_compiled).hideErrorMessage('pattern');
        expect(_compiled).showErrorIcon(false);
        expect(_component.hasFocus).toEqual(false);
        break;

      // @TODO: normalize
      case 'default_active':
        expect(_compiled).showErrorMessage('default');
        expect(_compiled).hideErrorMessage('required');
        expect(_compiled).hideErrorMessage('pattern');
        expect(_compiled).showErrorIcon(false);
        expect(_component.hasFocus).toEqual(true);
        break;
      case 'error_required':
        expect(_compiled).showErrorMessage('required');
        expect(_compiled).hideErrorMessage('pattern');
        expect(_compiled).hideErrorMessage('default');
        expect(_compiled).showErrorIcon(true);
        expect(_component.hasFocus).toEqual(true);
        break;
      case 'error_pattern':
        expect(_compiled).showErrorMessage('pattern');
        expect(_compiled).hideErrorMessage('required');
        expect(_compiled).hideErrorMessage('default');
        expect(_compiled).showErrorIcon(true);
        expect(_component.hasFocus).toEqual(true);
        break;
    }
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

  describe('simple required', () => {
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
      _oldValue = inputElement.value;
    }));
    describe('not submitted', () => {
      it('should be created', async( () => {
        expect(component).toBeTruthy();
      }));
      it('should display default state when input is touched', fakeAsync(() => {
        // set initial state
        doAction('touched');

        // test new state
        expect(component).isInvalid('');
        showMessage('default',  compiled, component);
      }));
      it('should display default state when input is not changed', fakeAsync(() => {
        // set initial state
        doAction('changed_input',  '');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('');
        showMessage('default',  compiled, component);
      }));
      it('should display default state when input is changing', fakeAsync(() => {
        // set initial state
        doAction('change_input', 'xxx');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default_active',  compiled, component);
      }));
      it('should display default state when input is changed', fakeAsync(() => {
        // set initial state
        doAction('changed_input', 'xxx');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default',  compiled, component);
      }));
      it('should display default state when input is given, submitted and correct', fakeAsync(() => {
        // set initial state
        doAction('changed_input',  'xxx');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default',  compiled, component);

        // subtmit
        const _newValue = inputElement.value;
        component.submitted = true;
        fixture.detectChanges();

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _newValue} );
        expect(component).isValid('');
        showMessage('default',  compiled, component);
      }));
    });
    describe('when submitted with value', () => {
      beforeEach(async(() => {
        doAction('change_input', 'xx');
        component.submitted = true;
        _oldValue = inputElement.value;
      }));
      it('should be created', async( () => {
        expect(component).toBeTruthy();
      }));
      it('should display no error', fakeAsync(() => {
        // set initial state
        // doAction('default');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('has_success',  compiled, component);
      }));
      it('should display no error when input is active', fakeAsync(() => {
        // set initial state
        doAction('active_input');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('has_success',  compiled, component);
      }));
    });
    describe('when submitted without value', () => {
      beforeEach(async(() => {
        component.submitted = true;
      }));
      it('should be created', async( () => {
        expect(component).toBeTruthy();
      }));
      it('should display error state but no text', fakeAsync(() => {
        // set initial state
        doAction('default');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('required');
        showMessage('has_error',  compiled, component);
      }));
      it('should display required error when input is active', fakeAsync(() => {
        // set initial state
        doAction('active_input');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('required');
        showMessage('error_required',  compiled, component);
      }));
      it('should display no error after input has correctly changed', fakeAsync(() => {
        // set initial state
        doAction('active_input');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('required');
        showMessage('error_required',  compiled, component);

        // set new state
        doAction('change_input', 'xxx');

        // test renewed state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('has_success',  compiled, component);
      }));
      it('should display default state when input is touched', fakeAsync(() => {
        // set initial state
        doAction('touched');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('required');
        showMessage('has_error',  compiled, component);
      }));
    });
  });
  describe('pattern', () => {
    beforeEach(async(() => {
      fixture = TestBed.createComponent(TextComponent);
      component = fixture.componentInstance;
      component.name = 'foo';
      component.submitted = false;
      component.required = 'true';
      component.group = new FormGroup({
        foo:   new FormControl('', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')])
      });
      component.ngOnInit();
      // component.submitted = false;
      fixture.detectChanges();
      compiled = fixture.debugElement.nativeElement;
      inputElement = compiled.querySelector('input');
      _oldValue = inputElement.value;
    }));
    describe('not submitted', () => {
      it('should be created', async( () => {
        expect(component).toBeTruthy();
      }));
      it('should display default state when input is touched', fakeAsync(() => {
        // set initial state
        doAction('touched');

        // test new state
        expect(component).isInvalid('');
        showMessage('default',  compiled, component);
      }));
      it('should display default state when input is not changed', fakeAsync(() => {
        // set initial state
        doAction('changed_input',  '');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('');
        showMessage('default',  compiled, component);
      }));
      it('should display default state when input is changing', fakeAsync(() => {
        // set initial state
        doAction('change_input', 'xxx');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('');
        showMessage('default_active',  compiled, component);
      }));
      it('should display default state when input is changed', fakeAsync(() => {
        // set initial state
        doAction('changed_input', 'xxx');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('');
        showMessage('default',  compiled, component);
      }));
      it('should display error state when is given, submitted and incorrect', fakeAsync(() => {
        // set initial state
        doAction('changed_input',  'xxx');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('');
        showMessage('default',  compiled, component);

        // subtmit
        const _newValue = inputElement.value;
        component.submitted = true;
        fixture.detectChanges();

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _newValue} );
        expect(component).isInvalid('pattern');
        showMessage('has_error',  compiled, component);
      }));
    });
    describe('when submitted with value', () => {
      beforeEach(async(() => {
        doAction('changed_input', 'xx');
        component.submitted = true;
        _oldValue = inputElement.value;
      }));
      it('should be created', async( () => {
        expect(component).toBeTruthy();
      }));
      it('should display error state after submit', fakeAsync(() => {
        doAction('default');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('pattern');
        showMessage('has_error',  compiled, component);
      }));
      it('should display error when input is active', fakeAsync(() => {
        // set initial state
        doAction('active_input');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('pattern');
        showMessage('error_pattern',  compiled, component);
      }));
    });
    describe('when submitted without value', () => {
      beforeEach(async(() => {
        component.submitted = true;
      }));
      it('should be created', async( () => {
        expect(component).toBeTruthy();
      }));
      it('should display error but no text', fakeAsync(() => {
        // set initial state
        doAction('default');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('required');
        showMessage('has_error',  compiled, component);
      }));
      it('should display required error when input is active', fakeAsync(() => {
        // set initial state
        doAction('active_input');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('required');
        showMessage('error_required',  compiled, component);
      }));
      it('should display no error after input has correctly changed', fakeAsync(() => {
        // set initial state
        doAction('active_input');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('required');
        showMessage('error_required',  compiled, component);

        // set new state
        doAction('change_input', 'xxx');

        // test renewed state, should show Pattenr error
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('pattern');
        showMessage('error_pattern',  compiled, component);

        // type in correct data
        doAction('change_input', 'xxx@adsfdf.de');

        // test renewed state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('has_success',  compiled, component);
      }));
      it('should display default state when input is touched', fakeAsync(() => {
        // set initial state
        doAction('touched');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('required');
        showMessage('has_error',  compiled, component);
      }));
    });
  });
});

