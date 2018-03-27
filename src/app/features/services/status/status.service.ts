// angular
import { Injectable } from '@angular/core';

/**
 * Service for checking the control status.
 */
@Injectable()
export class StatusService {

  /**
   * Konstruktor für Sanitizer.
   */
  constructor() { }

  /**
   * Öffentliche Methode um problematische Zeichen zu entfernen zur Vermeidung von XSS.
   * @param unsafe zu bereinigender String
   * @returns bereinigter String
   */

  checkStatus(self: any): void {
    // TODO: action based behaviour
    // * copy & paste
    // * delete from error/success to zero after submit
    if (self.hasFocus && self.action === 'no') { // startVAlue == ''
      self.startValue = self.oldValue; // (self.startValue === '') ? self.control.value : self.oldValue;
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
      self.action = (self.action === 'reset') ? self.action : 'shorten';
    } else if (lenStartValue < lenControlValue) {
      self.action = 'extended';
    } else if (lenStartValue === lenControlValue) {
      if (self.lastAction === 'reset' && self.control.value === '') {
        self.action = self.action;
      } else {
        self.action = (self.hasFocus) ? 'start' : 'touched'; //  (lenStartValue === 0) ? 'no' : 'start';
      }
    } else {
      self.action = 'replaced';
    }
    if (!self.hasFocus) {
      self.oldValue = self.control.value;
      self.startValue = self.oldValue;
      self.lastAction = self.action;
      self.action = 'no';
    }
    if (!self.isTyping ) {

      if (self.control) {
        if (!self.control.errors) {
          self.showError = '';  // sets default
        } else {
          if (self.hasFocus && self.showError === 'required' && self.control.errors.pattern) {
            // @TODO: maybe deletable
            // self.showError = self.showError;
          } else {
            if (self.control.errors !== null && self.submitted) {

              // Todo: after reset show error after leave
              if (self.lastAction !== 'reset') {

                if (self.control.errors.pattern) {
                  self.showError = 'pattern';
                }
                if (self.control.errors.required) {
                  self.showError = 'required';
                }
              }

              // make reset available
              if (self.lastAction === 'shorten' && self.control.value === '') {
                self.showError = '';
              }
              if (self.action === 'shorten' && self.control.value === '') {
                self.showError = '';
                self.action = 'reset';
              }
              if (self.lastAction === 'reset' && self.control.value === '') {
                self.showError = '';
              }

              // Todo: after being valid, change to error after leave

              } else {
                self.showError = '';
              }
            }
            // }
          }
      }
    } else {
    }
  }
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
