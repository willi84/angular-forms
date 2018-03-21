import { AbstractControl } from '@angular/forms';




export function EmailCheckValidator(control: AbstractControl) {
  const input = control.value;

    // empty input
    if (!input) {
      return {
        // EmailCheck: 'noEmailAddress'
        required: true
      };
    }
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
