// angular
import {async, TestBed, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

// to be tested
import { SelectboxComponent } from './selectbox.component';

// utils
import { customMatchers, expect } from '@utils/testing/custom-matcher';

// services
import { StatusService } from '@services/status/status.service';

describe('SelectboxComponent', () => {
  let component: SelectboxComponent;
  let fixture: ComponentFixture<SelectboxComponent>;
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
        SelectboxComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA],
      providers: [StatusService],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ]
    })
      .compileComponents();
  });


  describe('selectbox', () => {

    describe('no validator', () => {
      beforeEach(async(() => {
        fixture = TestBed.createComponent(SelectboxComponent);
        component = fixture.componentInstance;
        component.name = 'foo';
        component.submitted = true;
        component.required = 'true';
        component.group = new FormGroup({
          foo:   new FormControl('', [])
        });
        component.ngOnInit();
        // component.submitted = false;
        fixture.detectChanges();
        compiled = fixture.debugElement.nativeElement;
        inputElement = compiled.querySelector('select');
        _oldValue = inputElement.value;
      }));
      describe('not submitted', () => {
        it('#0 should be created', async( () => {
          expect(component).toBeTruthy();
        }));
        xdescribe('=> SHOW message="default"', () => {
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
            // doAction('changed_input', 'xxx');
            inputElement.dispatchEvent(new Event('focus'));
            // inputElement.value = "Frau";
            component.control.value = 'Frau';
            // inputElement.dispatchEvent(new Event('change'));
            fixture.detectChanges();
            inputElement.dispatchEvent(new Event('change'));
            // inputElement.value = 'Frau';
            // inputElement.dispatchEvent(new Event('change')); //this is what triggers angular to do its magic
            // inputElement.dispatchEvent(new Event('blur'));
            //  //assuming you are doing this inside a fakeAsync
            // // const option = inputElement.querySelectorAll('option')[0];
            // // option.dispatchEvent(new Event('change'));
            // // fi
            // inputElement.value = 1;
            // inputElement.dispatchEvent(new Event('change'));
            showStatus('default', VALID , CHANGED);
          }));
        });
        xdescribe('=> SHOW message="default_active"', () => {
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
      xdescribe('when submitted with value', () => {
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
          it('#4 WHEN input is changed to empty', fakeAsync(() => {
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
      xdescribe('when submitted without value', () => {
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

    xdescribe('VALIDATOR=required', () => {
      beforeEach(async(() => {
        fixture = TestBed.createComponent(SelectboxComponent);
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
        inputElement = compiled.querySelector('select');
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
  });

});
