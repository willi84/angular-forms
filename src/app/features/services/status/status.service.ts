// angular
import { Injectable } from '@angular/core';

/**
 * Service for checking the control status.
 */
@Injectable()
export class StatusService {

  /**
   * contructor for StatusService component
   */
  constructor() { }

  /**
   * public method to evaluate current form control status
   * @param self reference to this
   */

  checkStatus(self: any): void {
    /**
     * @todo action based behaviour (copy & paste)
     * @todo delete from error/success to zero after submit
     */
    if (self.hasFocus && self.action === 'no') {
      self.startValue = self.oldValue;
      if (self.lastAction === 'reset' && self.control.value === '') {
        self.action = self.lastAction;
      } else {
        self.action = 'start';
      }
    }
    const lenStartValue = self.startValue ? self.startValue.length : 0;
    const lenControlValue = self.control && self.control.value ? self.control.value.length : 0;

    // actions based on activity

    if (lenStartValue > lenControlValue) {
      // input was shortened
      self.action = (self.action === 'reset') ? self.action : 'shorten';
    } else if (lenStartValue < lenControlValue) {
      // input was extended
      self.action = 'extended';
    } else if (lenStartValue === lenControlValue) {
      if (self.lastAction === 'reset' && self.control.value === '') {
        // first touch after reset
        self.action = self.action;
      } else {
        // first touch
        self.action = (self.hasFocus) ? 'start' : 'touched';
      }
    } else {
      self.action = 'replaced';
    }

    // lose focus
    if (!self.hasFocus) {
      self.oldValue = self.control.value;
      self.startValue = self.oldValue;
      self.lastAction = self.action;
      // self.action = 'no';   // wrong
    }
    if (!self.control) {
      return;
    }
    if (!self.isTyping ) {
      if (self.control.valid || !self.submitted) {

        // sets default
        self.showError = '';
      } else {
        const statusErrorChanged = self.hasFocus && self.showError === 'required' && self.control.errors.pattern;
        if (statusErrorChanged) {
          return;
        }

        if (self.submitted) {

          /**
           * @todo after reset showing error after leave
           */
          if (self.lastAction !== 'reset') {
            if (self.control.errors.pattern) {
              self.showError = 'pattern';
            }
            if (self.control.errors.required) {
              self.showError = 'required';
            }
          }

          // make reset available
          if (self.control.value === '') {
            if (self.lastAction === 'shorten') {
              self.showError = '';
            }
            if (self.action === 'shorten') {
              self.showError = '';
              self.action = 'reset';
            }
            if (self.lastAction === 'reset') {
              self.showError = '';
            }
          }

          // @todo after being valid, change to error after leave
        }
      }
    }
  }

  /**
   * public method to get the final validation status
   * @param self reference to this
   * @returns status
   */
  getValidationStatus(self) {
    const status = !(
      (!self.submitted) ||
      (!self.control.invalid && self.showError === '') ||
      (self.control.invalid && self.showError === '' && self.control.value ===  '' ) ||
      (self.control.invalid && self.showError === '' && self.lastAction ===  'reset' )
    );
    return status;
  }
}
