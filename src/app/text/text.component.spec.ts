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
        fixture.detectChanges();
        break;
      case 'changed_input':
        // without event input no value will be set
        inputElement.dispatchEvent(new Event('focus'));
        inputElement.value = new_value;
        inputElement.dispatchEvent(new Event('input'));
        inputElement.dispatchEvent(new Event('blur'));
        fixture.detectChanges();
        break;
      case 'touch':
        inputElement.dispatchEvent(new Event('focus'));
        fixture.detectChanges();
        break;
      case 'touched':
        inputElement.dispatchEvent(new Event('focus'));
        inputElement.dispatchEvent(new Event('blur'));
        fixture.detectChanges();
        break;
      case 'active_input':
        inputElement.dispatchEvent(new Event('blur'));
        inputElement.dispatchEvent(new Event('focus'));
        fixture.detectChanges();
        break;
    }

  }

  function showNoError( _compiled, _control) {
    expect(_compiled).hideErrorMessage('required');
    expect(_compiled).hideErrorMessage('pattern');
    expect(_compiled).hideErrorMessage('default');
    // check dass nicht wackelt
    expect(_compiled).showErrorIcon(true);

  }
  function showSuccess( _compiled, _control) {
    expect(_compiled).hideErrorMessage('required');
    expect(_compiled).hideErrorMessage('pattern');
    expect(_compiled).showErrorMessage('default');
    expect(_compiled).showErrorIcon(false);
  }
  function showDefault( _compiled, _control) {
    // @TODO: müsste hiden show error messag esein
    expect(_compiled).showHiddenErrorMessage('default');
    expect(_compiled).hideErrorMessage('required');


    expect(_compiled).hideErrorMessage('pattern');
    expect(_compiled).showErrorIcon(false);
  }
  function showRequired( _compiled, _control) {
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
    _oldValue = inputElement.value;
  }));
  describe('not submitted', () => {
    it('should display default state should be created', async( () => {
      expect(component).toBeTruthy();
    }));
    it('when input is touched', fakeAsync(() => {
      // set initial state
      doAction('touched');

      // test new state
      expect(component).isInvalid('');
      showDefault( compiled, component);
    }));
    it('should display default state when input is given', fakeAsync(() => {
      // set initial state
      doAction('changed_input',  '');

      // test new state
      expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
      expect(component).isInvalid('');
      showDefault( compiled, component);
    }));
    it('should display default state when input is given', fakeAsync(() => {
      // set initial state
      doAction('changed_input', 'xxx');

      // test new state
      expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
      expect(component).isValid('');
      showDefault( compiled, component);
    }));
    it('should display default state when input is given and correct', fakeAsync(() => {
      // set initial state
      doAction('changed_input',  'xxx');

      // test new state
      expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
      expect(component).isValid('');
      showDefault( compiled, component);

      // subtmit
      const _newValue = inputElement.value;
      component.submitted = true;
      fixture.detectChanges();

      // test new state
      expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _newValue} );
      expect(component).isValid('');
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
      // set initial state
      doAction('active_input');

      // test new state
      expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
      expect(component.showError).toEqual('required');
      showRequired( compiled, component);
    }));
    it('should display no error after input has correctly changed', fakeAsync(() => {
      // set initial state
      doAction('active_input');

      // test new state
      expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
      expect(component.showError).toEqual('required');
      showRequired( compiled, component);

      // set new state
      doAction('change_input', 'xxx');

      // test renewed state
      expect(component).hasChanged({ action: 'input_changed', oldValue:  _oldValue} );
      expect(component).isValid('');
      showSuccess( compiled, component);
    }));
    it('should display default state when input is touched', fakeAsync(() => {
      // set initial state
      doAction('touched');

      // test new state
      expect(component).hasChanged({ action: 'input_not_changed', oldValue:  _oldValue} );
      expect(component).isInvalid('required');
      showNoError( compiled, component);
    }));
  });
});

