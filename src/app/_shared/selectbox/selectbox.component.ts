// angular
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';

// configuration
import { environment } from '@environment/environment.prod';

// services
import { StatusService } from '@services/status/status.service';

/**
 * selectbox component creates a basic selectbox
 * @todo make submitted optional
 * @todo optimize css away
 * @todo adapt to other _shared components
 * @todo make values to select configurable
 *
 * @example
 * <!-- Basic sample -->
 * <form-selectbox [group]="form" [submitted]="submitted"></form-selectbox>
 *
 * @example
 * <!-- Basic sample with required option -->
 * <form-selectbox [...] required></form-selectbox>
 *
 * @example
 * <!-- Basic sample with custom lable -->
 * <form-selectbox [...] [label]="I am a Salutation"></form-selectbox>
 */
@Component({
  selector: environment.prefix + 'selectbox',
  styles: [ `
  .hide-opacity{
  }
  .form-control + span + div.text-danger{
  }
  /*.form-control:focus + span + div.text-danger{
    opacity:1;
  }
  .has-error .form-control:focus  + div.text-danger{
    opacity:1;
  }
  .icon-warning{
    color: red;
    margin-left: -50px;
    font-size: 20px;
   }*/

`],
  template: `
  <div class="form-group"
    [formGroup]="group"
    [ngClass]="{'has-error':statusService.getValidationStatus(this) }"
  >
    <label for="{{name}}" class="control-label">
    {{label}}<span *ngIf="required=='true'">*</span>
    </label>
    <select
    (change)="isSelecting=true;"
    formControlName="{{name}}" class="form-control">
    <option *ngFor="let state of states" [ngValue]="state"
      >{{state}}</option>
    </select>
    <div class="text-danger {{name}}-error">
      <span name="error-icon"
        [style.visibility]="showError === '' ? 'hidden' : 'visible'"
        class="mt30--xs form-control-feedback"
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
  </div>
  `
})
export class SelectboxComponent implements OnInit, OnChanges, DoCheck {

  /**
   * Input with status of form being submitted.
   */
  @Input() submitted: Boolean;

  /**
   * Input with reference to main form control.
   */
  @Input() group: FormGroup;

  /**
   * optional input to customize label.
   */
  @Input() label?: any;

  /**
   * input to declare element as required.
   */
  @Input() required = 'false';

  /**
   * input to declare tag name of text component (used by label, control and status)
   */
  @Input() name: string;

   /**
   * values for selectbox
   * @todo make configurable
   */
  states = ['Herr', 'Frau'];

  /**
   * type of error to be shown
   */
  showError: string;

  /**
   * flag if field has focus
   */
  hasFocus = false;

  /**
   * flag if user is typing at the field
   */
  isTyping =  false;

  /**
   * reference to control
   */
  control: any;

  /**
   * value when user do action on the field
   */
  startValue = '';

  /**
   * old value when user has interacted with the field
   */
  oldValue: '';

  /**
   * detected action of what user is doing
   */
  action = '';  // action of input between focuses

  /**
   * last action of user
   */
  lastAction = '';

  /**
   * show error on start
   */
  startError = true;

  /**
   * no required status is set
   */
  noRequired =  false;

  /**
   * special: if user is selecting
   */
  isSelecting = false;

  /**
   * constructor
   * @param statusService instance of status service component
   */
  constructor(
      public statusService: StatusService
    ) {
  }

  /**
   * creating basic setting for selectbox component onInit
   */
  ngOnInit() {
    // set initial state, fixes also tests
    this.hasFocus = false;
    this.isTyping = false;
    this.required = this.required !== 'false' ? 'true' : 'false';
    this.control = this.group.get(this.name);
    this.startValue = '';
    this.oldValue = '';
  }

  /**
   * settings on changes lifecycle-event
   */
  ngOnChanges() {
  }

  /**
   * check status on doCheck lifecycle-event
   */
  ngDoCheck() {
    this.statusService.checkStatus(this);
  }
}
