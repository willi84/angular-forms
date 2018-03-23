import { StatusComponent } from './../status/status.component';
import {async, TestBed, ComponentFixture, fakeAsync } from '@angular/core/testing';

import { TextComponent } from './text.component';
import { FormControl, FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
import { customMatchers, expect } from '../../utils/testing/custom-matcher';

// import { EmailCheckValidator } from './../validators/emailCheck/emailCheck.validator';


describe('TextComponent', () => {
  let component: TextComponent;
  let fixture: ComponentFixture<TextComponent>;
  let compiled;
  let inputElement: any;
  let _oldValue: string;
  const CHANGED = true;
  const NOT_CHANGED = false;
  const VALID = { valid: true, message: ''};
  const INVALID = { valid: false, message: ''};
  // const ERROR_PATTERN = { valid: false, message: 'pattern'};
  const ERROR_REQUIRED = { valid: false, message: 'required'};

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

  function showStatus( action: string, isValid: any, hasChanged: boolean) {
    const inputChanged = (hasChanged === true) ? 'input_changed' : 'input_not_changed';
    expect(component).hasChanged({ action: inputChanged, oldValue:  _oldValue} );
    if (isValid.valid === true) {
      expect(component).isValid('');
    } else {
      expect(component).isInvalid(isValid.message);
    }
    showMessage(action);
  }

  // @TODO: extract to custom matcher  hasChanged isValid
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
    // adding custom Matchers
    jasmine.addMatchers(customMatchers);

    TestBed.configureTestingModule({
      declarations: [
        TextComponent,
        StatusComponent
      ],
      // schemas: [ NO_ERRORS_SCHEMA],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ]
    }).compileComponents();
  });

  describe('input component (type=text)', () => {

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
        describe('=> SHOW message="default"', () => {
          it('#1 WHEN input is created', fakeAsync(() => {
            doAction('default');
            showStatus('default', VALID , NOT_CHANGED);
          }));
          it('#4 WHEN input touched', fakeAsync(() => {
            doAction('touched');
            showStatus('default', VALID , NOT_CHANGED);
          }));
          it('#6 WHEN input changed to empty', fakeAsync(() => {
            doAction('changed_input',  '');
            showStatus('default', VALID , NOT_CHANGED);
          }));
          it('#8 WHEN input changed to "xxx"', fakeAsync(() => {
            doAction('changed_input', 'xxx');
            showStatus('default', VALID , CHANGED);
          }));
        });
        describe('=> SHOW message="default_active"', () => {
          it('#2 WHEN input is active', fakeAsync(() => {
            doAction('active_input');
            showStatus('default_active', VALID , NOT_CHANGED);
          }));
          it('#3 WHEN touching input', fakeAsync(() => {
            doAction('touch');
            showStatus('default_active', VALID , NOT_CHANGED);
          }));
          it('#5 WHEN changing input to empty', fakeAsync(() => {
            doAction('change_input',  '');
            showStatus('default_active', VALID , NOT_CHANGED);
          }));
          it('#7 WHEN changing input to "xxx"', fakeAsync(() => {
            doAction('change_input', 'xxx');
            showStatus('default_active', VALID , CHANGED);
          }));
        });
      });
      describe('when submitted with value', () => {
        beforeEach(async(() => {
          doAction('changed_input', 'xx');
          component.submitted = true;
          _oldValue = inputElement.value;
        }));
        describe('=> SHOW message="default"', () => {
          it('#1 WHEN given_input === correct', fakeAsync(() => {
            showStatus('default', VALID , NOT_CHANGED);
          }));
          it('#2 (TODO) WHEN input has been touched', fakeAsync(() => {
            doAction('touched');
            showStatus('default', VALID , NOT_CHANGED);
            // showMessage('has_success');
          }));
          it('#3 WHEN input was changed to "x"', fakeAsync(() => {
            doAction('changed_input', 'x');
            showStatus('default', VALID , CHANGED);
          }));
          it('#44 WHEN input is changed to empty', fakeAsync(() => {
            doAction('changed_input',  '');
            showStatus('default', VALID , CHANGED);
          }));
          it('#5 WHEN input is changed to valid input', fakeAsync(() => {
            doAction('changed_input', 'xxx');
            showStatus('default', VALID , CHANGED);
          }));
        });
        describe('=> SHOW message="default_active"', () => {
          it('#6 WHEN input is changing to "x"', fakeAsync(() => {
            // set initial state
            doAction('change_input', 'x');
            showStatus('default_active', VALID , CHANGED);
          }));
        });
        describe('=> SHOW message="has_success"', () => {
          it('#7 WHEN input is active', fakeAsync(() => {
            doAction('active_input');
            showStatus('has_success', VALID , NOT_CHANGED);
          }));
        });
      });
      describe('when submitted without value', () => {
        beforeEach(async(() => {
          component.submitted = true;
          doAction('touched');
        }));
        describe('=> SHOW message="default"', () => {
          it('#1 WHEN input not changed', fakeAsync(() => {
            showStatus('default', VALID , NOT_CHANGED);
          }));
          it('#3 WHEN input touched', fakeAsync(() => {
            doAction('touched');
            showStatus('default', VALID , NOT_CHANGED);
          }));
          it('#5 WHEN input changed to "x"', fakeAsync(() => {
            doAction('changed_input', 'x');
            showStatus('default', VALID , CHANGED);
          }));
          it('#6 WHEN input changed to empty', fakeAsync(() => {
            doAction('changed_input',  '');
            showStatus('default', VALID , NOT_CHANGED);
          }));
          it('#7 WHEN input changed to "xxx"', fakeAsync(() => {
            doAction('changed_input', 'xxx');
            showStatus('default', VALID , CHANGED);
          }));
          it('#8 WHEN input has changed correctly', fakeAsync(() => {
            // set initial state
            doAction('active_input');

            // test new state
            showStatus('default_active', VALID , NOT_CHANGED);

            // set new state
            doAction('change_input', 'xxx');

            // test renewed state
            showStatus('has_success', VALID , CHANGED);

            // set new state
            doAction('touched');

            // test renewed state
            showStatus('default', VALID , CHANGED);
          }));
        });
        describe('=> SHOW message="default_active"', () => {
          it('#2 WHEN input is active', fakeAsync(() => {
            doAction('active_input');
            showStatus('default_active', VALID , NOT_CHANGED);
          }));
          it('#4 WHEN input is changing to "x"', fakeAsync(() => {
            doAction('change_input', 'x');
            showStatus('default_active', VALID , CHANGED);
          }));
        });
        describe('=> SHOW message="has_success"', () => {
          it('#8 WHEN input has correctly changed', fakeAsync(() => {
            // set initial state
            doAction('active_input');
            showStatus('default_active', VALID , NOT_CHANGED);

            // set new state
            doAction('change_input', 'xxx');
            showStatus('has_success', VALID , CHANGED);
          }));
        });
      });
    });

    describe('VALIDATOR=required', () => {
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
        fixture.detectChanges();
        compiled = fixture.debugElement.nativeElement;
        inputElement = compiled.querySelector('input');
        _oldValue = inputElement.value;
      }));
      describe('not submitted', () => {
        it('#0 should be created', async( () => {
          expect(component).toBeTruthy();
        }));
        describe('=> SHOW message="default"', () => {
          it('#1 WHEN input created', fakeAsync(() => {
            doAction('default');
            showStatus('default', INVALID , NOT_CHANGED);
          }));
          it('#4 WHEN input is touched', fakeAsync(() => {
            doAction('touched');
            showStatus('default', INVALID , NOT_CHANGED);
          }));
          it('#6 WHEN input is not changed', fakeAsync(() => {
            doAction('changed_input',  '');
            showStatus('default', INVALID , NOT_CHANGED);
          }));
          it('#8 WHEN input changed to "xxx"', fakeAsync(() => {
            doAction('changed_input', 'xxx');
            showStatus('default', VALID , CHANGED);
          }));
        });
        describe('=> SHOW message="default_active"', () => {
          it('#2 WHEN input is active', fakeAsync(() => {
            doAction('active_input');
            showStatus('default_active', INVALID , NOT_CHANGED);
          }));
          it('#3 WHEN touching input', fakeAsync(() => {
            doAction('touch');
            showStatus('default_active', INVALID , NOT_CHANGED);
          }));
          it('#5 WHEN input is not changing', fakeAsync(() => {
            doAction('change_input',  '');
            showStatus('default_active', INVALID , NOT_CHANGED);
          }));
          it('#7 WHEN input is changing to "xxx"', fakeAsync(() => {
            doAction('change_input', 'xxx');
            showStatus('default_active', VALID , CHANGED);
          }));
        });
      });
      describe('when submitted with value', () => {
        beforeEach(async(() => {
          doAction('changed_input', 'xx');
          component.submitted = true;
          _oldValue = inputElement.value;
        }));
        describe('=> SHOW message="default"', () => {
          it('#1 WHEN input has not changed', fakeAsync(() => {
            showStatus('default', VALID , NOT_CHANGED);
          }));
          it('#3 WHEN input has been touched', fakeAsync(() => {
            doAction('touched');
            showStatus('default', VALID , NOT_CHANGED);
            // showMessage('has_success');
          }));
          it('#5 WHEN input shrinked to "x"', fakeAsync(() => {
            doAction('changed_input', 'x');
            showStatus('default', VALID , CHANGED);
          }));
          it('#6 WHEN input changed  to empty', fakeAsync(() => {
            doAction('changed_input',  '');
            showStatus('default', INVALID , CHANGED);
          }));
          it('#7 WHEN input extended to "xxx"', fakeAsync(() => {
            doAction('changed_input', 'xxx');
            showStatus('default', VALID , CHANGED);
          }));
        });
        describe('=> SHOW message="default_active"', () => {
          it('#4 WHEN input is shrinking to "x"', fakeAsync(() => {
            doAction('change_input', 'x');
            showStatus('default_active', VALID , CHANGED);
          }));
          it('#4 WHEN input is extending to "xxx"', fakeAsync(() => {
            doAction('change_input', 'xxx');
            showStatus('default_active', VALID , CHANGED);
          }));
        });
        describe('=> SHOW message="has_success"', () => {
          it('#2 WHEN input is not changing', fakeAsync(() => {
            doAction('active_input');
            showStatus('has_success', VALID , NOT_CHANGED);
          }));
        });
      });
      describe('when submitted without value', () => {
        beforeEach(async(() => {
          component.submitted = true;
          doAction('touched');
        }));
        describe('=> SHOW message="required"', () => {
          it('#2 WHEN input is active', fakeAsync(() => {
            doAction('active_input');
            showStatus('required', ERROR_REQUIRED , NOT_CHANGED);
          }));
        });
        describe('=> SHOW message="default"', () => {
          it('#5 WHEN input is extended to "x"', fakeAsync(() => {
            doAction('changed_input', 'x');
            showStatus('default', VALID , CHANGED);
          }));
          it('#7 WHEN input is extended to "xxx"', fakeAsync(() => {
            doAction('changed_input', 'xxx');
            showStatus('default', VALID , CHANGED);
          }));
        });
        describe('=> SHOW message="default_active"', () => {
          it('#4 WHEN input is extending to "x"', fakeAsync(() => {
            // set initial state
            doAction('change_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default_active');
          }));
        });
        describe('=> SHOW message="has_success"', () => {
          it('#8 WHEN input is changing to a successful state of "xxx"', fakeAsync(() => {
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
        describe('=> SHOW message="has_error"', () => {
          it('#1 WHEN input is empty', fakeAsync(() => {
            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('required');
            showMessage('has_error');
          }));
          it('#6 WHEN input changed to empty', fakeAsync(() => {
            // set initial state
            doAction('changed_input',  '');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('required');
            showMessage('has_error');
          }));
          it('#3 WHEN input is touched', fakeAsync(() => {
            // set initial state
            doAction('touched');

            // test new state
            expect(component).isInvalid('required');
            showMessage('has_error');
            // showMessage('has_success');
          }));
        });
      });
    });
    describe('VALIDATOR=pattern', () => {
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
        describe('=> SHOW message="default"', () => {
          it('#1 WHEN input created', fakeAsync(() => {
            // set initial state
            doAction('default');

            // test new state
            expect(component).isValid('');  // ??
            showMessage('default');
          }));
          it('#4 WHEN input is touched', fakeAsync(() => {
            // set initial state
            doAction('touched');

            // test new state
            expect(component).isValid('');  // ??
            showMessage('default');
          }));
          it('#x6 WHEN input is not changed', fakeAsync(() => {
            // set initial state
            doAction('changed_input',  '');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isValid('');  // ??
            showMessage('default');
          }));
          it('#x8 WHEN input is extended to "xxx"', fakeAsync(() => {
            // set initial state
            doAction('changed_input', 'xxx');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('');
            showMessage('default');
          }));

        });
        describe('=> SHOW message="default_active"', () => {
          it('#2 WHEN empty input is active', fakeAsync(() => {
            // set initial state
            doAction('active_input');

            // test new state
            expect(component).isValid('');  // ??
            showMessage('default_active');
          }));
          it('#3 WHEN input is touching', fakeAsync(() => {
            // set initial state
            doAction('touch');

            // test new state
            expect(component).isValid('');  // ??
            showMessage('default_active');
          }));
          it('#5 WHEN input is changing to empty', fakeAsync(() => {
            // set initial state
            doAction('change_input',  '');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isValid('');  // ??
            showMessage('default_active');
          }));
          it('#x7 WHEN input is extending to "xxx"', fakeAsync(() => {
            // set initial state
            doAction('change_input', 'xxx');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid(''); // ???
            showMessage('default_active');
            // showMessage('error_required');
          }));
        });
      });
      describe('when submitted with value "xxx"', () => {
        beforeEach(async(() => {
          doAction('changed_input', 'xx');
          component.submitted = true;
          _oldValue = inputElement.value;
        }));
        describe('=> SHOW message="default"', () => {
          it('#xx1 WHEN input has not changed', fakeAsync(() => {

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('');
            showMessage('default');
          }));
          it('#xx6 WHEN input is shrinked to empty', fakeAsync(() => {
            // set initial state
            doAction('changed_input',  '');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
          it('#xx8 WHEN input is changed to valid', fakeAsync(() => {
            // set initial state
            doAction('changed_input', 'xxx@asdf.de');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
        });
        describe('=> SHOW message="has_success"', () => {
          it('#xx7  WHEN input is changing to valid input', fakeAsync(() => {
            // set initial state
            doAction('change_input', 'xxx@asdf.de');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('has_success');
          }));
        });
        describe('=> SHOW message="has_error"', () => {
          it('#xx3 WHEN input is touched', fakeAsync(() => {
            // set initial state
            doAction('touched');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('pattern');
            showMessage('has_error');
          }));
          it('#xx5 (Wrong) WHEN input is shrinked', fakeAsync(() => {
            // set initial state
            doAction('changed_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('pattern');
            showMessage('has_error');
          }));
        });
        describe('=> SHOW message="error_pattern"', () => {
          it('#xx2 WHEN input is active', fakeAsync(() => {
            // set initial state
            doAction('active_input');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('pattern');
            showMessage('error_pattern');
          }));
          it('#xx4 WHEN input is shrinked to "x"', fakeAsync(() => {
            // set initial state
            doAction('change_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('pattern');
            showMessage('error_pattern');
          }));
        });
      });
      describe('when submitted without value', () => {
        beforeEach(async(() => {
          component.submitted = true;
          doAction('touched');
        }));
        describe('=> SHOW message="default"', () => {
          it('#xxx1 WHEN input is not changed', fakeAsync(() => {
            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
          it('#xxx3 WHEN input is touched', fakeAsync(() => {
            // set initial state
            doAction('touched');

            // test new state
            expect(component).isValid('');
            showMessage('default');
            // showMessage('has_success');
          }));
          it('#xxx6 WHEN input is changed to empty', fakeAsync(() => {
            // set initial state
            doAction('changed_input',  '');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
          it('#xxx8 (wrong) WHEN input has correctly changed', fakeAsync(() => {
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
        describe('=> SHOW message="default_active"', () => {
          it('#xxx2 WHEN input is active', fakeAsync(() => {
            // set initial state
            doAction('active_input');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default_active');
          }));
        });
        describe('=> SHOW message="error_pattern"', () => {
          it('#xxx4 WHEN input is shrinking to "x"', fakeAsync(() => {

            // set initial state
            doAction('change_input', 'x');
            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('pattern');
            showMessage('error_pattern');
          }));
        });
        describe('=> SHOW message="has_error"', () => {
          it('#xxx5 WHEN input is shrinked to "x"', fakeAsync(() => {
            // set initial state
            doAction('changed_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('pattern');
            showMessage('has_error');
          }));
          it('#xxx7 WHEN input is extended to "xxx"', fakeAsync(() => {
            // set initial state
            doAction('changed_input', 'xxx');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('pattern');
            showMessage('has_error');
          }));
        });
      });
    });
    describe('VALIDATOR=pattern,required', () => {
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
        describe('=> SHOW message="default"', () => {
          it('#1 WHEN input is created', fakeAsync(() => {
            // set initial state
            doAction('default');

            // test new state
            expect(component).isInvalid('');
            showMessage('default');
          }));
          it('#4 WHEN input is touched', fakeAsync(() => {
            // set initial state
            doAction('touched');

            // test new state
            expect(component).isInvalid('');
            showMessage('default');
          }));
          it('#6 WHEN input is not changed', fakeAsync(() => {
            // set initial state
            doAction('changed_input',  '');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('');
            showMessage('default');
          }));
          it('#8 WHEN input is extended to "xxx"', fakeAsync(() => {
            // set initial state
            doAction('changed_input', 'xxx');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('');
            showMessage('default');
          }));
        });
        describe('=> SHOW message="default_active"', () => {
          it('#2 WHEN empty input is active', fakeAsync(() => {
            // set initial state
            doAction('active_input');

            // test new state
            expect(component).isInvalid('');
            showMessage('default_active');
          }));
          it('#3 WHEN input is touching', fakeAsync(() => {
            // set initial state
            doAction('touch');

            // test new state
            expect(component).isInvalid('');
            showMessage('default_active');
          }));
          it('#5 WHEN input is shrinking to empty', fakeAsync(() => {
            // set initial state
            doAction('change_input',  '');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('');
            showMessage('default_active');
          }));
           // @TODO: adapt
          it('#7 WHEN input is extending to "xxx"', fakeAsync(() => {
            // set initial state
            doAction('change_input', 'xxx');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('');
            showMessage('default_active');
            // showMessage('error_required');
          }));
        });
      });
      describe('when submitted with value "xx"', () => {
        beforeEach(async(() => {
          doAction('changed_input', 'xx');
          component.submitted = true;
          _oldValue = inputElement.value;
        }));
        describe('=> SHOW message="default"', () => {
          it('#1 WHEN input is not changed', fakeAsync(() => {

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('');
            showMessage('default');
          }));
          it('#6 WHEN input is changed to empty', fakeAsync(() => {
            // set initial state
            // doAction('change_input', 'x');
            doAction('changed_input',  '');
            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('');
            showMessage('default');
          }));
          it('#8 WHEN input is changed to valid input', fakeAsync(() => {
            // set initial state
            doAction('changed_input', 'xxx@asdf.de');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
        });
        describe('=> SHOW message="has_error"', () => {
          it('#3 WHEN input is touched', fakeAsync(() => {
            // set initial state
            doAction('touched');

            // test new state
            expect(component).isInvalid('pattern');
            showMessage('has_error');
          }));
          it('#5 WHEN input is shrinked to "x"', fakeAsync(() => {
            // set initial state
            doAction('changed_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('pattern');
            showMessage('has_error');
          }));
          xit('#6 WHEN input is changed to empty and we  go back to input', fakeAsync(() => {
            // set initial state
            // doAction('change_input', 'x');
            doAction('changed_input',  '');
            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('');
            showMessage('default');

            doAction('touch');
            // test new state => dont show error
            expect(component).isInvalid('');
            showMessage('default');

            // doAction('change_input',  'x');
            // // test new state => dont show error
            // expect(component).isInvalid('pattern');
            // showMessage('default_active');

            doAction('changed_input',  'xx');
            // test new state => dont show error
            expect(component).isInvalid('pattern');
            showMessage('has_error');
          }));
        });
        describe('=> SHOW message="error_pattern"', () => {
          it('#2 WHEN input is active', fakeAsync(() => {
            // set initial state
            doAction('active_input');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('pattern');
            showMessage('error_pattern');
          }));
          it('#4 WHEN input is shrinking to "x"', fakeAsync(() => {
            // set initial state
            doAction('change_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('pattern');
            showMessage('error_pattern');
          }));
        });
        describe('=> SHOW message="has_success"', () => {
          it('#7  WHEN input is changed to valid input', fakeAsync(() => {
            // set initial state
            doAction('change_input', 'xxx@asdf.de');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('has_success');
          }));
        });

      });
      describe('when submitted without value', () => {
        beforeEach(async(() => {
          component.submitted = true;
          doAction('touched');
        }));
        describe('=> SHOW message="default"', () => {
          it('#9 WHEN input has correctly changed', fakeAsync(() => {
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
        describe('=> SHOW message="has_error"', () => {
          it('#1 WHEN input is not changed', fakeAsync(() => {
            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('required');
            showMessage('has_error');
          }));
          it('#3 WHEN input is touched', fakeAsync(() => {
            // set initial state
            doAction('touched');

            // test new state
            expect(component).isInvalid('required');
            showMessage('has_error');
            // showMessage('has_success');
          }));
          it('#5 WHEN input is changed to "x"', fakeAsync(() => {
            // set initial state
            doAction('changed_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('pattern');
            showMessage('has_error');
          }));
          it('#6 (TODO) WHEN input is changed to empty', fakeAsync(() => {
            // set initial state
            doAction('changed_input',  '');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('required');
            showMessage('has_error');
          }));
          it('#7 WHEN input is extended to "xxx"', fakeAsync(() => {
            // set initial state
            doAction('changed_input', 'xxx');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('pattern');
            showMessage('has_error');
          }));
        });
        describe('=> SHOW message="error_required"', () => {
          it('#2 WHEN input is active', fakeAsync(() => {
            // set initial state
            doAction('active_input');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('required');
            showMessage('error_required');
          }));
          it('#4 (wrong) WHEN input is changing to "x"', fakeAsync(() => {
            // set initial state
            doAction('change_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('required');
            showMessage('error_required');
          }));
        });
        describe('=> SHOW message="error_pattern"', () => {
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
        });
      });
    });
  });
  // TELEPHONE
  describe('input component (type=tel)', () => {
    describe('pattern', () => {
      beforeEach(async(() => {
        fixture = TestBed.createComponent(TextComponent);
        component = fixture.componentInstance;
        component.name = 'foo';
        component.type = 'tel';
        component.submitted = false;
        component.group = new FormGroup({
          foo:   new FormControl('', [
            Validators.pattern('^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\\s\.\/0-9]*')
          ])
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
        describe('=> SHOW message="default"', () => {
          it('#1 WHEN input created', fakeAsync(() => {
            // set initial state
            doAction('default');

            // test new state
            expect(component).isValid('');  // ??
            showMessage('default');
          }));
          it('#4 display WHEN input is touched', fakeAsync(() => {
            // set initial state
            doAction('touched');

            // test new state
            expect(component).isValid('');  // ??
            showMessage('default');
          }));
          it('#x6 WHEN input is not changed', fakeAsync(() => {
            // set initial state
            doAction('changed_input',  '');
            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isValid('');  // ??
            showMessage('default');
          }));
          it('#x8 (WRONG) WHEN input is extended to "xxx"', fakeAsync(() => {
            // set initial state
            doAction('changed_input', 'xxx');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('');
            showMessage('default');
          }));
          it('#x8 WHEN input is extended to "012"', fakeAsync(() => {
            // set initial state
            doAction('changed_input', '012');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
          it('#xx WHEN input is changed to valid value and submitted', fakeAsync(() => {
            // set initial state
            doAction('changed_input',  '030 6796786');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');

            // subtmit
            const _newValue = inputElement.value;
            component.submitted = true;
            fixture.detectChanges();

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _newValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
        });
        describe('=> SHOW message="default_active"', () => {
          it('#2 WHEN empty input is active', fakeAsync(() => {
            // set initial state
            doAction('active_input');

            // test new state
            expect(component).isValid('');  // ??
            showMessage('default_active');
          }));
          it('#3 WHEN input is touching', fakeAsync(() => {
            // set initial state
            doAction('touch');

            // test new state
            expect(component).isValid('');  // ??
            showMessage('default_active');
          }));
          it('#x5 WHEN input is changing to empty', fakeAsync(() => {
            // set initial state
            doAction('change_input',  '');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isValid('');  // ??
            showMessage('default_active');
          }));
          // @TODO: adapt
          it('#x7 (WRONG) WHEN input is changing to "xxx"', fakeAsync(() => {
            // set initial state
            doAction('change_input', 'xxx');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid(''); // ???
            showMessage('default_active');
            // showMessage('error_required');
          }));
          it('#x8 WHEN input is extended to "012"', fakeAsync(() => {
            // set initial state
            doAction('changed_input', '012');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
        });
        describe('=> SHOW message="has_error"', () => {
          it('#xx WHEN input is changed to incorrect value and submitted', fakeAsync(() => {
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
      });
      describe('when submitted with value "012"', () => {
        beforeEach(async(() => {
          doAction('changed_input', '012');
          component.submitted = true;
          _oldValue = inputElement.value;
        }));
        describe('=> SHOW message="default"', () => {
          it('#xx1 WHEN input is not changed', fakeAsync(() => {

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
          it('#xx3 WHEN input is touched', fakeAsync(() => {
            // set initial state
            doAction('touched');

            // test new state
            expect(component).isValid('');
            showMessage('default');
          }));
          it('#xx6 WHEN input is changed to empty', fakeAsync(() => {
            // set initial state
            doAction('changed_input',  '');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
          it('#xx8 WHEN input is changed to valid input', fakeAsync(() => {
            // set initial state
            doAction('changed_input', '+49 565');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
        });
        describe('=> SHOW message="has_success"', () => {
          it('#xx2 WHEN input is active', fakeAsync(() => {
            // set initial state
            doAction('active_input');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('has_success');
          }));
          it('#xx7  WHEN input is changed to valid input', fakeAsync(() => {
            // set initial state
            doAction('change_input', '020/345667');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('has_success');
          }));
        });
        describe('=> SHOW message="error_pattern"', () => {
          it('#xx4 WHEN input is changing to wrong value "x"', fakeAsync(() => {
            // set initial state
            doAction('change_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('pattern');
            showMessage('error_pattern');
          }));
        });
        describe('=> SHOW message="has_error"', () => {
          it('#xx5 (Wrong) WHEN input is changed to invalid value "x"', fakeAsync(() => {
            // set initial state
            doAction('changed_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('pattern');
            showMessage('has_error');
          }));
        });
      });
      describe('when submitted without value', () => {
        beforeEach(async(() => {
          component.submitted = true;
          doAction('touched');
        }));
        describe('=> SHOW message="default"', () => {
          it('#xxx1 WHEN input is not changed', fakeAsync(() => {
            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
          it('#xxx3 WHEN input is touched', fakeAsync(() => {
            // set initial state
            doAction('touched');

            // test new state
            expect(component).isValid('');
            showMessage('default');
            // showMessage('has_success');
          }));
          it('#xxx6 WHEN input is changed to empty', fakeAsync(() => {
            // set initial state
            doAction('changed_input',  '');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
          it('#xxx8 (wrong) WHEN input is changed to valid valued', fakeAsync(() => {
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
            doAction('change_input', '+49 565');

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
          it('#xxx7 WHEN input is changed to valid input', fakeAsync(() => {
            // set initial state
            doAction('changed_input', '012 2345345');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
        });
        describe('=> SHOW message="default_active"', () => {
          it('#xxx2 WHEN input is active', fakeAsync(() => {
            // set initial state
            doAction('active_input');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default_active');
          }));
        });
        describe('=> SHOW message="error_pattern"', () => {
          it('#xxx4 WHEN input is changing to invalid value "x"', fakeAsync(() => {

            // set initial state
            doAction('change_input', 'x');
            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('pattern');
            showMessage('error_pattern');
          }));
        });
        describe('=> SHOW message="has_error"', () => {
          it('#xxx5 WHEN input is changed to wrong value "x"', fakeAsync(() => {
            // set initial state
            doAction('changed_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('pattern');
            showMessage('has_error');
          }));
        });
      });
    });
    describe('pattern and required', () => {
      beforeEach(async(() => {
        fixture = TestBed.createComponent(TextComponent);
        component = fixture.componentInstance;
        component.name = 'foo';
        component.type = 'tel';
        component.submitted = false;
        component.required = 'true';
        component.group = new FormGroup({
          foo:   new FormControl('', [Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\\s\.\/0-9]*')])
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
        describe('=> SHOW message="default"', () => {
          it('#1 display state=default when input created', fakeAsync(() => {
            // set initial state
            doAction('default');

            // test new state
            expect(component).isInvalid('');
            showMessage('default');
          }));
          it('#4 display state=default when input is touched', fakeAsync(() => {
            // set initial state
            doAction('touched');

            // test new state
            expect(component).isInvalid('');
            showMessage('default');
          }));
          it('#6 display state=default when input is not changed', fakeAsync(() => {
            // set initial state
            doAction('changed_input',  '');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('');
            showMessage('default');
          }));
          it('#8 display state=default when input is changed', fakeAsync(() => {
            // set initial state
            doAction('changed_input', 'xxx');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('');
            showMessage('default');
          }));
        });
        describe('=> SHOW message="default_active"', () => {
          it('#2 display state=default when empty input is active', fakeAsync(() => {
            // set initial state
            doAction('active_input');

            // test new state
            expect(component).isInvalid('');
            showMessage('default_active');
          }));
          it('#3 display state=default when user touches input', fakeAsync(() => {
            // set initial state
            doAction('touch');

            // test new state
            expect(component).isInvalid('');
            showMessage('default_active');
          }));
          it('#5 display state=default when user is changing input', fakeAsync(() => {
            // set initial state
            doAction('change_input',  '');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('');
            showMessage('default_active');
          }));
          // @TODO: adapt
          it('#7 WHEN input is changing to "xxx"', fakeAsync(() => {
            // set initial state
            doAction('change_input', 'xxx');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('');
            showMessage('default_active');
            // showMessage('error_required');
          }));
          it('#7 WHEN input is changing to "012 678"', fakeAsync(() => {
            // set initial state
            doAction('change_input', '012 678');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default_active');
            // showMessage('error_required');
          }));
        });
      });
      describe('when submitted with value', () => {
        beforeEach(async(() => {
          doAction('changed_input', '012');
          component.submitted = true;
          _oldValue = inputElement.value;
        }));
        describe('=> SHOW message="default"', () => {
          it('#1 (wrong) WHEN input is not changed', fakeAsync(() => {

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
          it('#3 WHEN input is touched', fakeAsync(() => {
            // set initial state
            doAction('touched');

            // test new state
            expect(component).isValid('');
            showMessage('default');
          }));
          it('#6 WHEN input is changed to empty', fakeAsync(() => {
            // set initial state
            // doAction('change_input', 'x');
            doAction('changed_input',  '');
            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('');
            showMessage('default');
          }));
          it('#8 WHEN input is changed to valid value "+49 565"', fakeAsync(() => {
            // set initial state
            doAction('changed_input', '+49 565');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
        });
        describe('=> SHOW message="default_active"', () => {
          it('#2 WHEN input is active', fakeAsync(() => {
            // set initial state
            doAction('active_input');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default_active');
          }));
        });
        describe('=> SHOW message="has_error"', () => {
          it('#5 WHEN input is changed to invalid value "x"', fakeAsync(() => {
            // set initial state
            doAction('changed_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('pattern');
            showMessage('has_error');
          }));
          // @TODO: fix and copy for reqired and pattern
          xit('#6 (TODO) WHEN input is changed to empty and we go back to input', fakeAsync(() => {
            // set initial state
            // doAction('change_input', 'x');
            doAction('changed_input',  '');
            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('');
            showMessage('default');

            doAction('touch');
            // test new state => dont show error
            expect(component).isInvalid('');
            showMessage('default');

            // doAction('change_input',  'x');
            // // test new state => dont show error
            // expect(component).isInvalid('pattern');
            // showMessage('default_active');


            doAction('changed_input',  'xx');
            // test new state => dont show error
            expect(component).isInvalid('pattern');
            showMessage('has_error');

          }));
        });
        describe('=> SHOW message="error_pattern"', () => {
          it('#4 WHEN input is changing to "x"', fakeAsync(() => {
            // set initial state
            doAction('change_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('pattern');
            showMessage('error_pattern');
          }));
        });
        describe('=> SHOW message="has_success"', () => {
          xit('#4 WHEN input is changing to "012 6374538"', fakeAsync(() => {
            // set initial state
            doAction('change_input', '012 6374538');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('');
            showMessage('has_success');
          }));
          it('#7 WHEN input is changed to valid input', fakeAsync(() => {
            // set initial state
            doAction('change_input', '+49 565');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('has_success');
          }));
        });

      });
      describe('when submitted without value', () => {
        beforeEach(async(() => {
          component.submitted = true;
          doAction('touched');
        }));
        describe('=> SHOW message="default"', () => {
          it('#9 (IMPORTANT) AFTER input has correctly changed', fakeAsync(() => {
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
            doAction('change_input', '+49 565');

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
        describe('=> SHOW message="has_success"', () => {
          xit('#7 (WRONG) WHEN input is changed to valid input "030 45678"', fakeAsync(() => {
            // set initial state
            doAction('changed_input', '030 45678');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('has_success');
          }));
        });
        describe('=> SHOW message="has_error"', () => {
          it('#1 WHEN input is not changed', fakeAsync(() => {
            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('required');
            showMessage('has_error');
          }));
          it('#3 WHEN input is touched', fakeAsync(() => {
            // set initial state
            doAction('touched');

            // test new state
            expect(component).isInvalid('required');
            showMessage('has_error');
            // showMessage('has_success');
          }));
          it('#5 WHEN input is changed to wrong value "x"', fakeAsync(() => {
            // set initial state
            doAction('changed_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('pattern');
            showMessage('has_error');
          }));
          it('#6 (TODO) WHEN input is changed to empty', fakeAsync(() => {
            // set initial state
            doAction('changed_input',  '');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('required');
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
        });
        describe('=> SHOW message="error_required"', () => {
          it('#2 WHEN input is active', fakeAsync(() => {
            // set initial state
            doAction('active_input');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('required');
            showMessage('error_required');
          }));
          it('#4 (TODO) WHEN input is changing to wrong value', fakeAsync(() => {
            // set initial state
            doAction('change_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('required');
            showMessage('error_required');
          }));
        });
        describe('=> SHOW message="error_pattern"', () => {
          it('#XXX (IMPORTANT) should change error message from required to pattern after leaving field', fakeAsync(() => {
            // set initial state
            doAction('changed_input', '+49 565');

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
        });
      });
    });
  });
});

