



import { expect } from '@utils/testing/custom-matcher';

export class Helper {
  fixture: any;
  element: any;
  compiled: any;
  // component: any;
  _oldValue: any;
  oldValues: Array<string>;
  constructor(fixture, query) {
    this.fixture = fixture;
    this.compiled = this.fixture.debugElement.nativeElement;
    this.element = this.compiled.querySelector(query);
    this._oldValue = this.element.value;
    this.oldValues = [];

  }
  refreshOldValue() {
    this._oldValue = this.element.value;
    this.oldValues.push(this._oldValue);
  }
  getCurrentValue() {
    return this.element.value;
  }
  getDefaultValue() {
    return this._oldValue;
  }
  getPreviousValue() {

    return this.oldValues[this.oldValues.length - 2];
  }
  doAction( action: string , new_value?: string) {
    switch (action) {
      case 'change_input':
        // without event input no value will be set
        this.element.dispatchEvent(new Event('focus'));
        this.element.value = new_value;
        this.element.dispatchEvent(new Event('input'));
        this.oldValues.push(new_value);
        break;
      case 'changed_input':
        // without event input no value will be set
        this.element.dispatchEvent(new Event('focus'));
        this.element.value = new_value;
        this.element.dispatchEvent(new Event('input'));
        this.element.dispatchEvent(new Event('blur'));
        this.oldValues.push(new_value);
        break;
      case 'touch':
        this.element.dispatchEvent(new Event('focus'));
        break;
      case 'blur':
        this.element.dispatchEvent(new Event('blur'));
        break;
      case 'mouseleave':
        this.element.dispatchEvent(new Event('mouseleave'));
        break;
      case 'input':
        this.element.dispatchEvent(new Event('focus'));
        this.element.dispatchEvent(new Event('input'));
        break;
      case 'touched':
        this.element.dispatchEvent(new Event('focus'));
        this.element.dispatchEvent(new Event('blur'));
        break;
      case 'active_input':
        this.element.dispatchEvent(new Event('blur'));
        this.element.dispatchEvent(new Event('focus'));
        break;
      case 'default':
        // this.element.dispatchEvent(new Event('input'));
        break;
      }
      this.fixture.detectChanges();
  }
  showStatus( action: string, isValid: any, hasChanged: boolean) {
    const inputChanged = (hasChanged === true) ? 'input_changed' : 'input_not_changed';
    const _component = this.fixture.componentInstance;
    const oldValue = (hasChanged) ? this.getPreviousValue() : this._oldValue;
    expect(_component).hasChanged({ action: inputChanged, oldValue: oldValue} );
    if (isValid.valid === true) {
      expect(_component).isValid('');
    } else {
      expect(_component).isInvalid(isValid.message);
    }
    this.showMessage(action);
  }

  // @TODO: extract to custom matcher  hasChanged isValid
 showMessage(action) {
    const _compiled = this.fixture.debugElement.nativeElement;
    const _component = this.fixture.componentInstance;
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
}

