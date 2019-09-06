import { setUpTestBed } from '@utils/testing/make-tests-faster-again';

// angular
// TODO: show status

import {async, TestBed, ComponentFixture,  fakeAsync,
  TestModuleMetadata
} from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

// to be tested
import { TextAreaComponent } from './textarea.component';

// shared
import { StatusComponent } from '@shared/status/status.component';

// services
import { StatusService } from '@services/status/status.service';

// utils
import { customMatchers, expect } from '@utils/testing/custom-matcher';

import { Helper } from '@utils/testing/helper';

describe('TextAreaComponent', () => {
  let component: TextAreaComponent;
  let fixture: ComponentFixture<TextAreaComponent>;
  const VALID = { valid: true, message: ''};
  const INVALID = { valid: false, message: ''};
  // const ERROR_PATTERN = { valid: false, message: 'pattern'};
  const ERROR_REQUIRED = { valid: false, message: 'required'};
  let helper: Helper;

    // input changed
    const CHANGED = true;
    const NOT_CHANGED = false;
    // error message
    const msg = {
      VALID : { valid: true, message: ''},
      INVALID : { valid: false, message: ''},
      ERROR_PATTERN : { valid: false, message: 'pattern'},
      ERROR_REQUIRED : { valid: false, message: 'required'}
    };

    const moduleDef: TestModuleMetadata = {
    declarations: [
      TextAreaComponent,
      StatusComponent
    ],
    schemas: [ NO_ERRORS_SCHEMA],
    providers: [StatusService],
    imports: [
      FormsModule,
      ReactiveFormsModule,
    ]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    // adding custom Matchers
    jasmine.addMatchers(customMatchers);
  });
  describe('textarea component', () => {

    describe('no validator', () => {
      beforeEach(async(() => {
        fixture = TestBed.createComponent(TextAreaComponent);
        component = fixture.componentInstance;
        component.name = 'company';
        component.submitted = false;
        component.required = 'true';
        component.group = new FormGroup({
          company:   new FormControl('', [Validators.required])
        });
        component.ngOnInit();
        // component.submitted = false;
        fixture.detectChanges();
        helper = new Helper(fixture, 'textarea');
      }));

      describe('not submitted', () => {
        it('#0 should be created', async( () => {
          expect(component).toBeTruthy();
        }));
        describe('=> SHOW message="default"', () => {
          it('#1 WHEN input created', fakeAsync(() => {
            helper.doAction('default');
            helper.showStatus('default', INVALID , NOT_CHANGED);
          }));
        });
      });
    });
    describe('no validator', () => {
      beforeEach(async(() => {
        fixture = TestBed.createComponent(TextAreaComponent);
        component = fixture.componentInstance;
        component.name = 'foo';
        component.submitted = false;
        component.group = new FormGroup({
          foo:   new FormControl('', [])
        });
        component.ngOnInit();
        // component.submitted = false;
        fixture.detectChanges();
        helper = new Helper(fixture, 'textarea');
      }));
      describe('not submitted', () => {
        it('#0 should be created', async( () => {
          expect(component).toBeTruthy();
        }));
        describe('=> SHOW message="default"', () => {
          it('#1 WHEN input is created', fakeAsync(() => {
            helper.doAction('default');
            helper.showStatus('default', VALID , NOT_CHANGED);
          }));
          it('#4 WHEN input touched', fakeAsync(() => {
            helper.doAction('touched');
            helper.showStatus('default', VALID , NOT_CHANGED);
          }));
          it('#6 WHEN input changed to empty', fakeAsync(() => {
            helper.doAction('changed_input',  '');
            helper.showStatus('default', VALID , NOT_CHANGED);
          }));
          it('#8 WHEN input changed to "xxx"', fakeAsync(() => {
            helper.doAction('changed_input', 'xxx');
            helper.showStatus('default', VALID , CHANGED);
          }));
        });
        describe('=> SHOW message="default_active"', () => {
          it('#2 WHEN input is active', fakeAsync(() => {
            helper.doAction('active_input');
            helper.showStatus('default_active', VALID , NOT_CHANGED);
          }));
          it('#3 WHEN touching input', fakeAsync(() => {
            helper.doAction('touch');
            helper.showStatus('default_active', VALID , NOT_CHANGED);
          }));
          it('#5 WHEN changing input to empty', fakeAsync(() => {
            helper.doAction('change_input',  '');
            helper.showStatus('default_active', VALID , NOT_CHANGED);
          }));
          it('#7 WHEN changing input to "xxx"', fakeAsync(() => {
            helper.doAction('change_input', 'xxx');
            helper.showStatus('default_active', VALID , CHANGED);
          }));
        });
      });
      describe('when submitted with value', () => {
        beforeEach(async(() => {
          helper.doAction('changed_input', 'xx');
          component.submitted = true;
          helper = new Helper(fixture, 'textarea');
        }));
        describe('=> SHOW message="default"', () => {
          it('#1 WHEN given_input === correct', fakeAsync(() => {
            helper.showStatus('default', VALID , NOT_CHANGED);
          }));
          it('#2 (TODO) WHEN input has been touched', fakeAsync(() => {
            helper.doAction('touched');
            helper.showStatus('default', VALID , NOT_CHANGED);
            // helper.showMessage('has_success');
          }));
          it('#3 WHEN input was changed to "x"', fakeAsync(() => {
            helper.doAction('changed_input', 'x');
            helper.showStatus('default', VALID , CHANGED);
          }));
          it('#4 WHEN input is changed to empty', fakeAsync(() => {
            helper.doAction('changed_input',  '');
            helper.showStatus('default', VALID , CHANGED);
          }));
          it('#5 WHEN input is changed to valid input', fakeAsync(() => {
            helper.doAction('changed_input', 'xxx');
            helper.showStatus('default', VALID , CHANGED);
          }));
        });
        describe('=> SHOW message="default_active"', () => {
          it('#6 WHEN input is changing to "x"', fakeAsync(() => {
            // set initial state
            helper.doAction('change_input', 'x');
            helper.showStatus('default_active', VALID , CHANGED);
          }));
        });
        describe('=> SHOW message="has_success"', () => {
          it('#7 WHEN input is active', fakeAsync(() => {
            helper.doAction('active_input');
            helper.showStatus('has_success', VALID , NOT_CHANGED);
          }));
        });
      });
      describe('when submitted without value', () => {
        beforeEach(async(() => {
          component.submitted = true;
          helper.doAction('touched');
        }));
        describe('=> SHOW message="default"', () => {
          it('#1 WHEN input not changed', fakeAsync(() => {
            helper.showStatus('default', VALID , NOT_CHANGED);
          }));
          it('#3 WHEN input touched', fakeAsync(() => {
            helper.doAction('touched');
            helper.showStatus('default', VALID , NOT_CHANGED);
          }));
          it('#5 WHEN input changed to "x"', fakeAsync(() => {
            helper.doAction('changed_input', 'x');
            helper.showStatus('default', VALID , CHANGED);
          }));
          it('#6 WHEN input changed to empty', fakeAsync(() => {
            helper.doAction('changed_input',  '');
            helper.showStatus('default', VALID , NOT_CHANGED);
          }));
          it('#7 WHEN input changed to "xxx"', fakeAsync(() => {
            helper.doAction('changed_input', 'xxx');
            helper.showStatus('default', VALID , CHANGED);
          }));
          it('#8 WHEN input has changed correctly', fakeAsync(() => {
            // set initial state
            helper.doAction('active_input');

            // test new state
            helper.showStatus('default_active', VALID , NOT_CHANGED);

            // set new state
            helper.doAction('change_input', 'xxx');

            // test renewed state
            helper.showStatus('has_success', VALID , CHANGED);

            // set new state
            helper.doAction('touched');

            // test renewed state
            helper.showStatus('default', VALID , CHANGED);
          }));
        });
        describe('=> SHOW message="default_active"', () => {
          it('#2 WHEN input is active', fakeAsync(() => {
            helper.doAction('active_input');
            helper.showStatus('default_active', VALID , NOT_CHANGED);
          }));
          it('#4 WHEN input is changing to "x"', fakeAsync(() => {
            helper.doAction('change_input', 'x');
            helper.showStatus('default_active', VALID , CHANGED);
          }));
        });
        describe('=> SHOW message="has_success"', () => {
          it('#8 WHEN input has correctly changed', fakeAsync(() => {
            // set initial state
            helper.doAction('active_input');
            helper.showStatus('default_active', VALID , NOT_CHANGED);

            // set new state
            helper.doAction('change_input', 'xxx');
            helper.showStatus('has_success', VALID , CHANGED);
          }));
        });
      });
    });

    describe('VALIDATOR=required', () => {
      beforeEach(async(() => {
        fixture = TestBed.createComponent(TextAreaComponent);
        component = fixture.componentInstance;
        component.name = 'foo';
        component.submitted = false;
        component.required = 'true';
        component.group = new FormGroup({
          foo:   new FormControl('', [Validators.required])
        });
        component.ngOnInit();
        fixture.detectChanges();
        helper = new Helper(fixture, 'textarea');
      }));
      describe('not submitted', () => {
        it('#0 should be created', async( () => {
          expect(component).toBeTruthy();
        }));
        describe('=> SHOW message="default"', () => {
          it('#1 WHEN input created', fakeAsync(() => {
            helper.doAction('default');
            helper.showStatus('default', INVALID , NOT_CHANGED);
          }));
          it('#4 WHEN input is touched', fakeAsync(() => {
            helper.doAction('touched');
            helper.showStatus('default', INVALID , NOT_CHANGED);
          }));
          it('#6 WHEN input is not changed', fakeAsync(() => {
            helper.doAction('changed_input',  '');
            helper.showStatus('default', INVALID , NOT_CHANGED);
          }));
          it('#8 WHEN input changed to "xxx"', fakeAsync(() => {
            helper.doAction('changed_input', 'xxx');
            helper.showStatus('default', VALID , CHANGED);
          }));
        });
        describe('=> SHOW message="default_active"', () => {
          it('#2 WHEN input is active', fakeAsync(() => {
            helper.doAction('active_input');
            helper.showStatus('default_active', INVALID , NOT_CHANGED);
          }));
          it('#3 WHEN touching input', fakeAsync(() => {
            helper.doAction('touch');
            helper.showStatus('default_active', INVALID , NOT_CHANGED);
          }));
          it('#5 WHEN input is not changing', fakeAsync(() => {
            helper.doAction('change_input',  '');
            helper.showStatus('default_active', INVALID , NOT_CHANGED);
          }));
          it('#7 WHEN input is changing to "xxx"', fakeAsync(() => {
            helper.doAction('change_input', 'xxx');
            helper.showStatus('default_active', VALID , CHANGED);
          }));
        });
      });
      describe('when submitted with value', () => {
        beforeEach(async(() => {
          helper.doAction('changed_input', 'xx');
          component.submitted = true;
          helper = new Helper(fixture, 'textarea');
        }));
        describe('=> SHOW message="default"', () => {
          it('#1 WHEN input has not changed', fakeAsync(() => {
            helper.showStatus('default', VALID , NOT_CHANGED);
          }));
          it('#3 WHEN input has been touched', fakeAsync(() => {
            helper.doAction('touched');
            helper.showStatus('default', VALID , NOT_CHANGED);
            // helper.showMessage('has_success');
          }));
          it('#5 WHEN input shrinked to "x"', fakeAsync(() => {
            helper.doAction('changed_input', 'x');
            helper.showStatus('default', VALID , CHANGED);
          }));
          it('#6 WHEN input changed  to empty', fakeAsync(() => {
            helper.doAction('changed_input',  '');
            helper.showStatus('default', INVALID , CHANGED);
          }));
          it('#7 WHEN input extended to "xxx"', fakeAsync(() => {
            helper.doAction('changed_input', 'xxx');
            helper.showStatus('default', VALID , CHANGED);
          }));
        });
        describe('=> SHOW message="default_active"', () => {
          it('#4 WHEN input is shrinking to "x"', fakeAsync(() => {
            helper.doAction('change_input', 'x');
            helper.showStatus('default_active', VALID , CHANGED);
          }));
          it('#4 WHEN input is extending to "xxx"', fakeAsync(() => {
            helper.doAction('change_input', 'xxx');
            helper.showStatus('default_active', VALID , CHANGED);
          }));
        });
        describe('=> SHOW message="has_success"', () => {
          it('#2 WHEN input is not changing', fakeAsync(() => {
            helper.doAction('active_input');
            helper.showStatus('has_success', VALID , NOT_CHANGED);
          }));
        });
      });
      describe('when submitted without value', () => {
        beforeEach(async(() => {
          component.submitted = true;
          helper.doAction('touched');
        }));
        describe('=> SHOW message="required"', () => {
          it('#2 WHEN input is active', fakeAsync(() => {
            helper.doAction('active_input');
            helper.showStatus('required', ERROR_REQUIRED , NOT_CHANGED);
          }));
        });
        describe('=> SHOW message="default"', () => {
          it('#5 WHEN input is extended to "x"', fakeAsync(() => {
            helper.doAction('changed_input', 'x');
            helper.showStatus('default', VALID , CHANGED);
          }));
          it('#7 WHEN input is extended to "xxx"', fakeAsync(() => {
            helper.doAction('changed_input', 'xxx');
            helper.showStatus('default', VALID , CHANGED);
          }));
        });
        describe('=> SHOW message="default_active"', () => {
          it('#4 WHEN input is extending to "x"', fakeAsync(() => {
            // set initial state
            helper.doAction('change_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue: helper.getDefaultValue()} );
            expect(component).isValid('');
            helper.showMessage('default_active');
          }));
        });
        describe('=> SHOW message="has_success"', () => {
          it('#8 WHEN input is changing to a successful state of "xxx"', fakeAsync(() => {
            // set initial state
            helper.doAction('active_input');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  helper.getCurrentValue()} );
            expect(component).isInvalid('required');
            helper.showMessage('error_required');

            // set new state
            helper.doAction('change_input', 'xxx');

            // test renewed state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isValid('');
            helper.showMessage('has_success');
          }));
        });
        describe('=> SHOW message="has_error"', () => {
          it('#1 WHEN input is empty', fakeAsync(() => {
            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  helper.getCurrentValue()} );
            expect(component).isInvalid('required');
            helper.showMessage('has_error');
          }));
          it('#6 WHEN input changed to empty', fakeAsync(() => {
            // set initial state
            helper.doAction('changed_input',  '');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue: helper.getCurrentValue()} );
            expect(component).isInvalid('required');
            helper.showMessage('has_error');
          }));
          it('#3 WHEN input is touched', fakeAsync(() => {
            // set initial state
            helper.doAction('touched');

            // test new state
            expect(component).isInvalid('required');
            helper.showMessage('has_error');
            // helper.showMessage('has_success');
          }));
        });
      });
    });
    describe('VALIDATOR=pattern', () => {
      beforeEach(async(() => {
        fixture = TestBed.createComponent(TextAreaComponent);
        component = fixture.componentInstance;
        component.name = 'foo';
        component.submitted = false;
        component.group = new FormGroup({
          foo:   new FormControl('', [ Validators.pattern('[^ @]*@[^ @]*')])
        });
        component.ngOnInit();
        // component.submitted = false;
        fixture.detectChanges();
        helper = new Helper(fixture, 'textarea');
      }));
      describe('not submitted', () => {
        it('#0 should be created', async( () => {
          expect(component).toBeTruthy();
        }));
        describe('=> SHOW message="default"', () => {
          it('#1 WHEN input created', fakeAsync(() => {
            // set initial state
            helper.doAction('default');

            // test new state
            expect(component).isValid('');  // ??
            helper.showMessage('default');
          }));
          it('#4 WHEN input is touched', fakeAsync(() => {
            // set initial state
            helper.doAction('touched');

            // test new state
            expect(component).isValid('');  // ??
            helper.showMessage('default');
          }));
          it('#x6 WHEN input is not changed', fakeAsync(() => {
            // set initial state
            helper.doAction('changed_input',  '');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  helper.getCurrentValue()} );
            expect(component).isValid('');  // ??
            helper.showMessage('default');
          }));
          it('#x8 WHEN input is extended to "xxx"', fakeAsync(() => {
            // set initial state
            helper.doAction('changed_input', 'xxx');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isInvalid('');
            helper.showMessage('default');
          }));

        });
        describe('=> SHOW message="default_active"', () => {
          it('#2 WHEN empty input is active', fakeAsync(() => {
            // set initial state
            helper.doAction('active_input');

            // test new state
            expect(component).isValid('');  // ??
            helper.showMessage('default_active');
          }));
          it('#3 WHEN input is touching', fakeAsync(() => {
            // set initial state
            helper.doAction('touch');

            // test new state
            expect(component).isValid('');  // ??
            helper.showMessage('default_active');
          }));
          it('#5 WHEN input is changing to empty', fakeAsync(() => {
            // set initial state
            helper.doAction('change_input',  '');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue: helper.getCurrentValue()} );
            expect(component).isValid('');  // ??
            helper.showMessage('default_active');
          }));
          it('#x7 WHEN input is extending to "xxx"', fakeAsync(() => {
            // set initial state
            helper.doAction('change_input', 'xxx');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isInvalid(''); // ???
            helper.showMessage('default_active');
            // helper.showMessage('error_required');
          }));
        });
      });
      describe('when submitted with value "xxx"', () => {
        beforeEach(async(() => {
          helper.doAction('changed_input', 'xx');
          component.submitted = true;
          helper = new Helper(fixture, 'textarea');
        }));
        describe('=> SHOW message="default"', () => {
          it('#xx1 WHEN input has not changed', fakeAsync(() => {

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue: helper.getCurrentValue()} );
            expect(component).isInvalid('');
            helper.showMessage('default');
          }));
          it('#xx6 WHEN input is shrinked to empty', fakeAsync(() => {
            // set initial state
            helper.doAction('changed_input',  '');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isValid('');
            helper.showMessage('default');
          }));
          it('#xx8 WHEN input is changed to valid', fakeAsync(() => {
            // set initial state
            helper.doAction('changed_input', 'xxx@asdf.de');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isValid('');
            helper.showMessage('default');
          }));
        });
        describe('=> SHOW message="has_success"', () => {
          it('#xx7  WHEN input is changing to valid input', fakeAsync(() => {
            // set initial state
            helper.doAction('change_input', 'xxx@asdf.de');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isValid('');
            helper.showMessage('has_success');
          }));
        });
        describe('=> SHOW message="has_error"', () => {
          it('#xx3 WHEN input is touched', fakeAsync(() => {
            // set initial state
            helper.doAction('touched');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  helper.getCurrentValue()} );
            expect(component).isInvalid('pattern');
            helper.showMessage('has_error');
          }));
          it('#xx5 (Wrong) WHEN input is shrinked', fakeAsync(() => {
            // set initial state
            helper.doAction('changed_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isInvalid('pattern');
            helper.showMessage('has_error');
          }));
        });
        describe('=> SHOW message="error_pattern"', () => {
          it('#xx2 WHEN input is active', fakeAsync(() => {
            // set initial state
            helper.doAction('active_input');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  helper.getCurrentValue()} );
            expect(component).isInvalid('pattern');
            helper.showMessage('error_pattern');
          }));
          it('#xx4 WHEN input is shrinked to "x"', fakeAsync(() => {
            // set initial state
            helper.doAction('change_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isInvalid('pattern');
            helper.showMessage('error_pattern');
          }));
        });
      });
      describe('when submitted without value', () => {
        beforeEach(async(() => {
          component.submitted = true;
          helper.doAction('touched');
        }));
        describe('=> SHOW message="default"', () => {
          it('#xxx1 WHEN input is not changed', fakeAsync(() => {
            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  helper.getCurrentValue()} );
            expect(component).isValid('');
            helper.showMessage('default');
          }));
          it('#xxx3 WHEN input is touched', fakeAsync(() => {
            // set initial state
            helper.doAction('touched');

            // test new state
            expect(component).isValid('');
            helper.showMessage('default');
            // helper.showMessage('has_success');
          }));
          it('#xxx6 WHEN input is changed to empty', fakeAsync(() => {
            // set initial state
            helper.doAction('changed_input',  '');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  helper.getCurrentValue()} );
            expect(component).isValid('');
            helper.showMessage('default');
          }));
          it('#xxx8 (wrong) WHEN input has correctly changed', fakeAsync(() => {
            // set initial state
            helper.doAction('active_input');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  helper.getCurrentValue()} );
            expect(component).isValid('');
            helper.showMessage('default_active');

            // set new state  => occurs pattern error
            helper.doAction('change_input', 'xxx');

            // test renewed state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isInvalid('pattern');
            helper.showMessage('error_pattern');

            // set new state
            helper.doAction('change_input', 'xxx@daf.de');

            // test renewed state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isValid('');
            helper.showMessage('has_success');

            // set new state
            helper.doAction('touched');

            // test renewed state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isValid('');
            helper.showMessage('default');
          }));
        });
        describe('=> SHOW message="default_active"', () => {
          it('#xxx2 WHEN input is active', fakeAsync(() => {
            // set initial state
            helper.doAction('active_input');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  helper.getCurrentValue()} );
            expect(component).isValid('');
            helper.showMessage('default_active');
          }));
        });
        describe('=> SHOW message="error_pattern"', () => {
          it('#xxx4 WHEN input is shrinking to "x"', fakeAsync(() => {

            // set initial state
            helper.doAction('change_input', 'x');
            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isInvalid('pattern');
            helper.showMessage('error_pattern');
          }));
        });
        describe('=> SHOW message="has_error"', () => {
          it('#xxx5 WHEN input is shrinked to "x"', fakeAsync(() => {
            // set initial state
            helper.doAction('changed_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isInvalid('pattern');
            helper.showMessage('has_error');
          }));
          it('#xxx7 WHEN input is extended to "xxx"', fakeAsync(() => {
            // set initial state
            helper.doAction('changed_input', 'xxx');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isInvalid('pattern');
            helper.showMessage('has_error');
          }));
        });
      });
    });
    describe('VALIDATOR=pattern,required', () => {
      beforeEach(async(() => {
        fixture = TestBed.createComponent(TextAreaComponent);
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
        helper = new Helper(fixture, 'textarea');
      }));
      describe('not submitted', () => {
        it('#0 should be created', async( () => {
          expect(component).toBeTruthy();
        }));
        describe('=> SHOW message="default"', () => {
          it('#1 WHEN input is created', fakeAsync(() => {
            // set initial state
            helper.doAction('default');

            // test new state
            expect(component).isInvalid('');
            helper.showMessage('default');
          }));
          it('#4 WHEN input is touched', fakeAsync(() => {
            // set initial state
            helper.doAction('touched');

            // test new state
            expect(component).isInvalid('');
            helper.showMessage('default');
          }));
          it('#6 WHEN input is not changed', fakeAsync(() => {
            // set initial state
            helper.doAction('changed_input',  '');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  helper.getCurrentValue()} );
            expect(component).isInvalid('');
            helper.showMessage('default');
          }));
          it('#8 WHEN input is extended to "xxx"', fakeAsync(() => {
            // set initial state
            helper.doAction('changed_input', 'xxx');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isInvalid('');
            helper.showMessage('default');
          }));
        });
        describe('=> SHOW message="default_active"', () => {
          it('#2 WHEN empty input is active', fakeAsync(() => {
            // set initial state
            helper.doAction('active_input');

            // test new state
            expect(component).isInvalid('');
            helper.showMessage('default_active');
          }));
          it('#3 WHEN input is touching', fakeAsync(() => {
            // set initial state
            helper.doAction('touch');

            // test new state
            expect(component).isInvalid('');
            helper.showMessage('default_active');
          }));
          it('#5 WHEN input is shrinking to empty', fakeAsync(() => {
            // set initial state
            helper.doAction('change_input',  '');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  helper.getCurrentValue()} );
            expect(component).isInvalid('');
            helper.showMessage('default_active');
          }));
           // @TODO: adapt
          it('#7 WHEN input is extending to "xxx"', fakeAsync(() => {
            // set initial state
            helper.doAction('change_input', 'xxx');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isInvalid('');
            helper.showMessage('default_active');
            // helper.showMessage('error_required');
          }));
        });
      });
      describe('when submitted with value "xx"', () => {
        beforeEach(async(() => {
          helper.doAction('changed_input', 'xx');
          component.submitted = true;
          helper = new Helper(fixture, 'textarea');
        }));
        describe('=> SHOW message="default"', () => {
          it('#1 WHEN input is not changed', fakeAsync(() => {

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  helper.getCurrentValue()} );
            expect(component).isInvalid('');
            helper.showMessage('default');
          }));
          it('#6 WHEN input is changed to empty', fakeAsync(() => {
            // set initial state
            // helper.doAction('change_input', 'x');
            helper.doAction('changed_input',  '');
            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isInvalid('');
            helper.showMessage('default');
          }));
          it('#8 WHEN input is changed to valid input', fakeAsync(() => {
            // set initial state
            helper.doAction('changed_input', 'xxx@asdf.de');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isValid('');
            helper.showMessage('default');
          }));
        });
        describe('=> SHOW message="has_error"', () => {
          it('#3 WHEN input is touched', fakeAsync(() => {
            // set initial state
            helper.doAction('touched');

            // test new state
            expect(component).isInvalid('pattern');
            helper.showMessage('has_error');
          }));
          it('#5 WHEN input is shrinked to "x"', fakeAsync(() => {
            // set initial state
            helper.doAction('changed_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isInvalid('pattern');
            helper.showMessage('has_error');
          }));
          xit('#6 WHEN input is changed to empty and we  go back to input', fakeAsync(() => {
            // set initial state
            // helper.doAction('change_input', 'x');
            helper.doAction('changed_input',  '');
            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isInvalid('');
            helper.showMessage('default');

            helper.doAction('touch');
            // test new state => dont show error
            expect(component).isInvalid('');
            helper.showMessage('default');

            // helper.doAction('change_input',  'x');
            // // test new state => dont show error
            // expect(component).isInvalid('pattern');
            // helper.showMessage('default_active');

            helper.doAction('changed_input',  'xx');
            // test new state => dont show error
            expect(component).isInvalid('pattern');
            helper.showMessage('has_error');
          }));
        });
        describe('=> SHOW message="error_pattern"', () => {
          it('#2 WHEN input is active', fakeAsync(() => {
            // set initial state
            helper.doAction('active_input');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  helper.getCurrentValue()} );
            expect(component).isInvalid('pattern');
            helper.showMessage('error_pattern');
          }));
          it('#4 WHEN input is shrinking to "x"', fakeAsync(() => {
            // set initial state
            helper.doAction('change_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isInvalid('pattern');
            helper.showMessage('error_pattern');
          }));
        });
        describe('=> SHOW message="has_success"', () => {
          it('#7  WHEN input is changed to valid input', fakeAsync(() => {
            // set initial state
            helper.doAction('change_input', 'xxx@asdf.de');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isValid('');
            helper.showMessage('has_success');
          }));
        });

      });
      describe('when submitted without value', () => {
        beforeEach(async(() => {
          component.submitted = true;
          helper.doAction('touched');
          helper = new Helper(fixture, 'textarea');
        }));
        describe('=> SHOW message="default"', () => {
          it('#9 WHEN input has correctly changed', fakeAsync(() => {
            // set initial state
            helper.doAction('active_input');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  helper.getCurrentValue()} );
            expect(component).isInvalid('required');
            helper.showMessage('error_required');

            // set new state  => occurs pattern error
            helper.doAction('change_input', 'xxx');

            // test renewed state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isInvalid('required');
            helper.showMessage('error_required');

            // set new state
            helper.doAction('change_input', 'xxx@daf.de');

            // test renewed state
            helper.showStatus('has_success', msg.VALID ,  CHANGED);

            // set new state
            helper.doAction('touched');

            // test renewed state
            // TODO: changed muss auf 'xxx' testen
            helper.showStatus('default', msg.VALID ,  CHANGED);
            // expect(component).hasChanged({ action: 'input_changed', oldValue:  'xxx'} );
            // expect(component).isValid('');
            // helper.showMessage('default');

          }));
        });
        describe('=> SHOW message="has_error"', () => {
          it('#1 WHEN input is not changed', fakeAsync(() => {
            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  helper.getCurrentValue()} );
            expect(component).isInvalid('required');
            helper.showMessage('has_error');
          }));
          it('#3 WHEN input is touched', fakeAsync(() => {
            // set initial state
            helper.doAction('touched');

            // test new state
            expect(component).isInvalid('required');
            helper.showMessage('has_error');
            // helper.showMessage('has_success');
          }));
          it('#5 WHEN input is changed to "x"', fakeAsync(() => {
            // set initial state
            helper.doAction('changed_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isInvalid('pattern');
            helper.showMessage('has_error');
          }));
          it('#6 (TODO) WHEN input is changed to empty', fakeAsync(() => {
            // set initial state
            helper.doAction('changed_input',  '');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  helper.getCurrentValue()} );
            expect(component).isInvalid('required');
            helper.showMessage('has_error');
          }));
          it('#7 WHEN input is extended to "xxx"', fakeAsync(() => {
            // set initial state
            helper.doAction('changed_input', 'xxx');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isInvalid('pattern');
            helper.showMessage('has_error');
          }));
        });
        describe('=> SHOW message="error_required"', () => {
          it('#2 WHEN input is active', fakeAsync(() => {
            // set initial state
            helper.doAction('active_input');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  helper.getCurrentValue()} );
            expect(component).isInvalid('required');
            helper.showMessage('error_required');
          }));
          it('#4 (wrong) WHEN input is changing to "x"', fakeAsync(() => {
            // set initial state
            helper.doAction('change_input', 'x');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isInvalid('required');
            helper.showMessage('error_required');
          }));
        });
        describe('=> SHOW message="error_pattern"', () => {
          it('#8 (IMPORTANT) should change error message from required to pattern after leaving field', fakeAsync(() => {
            // set initial state
            helper.doAction('active_input');

            // test new state
            expect(component).hasChanged({ action: 'input_not_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isInvalid('required');
            helper.showMessage('error_required');

            // set new state  => occurs pattern error
            helper.doAction('change_input', 'xxx');

            // test renewed state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isInvalid('required');
            helper.showMessage('error_required');

            // set new state
            helper.doAction('changed_input', 'xxxx');

            // test renewed state when left
            expect(component).hasChanged({ action: 'input_changed', oldValue:  'xxx'} );
            expect(component).isInvalid('pattern');
            helper.showMessage('has_error');

            // set new state  => occurs pattern error
            helper.doAction('touch');

            // test renewed state message
            expect(component).isInvalid('pattern');
            helper.showMessage('error_pattern');
          }));
          it('#XXX (IMPORTANT) should change error message from required to pattern after leaving field', fakeAsync(() => {
            // set initial state
            helper.doAction('changed_input', 'xxx@adsfdf.de');

            // test new state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  helper.getDefaultValue()} );
            expect(component).isValid('');
            helper.showMessage('default');
            // @TODO: eigentlich success

            // set new state  => occurs pattern error
            helper.doAction('change_input', 'xxx');

            // test renewed state
            expect(component).hasChanged({ action: 'input_changed', oldValue:  'xxx@adsfdf.de'} );
            expect(component).isInvalid('pattern');
            helper.showMessage('error_pattern');

            // WAIT
            // set new state
            helper.doAction('changed_input', 'xxxx');

            // test renewed state when left
            expect(component).hasChanged({ action: 'input_changed', oldValue:  'xxx'} );
            expect(component).isInvalid('pattern');
            helper.showMessage('has_error');

            // set new state  => occurs pattern error
            helper.doAction('touch');

            // test renewed state message
            expect(component).isInvalid('pattern');
            helper.showMessage('error_pattern');
          }));
        });
      });
    });
  });
});
