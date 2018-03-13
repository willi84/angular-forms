import {async, TestBed, ComponentFixture, fakeAsync } from '@angular/core/testing';

import { TextComponent } from './text.component';
import { FormControl, FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
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

  // @TODO: extract to custom matcher
  function showMessage(action) {
    const _compiled = fixture.debugElement.nativeElement;
    const _component = fixture.componentInstance;
    switch (action) {
      case 'has_error':
        expect(_compiled).hideErrorMessage('required');
        expect(_compiled).hideErrorMessage('pattern');
        expect(_compiled).hideErrorMessage('default');
        // check dass nicht wackelt
        expect(_compiled).showErrorIcon(true);
        expect(_component.hasFocus).toEqual(false);
        console.log(_compiled);
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

  describe('no validator', () => {
    beforeEach(async(() => {
      fixture = TestBed.createComponent(TextComponent);
      component = fixture.componentInstance;
      component.name = 'foo';
      component.submitted = false;
      component.group = new FormGroup({
        foo:   new FormControl('', [])
      });
      component.ngOnInit();
      // component.submitted = false;
      fixture.detectChanges();
      compiled = fixture.debugElement.nativeElement;
      inputElement = compiled.querySelector('input');
      _oldValue = inputElement.value;
    }));
    describe('not submitted', () => {
      it('#0 should be created', async( () => {
        expect(component).toBeTruthy();
      }));
      it('#1 should display default state when input created', fakeAsync(() => {
        // set initial state
        doAction('default');

        // test new state
        expect(component).isValid('');
        showMessage('default');
      }));
      it('#2 should display default state when empty input is active', fakeAsync(() => {
        // set initial state
        doAction('active_input');

        // test new state
        expect(component).isValid('');
        showMessage('default_active');
      }));
      it('#3 should display default state when user touches input', fakeAsync(() => {
        // set initial state
        doAction('touch');

        // test new state
        expect(component).isValid('');
        showMessage('default_active');
      }));
      it('#4 should display default state when input is touched', fakeAsync(() => {
        // set initial state
        doAction('touched');

        // test new state
        expect(component).isValid('');
        showMessage('default');
      }));
      it('#5 should display default state when user is changing input', fakeAsync(() => {
        // set initial state
        doAction('change_input',  '');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default_active');
      }));
      it('#6 should display default state when input is not changed', fakeAsync(() => {
        // set initial state
        doAction('changed_input',  '');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default');
      }));
      it('#7 should display default state when input is changing', fakeAsync(() => {
        // set initial state
        doAction('change_input', 'xxx');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default_active');
      }));
      it('#8 should display default state when input is changed', fakeAsync(() => {
        // set initial state
        doAction('changed_input', 'xxx');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default');
      }));
    });
    describe('when submitted with value', () => {
      beforeEach(async(() => {
        doAction('changed_input', 'xx');
        component.submitted = true;
        _oldValue = inputElement.value;
      }));
      it('#1 should display default state when input is given, submitted and correct', fakeAsync(() => {

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default');
      }));
      it('#2 should display no error when input is active', fakeAsync(() => {
        // set initial state
        doAction('active_input');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('has_success');
      }));
      it('#3 should display default state when input is touched', fakeAsync(() => {
        // set initial state
        doAction('touched');

        // test new state
        expect(component).isValid('');
        showMessage('default');
        // showMessage('has_success');
      }));
      it('#4 should display default state when input is changing', fakeAsync(() => {
        // set initial state
        doAction('change_input', 'x');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default_active');
      }));
      it('#5 should display default state when input is changed', fakeAsync(() => {
        // set initial state
        doAction('changed_input', 'x');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default');
      }));
      it('#6 should display error state (no text) when input is changed to empty', fakeAsync(() => {
        // set initial state
        doAction('changed_input',  '');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default');
      }));
      it('#7 should display default state when input is changed to valid input', fakeAsync(() => {
        // set initial state
        doAction('changed_input', 'xxx');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default');
      }));
    });
    describe('when submitted without value', () => {
      beforeEach(async(() => {
        component.submitted = true;
        doAction('touched');
      }));
      it('#1 should display default state when input is given, submitted and correct', fakeAsync(() => {
        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default');
      }));
      it('#2 should display error when input is active', fakeAsync(() => {
        // set initial state
        doAction('active_input');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default_active');
      }));
      it('#3 should display error state when input is touched', fakeAsync(() => {
        // set initial state
        doAction('touched');

        // test new state
        expect(component).isValid('');
        showMessage('default');
      }));
      it('#4 should display default state when input is changing', fakeAsync(() => {
        // set initial state
        doAction('change_input', 'x');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default_active');
      }));
      it('#5 should display default state when input is changed', fakeAsync(() => {
        // set initial state
        doAction('changed_input', 'x');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default');
      }));
      it('#6 should display error state (no text) when input is changed to empty', fakeAsync(() => {
        // set initial state
        doAction('changed_input',  '');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default');
      }));
      it('#7 should display default state when input is changed to valid input', fakeAsync(() => {
        // set initial state
        doAction('changed_input', 'xxx');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default');
      }));
      it('#8 should display no error after input has correctly changed', fakeAsync(() => {
        // set initial state
        doAction('active_input');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default_active');

        // set new state
        doAction('change_input', 'xxx');

        // test renewed state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('has_success');

        // set new state
        doAction('touched');

        // test renewed state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default');
      }));
    });
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
      it('#0 should be created', async( () => {
        expect(component).toBeTruthy();
      }));
      it('#1 should display default state when input created', fakeAsync(() => {
        // set initial state
        doAction('default');

        // test new state
        expect(component).isInvalid('');
        showMessage('default');
      }));
      it('#2 should display default state when empty input is active', fakeAsync(() => {
        // set initial state
        doAction('active_input');

        // test new state
        expect(component).isInvalid('');
        showMessage('default_active');
      }));
      it('#3 should display default state when user touches input', fakeAsync(() => {
        // set initial state
        doAction('touch');

        // test new state
        expect(component).isInvalid('');
        showMessage('default_active');
      }));
      it('#4 should display default state when input is touched', fakeAsync(() => {
        // set initial state
        doAction('touched');

        // test new state
        expect(component).isInvalid('');
        showMessage('default');
      }));
      it('#5 should display default state when user is changing input', fakeAsync(() => {
        // set initial state
        doAction('change_input',  '');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('');
        showMessage('default_active');
      }));
      it('#6 should display default state when input is not changed', fakeAsync(() => {
        // set initial state
        doAction('changed_input',  '');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('');
        showMessage('default');
      }));
      it('#7 should display default state when input is changing', fakeAsync(() => {
        // set initial state
        doAction('change_input', 'xxx');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default_active');
      }));
      it('#8 should display default state when input is changed', fakeAsync(() => {
        // set initial state
        doAction('changed_input', 'xxx');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default');
      }));
    });
    describe('when submitted with value', () => {
      beforeEach(async(() => {
        doAction('changed_input', 'xx');
        component.submitted = true;
        _oldValue = inputElement.value;
      }));
      it('#1 should display default state when input is given, submitted and correct', fakeAsync(() => {

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default');
      }));
      it('#2 should display no error when input is active', fakeAsync(() => {
        // set initial state
        doAction('active_input');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('has_success');
      }));
      it('#3 should display default state when input is touched', fakeAsync(() => {
        // set initial state
        doAction('touched');

        // test new state
        expect(component).isValid('');
        showMessage('default');
        // showMessage('has_success');
      }));
      it('#4 should display default state when input is changing', fakeAsync(() => {
        // set initial state
        doAction('change_input', 'x');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default_active');
      }));
      it('#5 should display default state when input is changed', fakeAsync(() => {
        // set initial state
        doAction('changed_input', 'x');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default');
      }));
      it('#6 should display error state (no text) when input is changed to empty', fakeAsync(() => {
        // set initial state
        doAction('changed_input',  '');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('required');
        showMessage('has_error');
      }));
      it('#7 should display default state when input is changed to valid input', fakeAsync(() => {
        // set initial state
        doAction('changed_input', 'xxx');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default');
      }));
    });
    describe('when submitted without value', () => {
      beforeEach(async(() => {
        component.submitted = true;
        doAction('touched');
      }));
      it('#1 should display default state when input is given, submitted and correct', fakeAsync(() => {
        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('required');
        showMessage('has_error');
      }));
      it('#2 should display error when input is active', fakeAsync(() => {
        // set initial state
        doAction('active_input');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('required');
        showMessage('required');
      }));
      it('#3 should display error state when input is touched', fakeAsync(() => {
        // set initial state
        doAction('touched');

        // test new state
        expect(component).isInvalid('required');
        showMessage('has_error');
        // showMessage('has_success');
      }));
      it('#4 should display default state when input is changing', fakeAsync(() => {
        // set initial state
        doAction('change_input', 'x');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default_active');
      }));
      it('#5 should display default state when input is changed', fakeAsync(() => {
        // set initial state
        doAction('changed_input', 'x');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default');
      }));
      it('#6 should display error state (no text) when input is changed to empty', fakeAsync(() => {
        // set initial state
        doAction('changed_input',  '');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('required');
        showMessage('has_error');
      }));
      it('#7 should display default state when input is changed to valid input', fakeAsync(() => {
        // set initial state
        doAction('changed_input', 'xxx');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default');
      }));
      it('#8 should display no error after input has correctly changed', fakeAsync(() => {
        // set initial state
        doAction('active_input');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('required');
        showMessage('error_required');

        // set new state
        doAction('change_input', 'xxx');

        // test renewed state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('has_success');
      }));
    });
  });
  describe('pattern', () => {
    beforeEach(async(() => {
      fixture = TestBed.createComponent(TextComponent);
      component = fixture.componentInstance;
      component.name = 'foo';
      component.submitted = false;
      component.group = new FormGroup({
        foo:   new FormControl('', [ Validators.pattern('[^ @]*@[^ @]*')])
      });
      component.ngOnInit();
      // component.submitted = false;
      fixture.detectChanges();
      compiled = fixture.debugElement.nativeElement;
      inputElement = compiled.querySelector('input');
      _oldValue = inputElement.value;
    }));
    describe('not submitted', () => {
      it('#0 should be created', async( () => {
        expect(component).toBeTruthy();
      }));
      it('#1 (Wrong) should display default state when input created', fakeAsync(() => {
        // set initial state
        doAction('default');

        // test new state
        expect(component).isValid('');  // ??
        showMessage('default');
      }));
      it('#2 should display default state when empty input is active', fakeAsync(() => {
        // set initial state
        doAction('active_input');

        // test new state
        expect(component).isValid('');  // ??
        showMessage('default_active');
      }));
      it('#3 should display default state when user touches input', fakeAsync(() => {
        // set initial state
        doAction('touch');

        // test new state
        expect(component).isValid('');  // ??
        showMessage('default_active');
      }));
      it('#4 should display default state when input is touched', fakeAsync(() => {
        // set initial state
        doAction('touched');

        // test new state
        expect(component).isValid('');  // ??
        showMessage('default');
      }));
      it('#x5 should display default state when user is changing input', fakeAsync(() => {
        // set initial state
        doAction('change_input',  '');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isValid('');  // ??
        showMessage('default_active');
      }));
      it('#x6 should display default state when input is not changed', fakeAsync(() => {
        // set initial state
        doAction('changed_input',  '');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isValid('');  // ??
        showMessage('default');
      }));

      // @TODO: adapt
      it('#x7 (wrong)should display default state when input is changing', fakeAsync(() => {
        // set initial state
        doAction('change_input', 'xxx');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isInvalid(''); // ???
        showMessage('default_active');
        // showMessage('error_required');
      }));
      it('#x8 should display default state when input is changed', fakeAsync(() => {
        // set initial state
        doAction('changed_input', 'xxx');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('');
        showMessage('default');
      }));
      xit('#xx should display error state when is given, submitted and incorrect', fakeAsync(() => {
        // set initial state
        doAction('changed_input',  'xxx');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('');
        showMessage('default');

        // subtmit
        const _newValue = inputElement.value;
        component.submitted = true;
        fixture.detectChanges();

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _newValue} );
        expect(component).isInvalid('pattern');
        showMessage('has_error');
      }));
    });
    describe('when submitted with value', () => {
      beforeEach(async(() => {
        doAction('changed_input', 'xx');
        component.submitted = true;
        _oldValue = inputElement.value;
      }));
      it('#xx1 (wrong) should display error state when input is given, submitted', fakeAsync(() => {

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('');
        showMessage('default');
      }));
      it('#xx2 should display no error when input is active', fakeAsync(() => {
        // set initial state
        doAction('active_input');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('pattern');
        showMessage('error_pattern');
      }));
      it('#xx3 should display default state when input is touched', fakeAsync(() => {
        // set initial state
        doAction('touched');

        // test new state
        expect(component).isInvalid('pattern');
        showMessage('has_error');
      }));
      it('#xx4 should display default state when input is changing', fakeAsync(() => {
        // set initial state
        doAction('change_input', 'x');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('pattern');
        showMessage('error_pattern');
      }));
      it('#xx5 (Wrong) should display default state when input is changed', fakeAsync(() => {
        // set initial state
        doAction('changed_input', 'x');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('pattern');
        showMessage('has_error');
      }));
      it('#xx6 should display error state (no text) when input is changed to empty', fakeAsync(() => {
        // set initial state
        doAction('changed_input',  '');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default');
      }));
      it('#xx7  should display default state when input is changed to valid input', fakeAsync(() => {
        // set initial state
        doAction('change_input', 'xxx@asdf.de');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('has_success');
      }));
      it('#xx8 should display default state when input is changed to valid input', fakeAsync(() => {
        // set initial state
        doAction('changed_input', 'xxx@asdf.de');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default');
      }));
    });
    describe('when submitted without value', () => {
      beforeEach(async(() => {
        component.submitted = true;
        doAction('touched');
      }));
      it('#xxx1 should display default state when input is given, submitted and correct', fakeAsync(() => {
        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default');
      }));
      it('#xxx2 should display error when input is active', fakeAsync(() => {
        // set initial state
        doAction('active_input');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default_active');
      }));
      it('#xxx3 should display error state when input is touched', fakeAsync(() => {
        // set initial state
        doAction('touched');

        // test new state
        expect(component).isValid('');
        showMessage('default');
        // showMessage('has_success');
      }));
      it('#xxx4 should display pattern error state when input is changing', fakeAsync(() => {
    


        // set initial state
        doAction('change_input', 'x');
        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('pattern');
        showMessage('error_pattern');
      }));
      it('#xxx5 should display default state when input is changed', fakeAsync(() => {
        // set initial state
        doAction('changed_input', 'x');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('pattern');
        showMessage('has_error');
      }));
      it('#xxx6 should display error state (no text) when input is changed to empty', fakeAsync(() => {
        // set initial state
        doAction('changed_input',  '');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default');
      }));
      it('#xxx7 should display error state when input is changed to valid input', fakeAsync(() => {
        // set initial state
        doAction('changed_input', 'xxx');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('pattern');
        showMessage('has_error');
      }));
      it('#xxx8 (wrong) should display no error after input has correctly changed', fakeAsync(() => {
        // set initial state
        doAction('active_input');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default_active');

        // set new state  => occurs pattern error
        doAction('change_input', 'xxx');

        // test renewed state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('pattern');
        showMessage('error_pattern');

        // set new state
        doAction('change_input', 'xxx@daf.de');

        // test renewed state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('has_success');

        // set new state
        doAction('touched');

        // test renewed state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default');
      }));
    });
  });
  describe('pattern and required', () => {
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
      it('#0 should be created', async( () => {
        expect(component).toBeTruthy();
      }));
      it('#1 should display default state when input created', fakeAsync(() => {
        // set initial state
        doAction('default');

        // test new state
        expect(component).isInvalid('');
        showMessage('default');
      }));
      it('#2 should display default state when empty input is active', fakeAsync(() => {
        // set initial state
        doAction('active_input');

        // test new state
        expect(component).isInvalid('');
        showMessage('default_active');
      }));
      it('#3 should display default state when user touches input', fakeAsync(() => {
        // set initial state
        doAction('touch');

        // test new state
        expect(component).isInvalid('');
        showMessage('default_active');
      }));
      it('#4 should display default state when input is touched', fakeAsync(() => {
        // set initial state
        doAction('touched');

        // test new state
        expect(component).isInvalid('');
        showMessage('default');
      }));
      it('#5 should display default state when user is changing input', fakeAsync(() => {
        // set initial state
        doAction('change_input',  '');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('');
        showMessage('default_active');
      }));
      it('#6 should display default state when input is not changed', fakeAsync(() => {
        // set initial state
        doAction('changed_input',  '');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('');
        showMessage('default');
      }));

      // @TODO: adapt
      it('#7 should display default state when input is changing', fakeAsync(() => {
        // set initial state
        doAction('change_input', 'xxx');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('');
        showMessage('default_active');
        // showMessage('error_required');
      }));
      it('#8 should display default state when input is changed', fakeAsync(() => {
        // set initial state
        doAction('changed_input', 'xxx');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('');
        showMessage('default');
      }));
      xit('#xx should display error state when is given, submitted and incorrect', fakeAsync(() => {
        // set initial state
        doAction('changed_input',  'xxx');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('');
        showMessage('default');

        // subtmit
        const _newValue = inputElement.value;
        component.submitted = true;
        fixture.detectChanges();

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _newValue} );
        expect(component).isInvalid('pattern');
        showMessage('has_error');
      }));
    });
    describe('when submitted with value', () => {
      beforeEach(async(() => {
        doAction('changed_input', 'xx');
        component.submitted = true;
        _oldValue = inputElement.value;
      }));
      it('#1 (wrong) should display error state when input is given, submitted', fakeAsync(() => {

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('');
        showMessage('default');
      }));
      it('#2 should display no error when input is active', fakeAsync(() => {
        // set initial state
        doAction('active_input');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('pattern');
        showMessage('error_pattern');
      }));
      it('#3 should display default state when input is touched', fakeAsync(() => {
        // set initial state
        doAction('touched');

        // test new state
        expect(component).isInvalid('pattern');
        showMessage('has_error');
      }));
      it('#4 should display default state when input is changing', fakeAsync(() => {
        // set initial state
        doAction('change_input', 'x');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('pattern');
        showMessage('error_pattern');
      }));
      it('#5 should display default state when input is changed', fakeAsync(() => {
        // set initial state
        doAction('changed_input', 'x');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('pattern');
        showMessage('has_error');
      }));
      it('#6 should display error state (no text) when input is changed to empty', fakeAsync(() => {
        // set initial state
        doAction('changed_input',  '');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('required');
        showMessage('has_error');
      }));
      it('#7  should display default state when input is changed to valid input', fakeAsync(() => {
        // set initial state
        doAction('change_input', 'xxx@asdf.de');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('has_success');
      }));
      it('#8 should display default state when input is changed to valid input', fakeAsync(() => {
        // set initial state
        doAction('changed_input', 'xxx@asdf.de');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default');
      }));
    });
    describe('when submitted without value', () => {
      beforeEach(async(() => {
        component.submitted = true;
        doAction('touched');
      }));
      it('#1 should display default state when input is given, submitted and correct', fakeAsync(() => {
        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('required');
        showMessage('has_error');
      }));
      it('#2 should display error when input is active', fakeAsync(() => {
        // set initial state
        doAction('active_input');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('required');
        showMessage('error_required');
      }));
      it('#3 should display error state when input is touched', fakeAsync(() => {
        // set initial state
        doAction('touched');

        // test new state
        expect(component).isInvalid('required');
        showMessage('has_error');
        // showMessage('has_success');
      }));
      it('#4 (wrong) should display default state when input is changing', fakeAsync(() => {
        // set initial state
        doAction('change_input', 'x');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('required');
        showMessage('error_required');
      }));
      it('#5 should display default state when input is changed', fakeAsync(() => {
        // set initial state
        doAction('changed_input', 'x');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('pattern');
        showMessage('has_error');
      }));
      it('#6 should display error state (no text) when input is changed to empty', fakeAsync(() => {
        // set initial state
        doAction('changed_input',  '');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('required');
        showMessage('has_error');
      }));
      it('#7 should display error state when input is changed to valid input', fakeAsync(() => {
        // set initial state
        doAction('changed_input', 'xxx');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('pattern');
        showMessage('has_error');
      }));
      it('#8 (IMPORTANT) should change error message from required to pattern after leaving field', fakeAsync(() => {
        // set initial state
        doAction('active_input');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('required');
        showMessage('error_required');

        // set new state  => occurs pattern error
        doAction('change_input', 'xxx');

        // test renewed state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('required');
        showMessage('error_required');

        // set new state
        doAction('changed_input', 'xxxx');

        // test renewed state when left
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('pattern');
        showMessage('has_error');

        // set new state  => occurs pattern error
        doAction('touch');

        // test renewed state message
        expect(component).isInvalid('pattern');
        showMessage('error_pattern');
      }));
      it('#XXX (IMPORTANT) should change error message from required to pattern after leaving field', fakeAsync(() => {
        // set initial state
        doAction('changed_input', 'xxx@adsfdf.de');

        // test new state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default');
        // @TODO: eigentlich success

        // set new state  => occurs pattern error
        doAction('change_input', 'xxx');

        // test renewed state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('pattern');
        showMessage('error_pattern');

        // WAIT

        // set new state
        doAction('changed_input', 'xxxx');

        // test renewed state when left
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('pattern');
        showMessage('has_error');

        // set new state  => occurs pattern error
        doAction('touch');

        // test renewed state message
        expect(component).isInvalid('pattern');
        showMessage('error_pattern');
      }));
      it('#9 (IMPORTANT) should display no error after input has correctly changed', fakeAsync(() => {
        // set initial state
        doAction('active_input');

        // test new state
        expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('required');
        showMessage('error_required');

        // set new state  => occurs pattern error
        doAction('change_input', 'xxx');

        // test renewed state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isInvalid('required');
        showMessage('error_required');

        // set new state
        doAction('change_input', 'xxx@daf.de');

        // test renewed state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('has_success');

        // set new state
        doAction('touched');

        // test renewed state
        expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
        expect(component).isValid('');
        showMessage('default');
      }));
    });
  });
});

