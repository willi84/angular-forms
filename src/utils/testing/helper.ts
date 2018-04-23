
export const helper = () =>  'hello';


/*import { customMatchers, expect } from '@utils/testing/custom-matcher';


export const doAction ( action: string , new_value?: string, inputElement: any, fixture:  any) {
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
        case 'blur':
            inputElement.dispatchEvent(new Event('blur'));
            break;
        case 'mouseleave':
            inputElement.dispatchEvent(new Event('mouseleave'));
            break;
        case 'input':
            inputElement.dispatchEvent(new Event('focus'));
            inputElement.dispatchEvent(new Event('input'));
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
}

export const showStatus ( action: string, isValid: any, hasChanged: boolean, component: any, _oldValue: string) {
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
  }*/
