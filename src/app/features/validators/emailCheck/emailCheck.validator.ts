// angular
import { AbstractControl } from '@angular/forms';

/**
 * validator for emails
 * @param control reference to an abstract control
 */
export function EmailCheckValidator(control: AbstractControl) {

  /**
   * use input as base
   */
  const input = control.value;

    // empty input
    if (!input) {
      return {
        // EmailCheck: 'noEmailAddress'
        required: true
      };
    }

  /**
   * split input to get email address
  */
  const email = input.split('@');
  // const locale = email[0];
  if (email[1]) {
    const domain = email[1].split('.');

    if (domain.length > 1) {
      // input: foobar@domain.
      if (domain[1].length < 2) {
        return {
          // EmailCheck: 'noTld'
          pattern: 'noTld'
        };
      } else {
        return null;

      }
    } else {
      // input: foobar@domain
      return {
          // EmailCheck: 'invalidDomain'
          pattern: 'invalidDomain'
        };
      }
    }

    // input: foobar or foobar@
    return {
      // EmailCheck: 'noDomain'
      pattern: 'noDomain'
    };
}
