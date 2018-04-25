// angular
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';

// configuration
import { environment } from '@environment/environment.prod';

// services
import { StatusService } from '@services/status/status.service';

/**
 * text component creates a basic input field for text, email or numbers
 * @todo make submitted optional
 * @todo optimize local variables away
 *
 * @example
 * <!-- Basic sample -->
 * <form-text [group]="form" [submitted]="submitted"></form-text>
 *
 * @example
 * <!-- Basic sample with required option -->
 * <form-text [...] required></form-text>
 *
 * @example
 * <!-- Basic sample with custom lable -->
 * <form-text [...] [label]="I am a Salutation"></form-text>
 */
@Component({
  selector: environment.prefix + 'text',
  styles: [ ``],
  template: `
  <div class="form-group"
    [formGroup]="group"
    [ngClass]="{'has-error': statusService.getValidationStatus(this) }"
  >
    <label for="{{name}}" class="control-label">
    {{label}}<span *ngIf="required=='true'">*</span>
    </label>
    <input
    (keydown)="isTyping= true"
    (keyup)="isTyping=false"
    (focus)="hasFocus=true"
    (blur)="hasFocus=false"
    class="form-control" type="{{type}}" formControlName="{{name}}" />
    <form-status
      [showError]="showError"
      [hasFocus]="hasFocus"
      [name]="name"
      [messages]="messages"
    ></form-status>
  </div>
  `
})
export class TextComponent implements OnInit, OnChanges, DoCheck {

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
   * input to declare element as required.
   */
  @Input() type = 'text';

  /**
   * input to declare element as required.
   */
  @Input() messages?: any;

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
   * constructor
   * @param statusService instance of status service component
   */
  constructor(
    public statusService: StatusService
  ) {
  }

  /**
   * creating basic setting for text component onInit
   */
  ngOnInit() {
    // set initial state, fixes also tests
    this.hasFocus = false;
    this.isTyping = false;
    this.required = this.required !== 'false' ? 'true' : 'false';
    this.control = this.group.get(this.name);
    this.startValue = '';
    this.oldValue = '';
    // const keysMessages = Object.keys(this.messages);
    // const lenKeysMessages = keysMessages.length;

    // for (let i = 0; i < lenKeysMessages; i++) {
    //   if()
    // this.messages.forEach(value => {
    //   console.log(value);
    // });
     this.messages = this.messages || environment.messages;

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
