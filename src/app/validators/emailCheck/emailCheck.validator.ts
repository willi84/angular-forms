import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl } from '@angular/forms';

/**
 * validating factory to throw different errors about the email format
 */
function validateEmailCheckFactory(): ValidatorFn {
  return (c: AbstractControl) => {
    const input = c.value;

    // empty input
    if (!input) {
      return {
        EmailCheck: 'noEmailAddress'
      };
    }
    const email = input.split('@');
    const locale = email[0];
    if (email[1]) {
      const domain = email[1].split('.');

      if (domain.length > 1) {
        // input: foobar@domain.
        if (domain[1].length < 2) {
          return {
            EmailCheck: 'noTld'
          };
        } else {
          return null;

        }
      } else {
        // input: foobar@domain
        return {
            EmailCheck: 'invalidDomain'
          };
      }
    }

    // input: foobar or foobar@
    return {
      EmailCheck: 'noDomain'
    };

  };
}

/**
 * directive to validate to detect a well-formed email address
 */
@Directive({
  selector: '[emailCheck][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: EmailCheckValidator, multi: true }
  ]
})
export class EmailCheckValidator implements Validator {

  /**
   * reference to validator member
   */
  validator: ValidatorFn;

  /**
   * constructor binding validator factory to validator
   */
  constructor() {
    this.validator = validateEmailCheckFactory();
  }

  /**
   * function to execute validation with given form
   * @param c form control to be validated
   * @returns result of validator factory
   */
  validate(c: FormControl) {
     return this.validator(c);
  }
};
