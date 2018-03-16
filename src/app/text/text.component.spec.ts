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
            // set initial state
            doAction('default');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
          it('#4 WHEN input touched', fakeAsync(() => {
            // set initial state
            doAction('touched');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
          it('#6 WHEN input changed to empty', fakeAsync(() => {
            // set initial state
            doAction('changed_input',  '');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
          it('#8 WHEN input changed to "xxx"', fakeAsync(() => {
            // set initial state
            doAction('changed_input', 'xxx');

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
          it('#3 WHEN touching input', fakeAsync(() => {
            // set initial state
            doAction('touch');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default_active');
          }));
          it('#5 WHEN changing input to empty', fakeAsync(() => {
            // set initial state
            doAction('change_input',  '');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default_active');
          }));
          it('#7 WHEN changing input to "xxx"', fakeAsync(() => {
            // set initial state
            doAction('change_input', 'xxx');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default_active');
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

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
          it('#2 WHEN input has been touched', fakeAsync(() => {
            // set initial state
            doAction('touched');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
            // showMessage('has_success');
          }));
          it('#3 WHEN input was changed to "x"', fakeAsync(() => {
            // set initial state
            doAction('changed_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
          it('#4 WHEN input is changed to empty', fakeAsync(() => {
            // set initial state
            doAction('changed_input',  '');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
          it('#5 WHEN input is changed to valid input', fakeAsync(() => {
            // set initial state
            doAction('changed_input', 'xxx');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
        });
        describe('=> SHOW message="default_active"', () => {
          it('#6 WHEN input is changing to "x"', fakeAsync(() => {
            // set initial state
            doAction('change_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default_active');
          }));
        });
        describe('=> SHOW message="has_success"', () => {
          it('#7 WHEN input is active', fakeAsync(() => {
            // set initial state
            doAction('active_input');
            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
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
          it('#1 WHEN input not changed', fakeAsync(() => {
            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
          it('#3 WHEN input touched', fakeAsync(() => {
            // set initial state
            doAction('touched');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
          it('#5 WHEN input changed to "x"', fakeAsync(() => {
            // set initial state
            doAction('changed_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
          it('#6 WHEN input changed to empty', fakeAsync(() => {
            // set initial state
            doAction('changed_input',  '');
            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
          it('#7 WHEN input changed to "xxx"', fakeAsync(() => {
            // set initial state
            doAction('changed_input', 'xxx');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
          it('#8 WHEN input has changed correctly', fakeAsync(() => {
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
        describe('=> SHOW message="default_active"', () => {
          it('#2 WHEN input is active', fakeAsync(() => {
            // set initial state
            doAction('active_input');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default_active');
          }));
          it('#4 WHEN input is changing to "x"', fakeAsync(() => {
            // set initial state
            doAction('change_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default_active');
          }));
        });
        describe('=> SHOW message="has_success"', () => {
          it('#8 WHEN input has correctly changed', fakeAsync(() => {
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
          it('#8 WHEN input changed to "xxx"', fakeAsync(() => {
            // set initial state
            doAction('changed_input', 'xxx');

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
            expect(component).isInvalid('');
            showMessage('default_active');
          }));
          it('#3 WHEN touching input', fakeAsync(() => {
            // set initial state
            doAction('touch');

            // test new state
            expect(component).isInvalid('');
            showMessage('default_active');
          }));
          it('#5 WHEN input is not changing', fakeAsync(() => {
            // set initial state
            doAction('change_input',  '');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('');
            showMessage('default_active');
          }));
          it('#7 WHEN input is changing to "xxx"', fakeAsync(() => {
            // set initial state
            doAction('change_input', 'xxx');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default_active');
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

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
          it('#3 WHEN input has been touched', fakeAsync(() => {
            // set initial state
            doAction('touched');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
            // showMessage('has_success');
          }));
          it('#5 WHEN input shrinked to "x"', fakeAsync(() => {
            // set initial state
            doAction('changed_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
          it('#6 WHEN input changed  to empty', fakeAsync(() => {
            // set initial state
            doAction('changed_input',  '');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('');
            showMessage('default');
          }));
          it('#7 WHEN input extended to "xxx"', fakeAsync(() => {
            // set initial state
            doAction('changed_input', 'xxx');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
        });
        describe('=> SHOW message="default_active"', () => {
          it('#4 WHEN input is shrinking to "x"', fakeAsync(() => {
            // set initial state
            doAction('change_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default_active');
          }));
          it('#4 WHEN input is extending to "xxx"', fakeAsync(() => {
            // set initial state
            doAction('change_input', 'xxx');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default_active');
          }));
        });
        describe('=> SHOW message="has_success"', () => {
          it('#2 WHEN input is not changing', fakeAsync(() => {
            // set initial state
            doAction('active_input');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
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
        describe('=> SHOW message="required"', () => {
          it('#2 WHEN input is active', fakeAsync(() => {
            // set initial state
            doAction('active_input');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
            expect(component).isInvalid('required');
            showMessage('required');
          }));
        });
        describe('=> SHOW message="default"', () => {
          it('#5 WHEN input is extended to "x"', fakeAsync(() => {
            // set initial state
            doAction('changed_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
          }));
          it('#7 WHEN input is extended to "xxx"', fakeAsync(() => {
            // set initial state
            doAction('changed_input', 'xxx');
            
            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
            expect(component).isValid('');
            showMessage('default');
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
        describe('=> SHOW message="has_error"', () => {
          xit('#xx (TODO) WHEN input is extended to "xxx" and submitted', fakeAsync(() => {
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
        it('#xx3 display state=default when input is touched', fakeAsync(() => {
          // set initial state
          doAction('touched');

          // test new state
          expect(component).isInvalid('pattern');
          showMessage('has_error');
        }));
        it('#xx4 display state=default when input is changing', fakeAsync(() => {
          // set initial state
          doAction('change_input', 'x');

          // test new state
          expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
          expect(component).isInvalid('pattern');
          showMessage('error_pattern');
        }));
        it('#xx5 (Wrong) display state=default when input is changed', fakeAsync(() => {
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
        it('#xx7  display state=default when input is changed to valid input', fakeAsync(() => {
          // set initial state
          doAction('change_input', 'xxx@asdf.de');

          // test new state
          expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
          expect(component).isValid('');
          showMessage('has_success');
        }));
        it('#xx8 display state=default when input is changed to valid input', fakeAsync(() => {
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
        it('#xxx1 display state=default when input is given, submitted and correct', fakeAsync(() => {
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
        it('#xxx5 display state=default when input is changed', fakeAsync(() => {
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
        it('#1 display state=default when input created', fakeAsync(() => {
          // set initial state
          doAction('default');

          // test new state
          expect(component).isInvalid('');
          showMessage('default');
        }));
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
        it('#4 display state=default when input is touched', fakeAsync(() => {
          // set initial state
          doAction('touched');

          // test new state
          expect(component).isInvalid('');
          showMessage('default');
        }));
        it('#5 display state=default when user is changing input', fakeAsync(() => {
          // set initial state
          doAction('change_input',  '');

          // test new state
          expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
          expect(component).isInvalid('');
          showMessage('default_active');
        }));
        it('#6 display state=default when input is not changed', fakeAsync(() => {
          // set initial state
          doAction('changed_input',  '');

          // test new state
          expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
          expect(component).isInvalid('');
          showMessage('default');
        }));

        // @TODO: adapt
        it('#7 display state=default when input is changing', fakeAsync(() => {
          // set initial state
          doAction('change_input', 'xxx');

          // test new state
          expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
          expect(component).isInvalid('');
          showMessage('default_active');
          // showMessage('error_required');
        }));
        it('#8 display state=default when input is changed', fakeAsync(() => {
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
        it('#3 display state=default when input is touched', fakeAsync(() => {
          // set initial state
          doAction('touched');

          // test new state
          expect(component).isInvalid('pattern');
          showMessage('has_error');
        }));
        it('#4 display state=default when input is changing', fakeAsync(() => {
          // set initial state
          doAction('change_input', 'x');

          // test new state
          expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
          expect(component).isInvalid('pattern');
          showMessage('error_pattern');
        }));
        it('#5 display state=default when input is changed', fakeAsync(() => {
          // set initial state
          doAction('changed_input', 'x');

          // test new state
          expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
          expect(component).isInvalid('pattern');
          showMessage('has_error');
        }));
        it('#6 should display no error state (no text) when input is changed to empty', fakeAsync(() => {
          // set initial state
          // doAction('change_input', 'x');
          doAction('changed_input',  '');
          // test new state
          expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
          expect(component).isInvalid('');
          showMessage('default');
        }));

        // @TODO: fix and copy for reqired and pattern
        xit('#6 should display no error state (no text) when input is changed to empty and we  go back to input', fakeAsync(() => {
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
        it('#7  display state=default when input is changed to valid input', fakeAsync(() => {
          // set initial state
          doAction('change_input', 'xxx@asdf.de');

          // test new state
          expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
          expect(component).isValid('');
          showMessage('has_success');
        }));
        it('#8 display state=default when input is changed to valid input', fakeAsync(() => {
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
        it('#1 display state=default when input is given, submitted and correct', fakeAsync(() => {
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
        it('#4 (wrong) display state=default when input is changing', fakeAsync(() => {
          // set initial state
          doAction('change_input', 'x');

          // test new state
          expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
          expect(component).isInvalid('required');
          showMessage('error_required');
        }));
        it('#5 display state=default when input is changed', fakeAsync(() => {
          // set initial state
          doAction('changed_input', 'x');

          // test new state
          expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
          expect(component).isInvalid('pattern');
          showMessage('has_error');
        }));
        it('#6 (TODO)should display error state (no text) when input is changed to empty', fakeAsync(() => {
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
        it('#1 (Wrong) display state=default when input created', fakeAsync(() => {
          // set initial state
          doAction('default');

          // test new state
          expect(component).isValid('');  // ??
          showMessage('default');
        }));
        it('#2 display state=default when empty input is active', fakeAsync(() => {
          // set initial state
          doAction('active_input');

          // test new state
          expect(component).isValid('');  // ??
          showMessage('default_active');
        }));
        it('#3 display state=default when user touches input', fakeAsync(() => {
          // set initial state
          doAction('touch');

          // test new state
          expect(component).isValid('');  // ??
          showMessage('default_active');
        }));
        it('#4 display state=default when input is touched', fakeAsync(() => {
          // set initial state
          doAction('touched');

          // test new state
          expect(component).isValid('');  // ??
          showMessage('default');
        }));
        it('#x5 display state=default when user is changing input', fakeAsync(() => {
          // set initial state
          doAction('change_input',  '');

          // test new state
          expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
          expect(component).isValid('');  // ??
          showMessage('default_active');
        }));
        it('#x6 display state=default when input is not changed', fakeAsync(() => {
          // set initial state
          doAction('changed_input',  '');

          // test new state
          expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
          expect(component).isValid('');  // ??
          showMessage('default');
        }));

        // @TODO: adapt
        it('#x7 (wrong)display state=default when input is changing', fakeAsync(() => {
          // set initial state
          doAction('change_input', 'xxx');

          // test new state
          expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
          expect(component).isInvalid(''); // ???
          showMessage('default_active');
          // showMessage('error_required');
        }));
        it('#x8 display state=default when input is changed', fakeAsync(() => {
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
        it('#xx3 display state=default when input is touched', fakeAsync(() => {
          // set initial state
          doAction('touched');

          // test new state
          expect(component).isInvalid('pattern');
          showMessage('has_error');
        }));
        it('#xx4 display state=default when input is changing', fakeAsync(() => {
          // set initial state
          doAction('change_input', 'x');

          // test new state
          expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
          expect(component).isInvalid('pattern');
          showMessage('error_pattern');
        }));
        it('#xx5 (Wrong) display state=default when input is changed', fakeAsync(() => {
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
        it('#xx7  display state=default when input is changed to valid input', fakeAsync(() => {
          // set initial state
          doAction('change_input', '020/345667');

          // test new state
          expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
          expect(component).isValid('');
          showMessage('has_success');
        }));
        it('#xx8 display state=default when input is changed to valid input', fakeAsync(() => {
          // set initial state
          doAction('changed_input', '+49 565');

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
        it('#xxx1 display state=default when input is given, submitted and correct', fakeAsync(() => {
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
        it('#xxx5 display state=default when input is changed', fakeAsync(() => {
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
        it('#1 display state=default when input created', fakeAsync(() => {
          // set initial state
          doAction('default');

          // test new state
          expect(component).isInvalid('');
          showMessage('default');
        }));
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
        it('#4 display state=default when input is touched', fakeAsync(() => {
          // set initial state
          doAction('touched');

          // test new state
          expect(component).isInvalid('');
          showMessage('default');
        }));
        it('#5 display state=default when user is changing input', fakeAsync(() => {
          // set initial state
          doAction('change_input',  '');

          // test new state
          expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
          expect(component).isInvalid('');
          showMessage('default_active');
        }));
        it('#6 display state=default when input is not changed', fakeAsync(() => {
          // set initial state
          doAction('changed_input',  '');

          // test new state
          expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
          expect(component).isInvalid('');
          showMessage('default');
        }));

        // @TODO: adapt
        it('#7 display state=default when input is changing', fakeAsync(() => {
          // set initial state
          doAction('change_input', 'xxx');

          // test new state
          expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
          expect(component).isInvalid('');
          showMessage('default_active');
          // showMessage('error_required');
        }));
        it('#8 display state=default when input is changed', fakeAsync(() => {
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
        it('#3 display state=default when input is touched', fakeAsync(() => {
          // set initial state
          doAction('touched');

          // test new state
          expect(component).isInvalid('pattern');
          showMessage('has_error');
        }));
        it('#4 display state=default when input is changing', fakeAsync(() => {
          // set initial state
          doAction('change_input', 'x');

          // test new state
          expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
          expect(component).isInvalid('pattern');
          showMessage('error_pattern');
        }));
        it('#5 display state=default when input is changed', fakeAsync(() => {
          // set initial state
          doAction('changed_input', 'x');

          // test new state
          expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
          expect(component).isInvalid('pattern');
          showMessage('has_error');
        }));
        it('#6 should display no error state (no text) when input is changed to empty', fakeAsync(() => {
          // set initial state
          // doAction('change_input', 'x');
          doAction('changed_input',  '');
          // test new state
          expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
          expect(component).isInvalid('');
          showMessage('default');
        }));

        // @TODO: fix and copy for reqired and pattern
        xit('#6 should display no error state (no text) when input is changed to empty and we  go back to input', fakeAsync(() => {
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
        it('#7  display state=default when input is changed to valid input', fakeAsync(() => {
          // set initial state
          doAction('change_input', '+49 565');

          // test new state
          expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
          expect(component).isValid('');
          showMessage('has_success');
        }));
        it('#8 display state=default when input is changed to valid input', fakeAsync(() => {
          // set initial state
          doAction('changed_input', '+49 565');

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
        it('#1 display state=default when input is given, submitted and correct', fakeAsync(() => {
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
        it('#4 (wrong) display state=default when input is changing', fakeAsync(() => {
          // set initial state
          doAction('change_input', 'x');

          // test new state
          expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
          expect(component).isInvalid('required');
          showMessage('error_required');
        }));
        it('#5 display state=default when input is changed', fakeAsync(() => {
          // set initial state
          doAction('changed_input', 'x');

          // test new state
          expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
          expect(component).isInvalid('pattern');
          showMessage('has_error');
        }));
        it('#6 (TODO)should display error state (no text) when input is changed to empty', fakeAsync(() => {
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
    });
  });
});

