import {isUndefined} from "util";
declare var global: any;
const _global = <any>(typeof window === 'undefined' ? global : window);



// declare namespace jasmine {
// 	interface Matchers {
// 		toHaveCssStyle(expected: any): boolean;
// 	}
// }

/**
 * Extend the API to support chaining with custom matchers
 */
export const expect: (actual: any) => NgMatchers = <any> _global.expect;

/**
 * Jasmine matchers that support checking custom CSS conditions.
 * !! important to add your custom matcher to the interface
 */
export interface NgMatchers extends jasmine.Matchers<any> {
  hasChanged(expected: {[k: string]: string}|string): boolean;
  isValid(expected: string): boolean;
  isInvalid(expected: string): boolean;
  showErrorIcon(expected: boolean): boolean;
  showErrorMessage(expected: string): boolean;
  showHiddenErrorMessage(expected: string): boolean;
  hideErrorMessage(expected: string): boolean;
}

/**
 * Implementation of 1...n custom matchers
 * cloned from @angular/core
 */
export const customMatchers: jasmine.CustomMatcherFactories = {

  hasChanged: function () {
    return {
      compare: (actual: any, styles: {[k: string]: string}|string): jasmine.CustomMatcherResult => {

          let expectedAction = '';
          let oldValue = '';
          if (typeof styles === 'string') {
            expectedAction = styles;
          } else {
            expectedAction = styles.action;
            oldValue =  styles.oldValue;
          }
          const control = actual.control;
          let action = '';

        const result: jasmine.CustomMatcherResult = {
          pass: false,
          message: ''
        };

        // CHECK
        if (oldValue !== control.value) {
          if (!control.pristine) {
            action = 'input_changed';
          }
        } else {
          action = 'input_not_changed';
        }

        if (action === expectedAction) {
          result.pass = true;
        } else {
          // ERROR
          result.message =  `Expecting action='${expectedAction}' (is: ${action})`;
        }
        return result;
      }
    };
  },
  isValid: function () {
    return {
      compare: (actual: any, expected: any): jasmine.CustomMatcherResult => {

        expected = expected || '';

        const result: jasmine.CustomMatcherResult = {
          pass: false,
          message: ''
      };
        if (actual.control.valid && actual.showError === expected ) {

          // @TODO: check actual.control.errors[expected]
          result.pass = true;
        } else {
           // ERROR
           result.message =  `
           Expecting control.valid=true (is: ${actual.control.valid}) && showError='${expected}' (is: '${actual.showError}')
         `;
        }
        return result;
      }
    };
  },
  isInvalid: function () {
    return {
      compare: (actual: any, expected: any): jasmine.CustomMatcherResult => {

        expected = expected || '';

        const result: jasmine.CustomMatcherResult = {
          pass: false,
          message: ''
      };
        if (actual.control.invalid && actual.showError === expected ) {

          // @TODO: check actual.control.errors[expected]
          result.pass = true;
        } else {
           // ERROR
           result.message =  `
           Expecting control.invalid=true (is: ${actual.control.invalid}) && showError='${expected}' (is: '${actual.showError}')
         `;
        }
        return result;
      }
    };
  },

  showErrorIcon: function () {
    return {
      compare: (actual: any, expected: any): jasmine.CustomMatcherResult => {

        expected = expected || false;
        const selector = {
          errorIcon : `[name="error-icon"]`
        };
        const result: jasmine.CustomMatcherResult = {
            pass: false,
            message: ''
        };

        // get errorIconBlock
        const errorIconBlock = actual.querySelectorAll(selector.errorIcon);

        // block should exists just one time
        if (errorIconBlock.length === 1) {
          const errorIconBlockStyles = errorIconBlock[0].getAttribute('style');

          // condition when each Block is visible
          const showErrorIcon = errorIconBlockStyles.search(/visibility\:\svisible\;/) !== -1;

          // block should be visible
          if (showErrorIcon === expected) {

            // SUCCESS
            result.pass = true;
          } else {
            // ERROR
            result.message = `Expecting ${selector.errorIcon} is shown == ${showErrorIcon}`;
          }
        } else {
            // ERROR
            result.message = `Expecting ${selector.errorIcon} exists once == count: ${errorIconBlock.length}`;
        }

        return result;
      }
    };
  },

  hideErrorMessage: function () {
    return {
      compare: (actual: any, expected: any): jasmine.CustomMatcherResult => {

        expected = expected || '';
        const selector = {
          errorMessageBlock : `[name="error-message"]`,
          errorMessage      : `[name="error-${expected}"]`
        };
        const result: jasmine.CustomMatcherResult = {
            pass: false,
            message: ''
        };

        // get errorMessageBlock && errorMessage
        const errorMessageBlock = actual.querySelectorAll(selector.errorMessageBlock);
        const errorMessage = actual.querySelectorAll(selector.errorMessage);
       
        // both blocks should exists just one time
        if (errorMessageBlock.length === 1 && errorMessage.length === 1) {
          const errorIconBlockStyles = errorMessageBlock[0].getAttribute('style');

          // condition when each Block is visible
          const hideError =  (errorMessage[0].hasAttribute('hidden'));
          const showErrorBlock = errorIconBlockStyles.search(/visibility\:\svisible\;/) !== -1;
          const hiddenErrorBlock = errorIconBlockStyles.search(/visibility\:\shidden\;/) !== -1;
          // both blocks should be visible
          if ((hideError && showErrorBlock) || (hiddenErrorBlock)) {

            // SUCCESS
            result.pass = true;
          } else {

            // ERROR
            result.message =
            `Expecting
              ${selector.errorMessageBlock} is shown == ${showErrorBlock}
              &&
              ${selector.errorMessage} is hidden == ${hideError}
            `;
          }

        } else {

          // ERROR
          result.message =  `Expecting
            ${selector.errorMessageBlock} exists once == count: ${errorMessageBlock.length}
            &&
            ${selector.errorMessage} exists once == count: ${errorMessage.length}
          `;
        }
        return result;
      }
    };
  },
  showErrorMessage: function () {
    return {
      compare: (actual: any, expected: any): jasmine.CustomMatcherResult => {

        expected = expected || '';
        const selector = {
          errorMessageBlock : `[name="error-message"]`,
          errorMessage      : `[name="error-${expected}"]`
        };
        const result: jasmine.CustomMatcherResult = {
            pass: false,
            message: ''
        };

        // get errorMessageBlock && errorMessage
        const errorMessageBlock = actual.querySelectorAll(selector.errorMessageBlock);
        const errorMessage = actual.querySelectorAll(selector.errorMessage);
       
        // both blocks should exists just one time
        if (errorMessageBlock.length === 1 && errorMessage.length === 1) {
          const errorIconBlockStyles = errorMessageBlock[0].getAttribute('style');

          // condition when each Block is visible
          const showError = ! (errorMessage[0].hasAttribute('hidden'));
          const showErrorBlock = errorIconBlockStyles.search(/visibility\:\svisible\;/) !== -1;

          // both blocks should be visible
          if (showError && showErrorBlock) {

            // SUCCESS
            result.pass = true;
          } else {

            // ERROR
            result.message =
            `Expecting
              ${selector.errorMessageBlock} is shown == ${showErrorBlock}
              &&
              ${selector.errorMessage} is shown == ${showError}
            `;
          }

        } else {

          // ERROR
          result.message =  `Expecting
            ${selector.errorMessageBlock} exists once == count: ${errorMessageBlock.length}
            &&
            ${selector.errorMessage} exists once == count: ${errorMessage.length}
          `;
        }
        return result;
      }
    };
  },
  showHiddenErrorMessage: function () {
    return {
      compare: (actual: any, expected: any): jasmine.CustomMatcherResult => {

        expected = expected || '';
        const selector = {
          errorMessageBlock : `[name="error-message"]`,
          errorMessage      : `[name="error-${expected}"]`
        };
        const result: jasmine.CustomMatcherResult = {
            pass: false,
            message: ''
        };

        // get errorMessageBlock && errorMessage
        const errorMessageBlock = actual.querySelectorAll(selector.errorMessageBlock);
        const errorMessage = actual.querySelectorAll(selector.errorMessage);
       
        // both blocks should exists just one time
        if (errorMessageBlock.length === 1 && errorMessage.length === 1) {
          const errorIconBlockStyles = errorMessageBlock[0].getAttribute('style');

          // condition when each Block is visible
          const showError = ! (errorMessage[0].hasAttribute('hidden'));
          const hiddenErrorBlock = errorIconBlockStyles.search(/visibility\:\shidden\;/) !== -1;

          // both blocks should be visible
          if (showError && hiddenErrorBlock) {

            // SUCCESS
            result.pass = true;
          } else {

            // ERROR
            result.message =
            `Expecting
              ${selector.errorMessageBlock} is hidden == ${hiddenErrorBlock}
              &&
              ${selector.errorMessage} is shown == ${showError}
            `;
          }

        } else {

          // ERROR
          result.message =  `Expecting
            ${selector.errorMessageBlock} exists once == count: ${errorMessageBlock.length}
            &&
            ${selector.errorMessage} exists once == count: ${errorMessage.length}
          `;
        }
        return result;
      }
    };
  },

};
