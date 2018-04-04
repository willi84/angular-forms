// angular
import { Component, OnInit, Input } from '@angular/core';

// configurtion
import { environment } from '@environment/environment.prod';

/**
 * status component creates a status text with error icon
 * @todo make submitted optional
 * @todo optimize for success
 *
 * @example
 * <!-- Basic sample -->
 * <form-status [showError]="showError" [hasFocus]="hasFocus" [name]="name"></form-status>
 */
@Component({
  selector: environment.prefix + 'status',
  template: `
  <div class="text-danger {{name}}-error">
    <span name="error-icon"
      [style.visibility]="showError === '' ? 'hidden' : 'visible'"
      class="mt{{marginTop}}--xs form-control-feedback"
    >
      <i class="icon-warning glyphicon glyphicon-alert text-danger"></i>
    </span>
    <div name="error-message" class="text-danger {{name}}-error"
        [style.visibility]="hasFocus ? 'visible' : 'hidden'"
      >
        <small name="error-required"
          [hidden]="!(showError === 'required')"
          >Das ist ein Pflichtfeld</small>
        <small name="error-pattern"
          [hidden]="!(showError === 'pattern')"
        >Bitte überprüfen Sie das Textfeld.</small>
        <small  name="error-default" [hidden]="!(showError === '')"
        >&nbsp;</small>
    </div>
  </div>
  `,
  styles: [ `
  ` ]
})
export class StatusComponent implements OnInit {

  /**
   * type of error to be shown
   */
  @Input() showError: string;

  /**
   * flag if field has focus (no default value)
   */
  @Input() hasFocus: boolean;

  /**
   * input to declare tag name of text component (used by label, control and status)
   */
  @Input() name: string;

  /**
   * input to declare the marginTop margin of the error icon
   */
  @Input() marginTop ? = 30;

  /**
   * constructor
   */
  constructor() { }

  /**
   * settings on onInit lifecycle event
   */
  ngOnInit() {
  }

}
