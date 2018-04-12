
## Setup
describe('VALIDATOR=pattern', () => {
    describe('not submitted', () => {
        describe('=> SHOW message="default"', () => {
            it('#xx1 WHEN input has not changed', fakeAsync(() => {
            }
        });
    });
    describe('when submitted with value "xxx"', () => {
    });
});
## Code

Basic test
```
doAction('changed_input', 'xxx');
showStatus('default', msg.INVALID , CHANGED);
```

also important when value changed during test
```
doAction('changed_input', 'xxx');
showStatus('default', msg.INVALID , CHANGED);

 _oldValue = inputElement.value;

doAction('changed_input', 'xxxy');
showStatus('default', msg.INVALID , CHANGED);
```

## Custom Matcher
(utils/testing/custom-matcher.ts)

* hasChanged(expected: {[k: string]: string}|string): boolean;
* isValid(expected: string): boolean;
* isInvalid(expected: string): boolean;
* showErrorIcon(expected: boolean): boolean;
* showErrorMessage(expected: string): boolean;
* showHiddenErrorMessage(expected: string): boolean;
* hideErrorMessage(expected: string): boolean;

## Values

### constants

* NOT_CHANGED = value has not changed
* CHANGED = value has cange
* msg.VALID = valid, no message
* msg.INVALID = invalid, no message
* msg.ERROR_PATTERN = invalid, pattern message
* msg.ERROR_REQUIRED = invalid, required message

### actions

* default
* touch
* touched
* change_input
* changed_input
* blur
* mouseleave
* active_input

### status
* default
* default_active
* has_error = just show red border
* has success
* default
* default_active
* error-required
* error-pattern