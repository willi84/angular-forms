import {
  Component, OnInit, Input,
  OnChanges
} from '@angular/core';
import {
  FormGroup

 } from '@angular/forms';
import { environment } from '../../environments/environment.prod';
import { DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: environment.prefix + 'text',
  styles: [ `
  .hide-opacity{
  }
  .form-control  + div.text-danger{

  }
  .has-error .form-control:focus  + div.text-danger{
    opacity:1;
  }
  .icon-warning{
   color: red;
   margin-left: -30px;
   font-size: 20px;
  }
  .mt30--xs{
    margin-top: 30px;
  }
  .has-error .form-control{
    border: 1px solid red;
  }
  .has-error label{
    color: red;
  }
`],
  template: `
  <div class="form-group"
    [formGroup]="group"
    [ngClass]="{'has-error': !(!submitted || (!control.invalid && showError === '') || (control.invalid && showError === '' && control.value ==  '' ) || (control.invalid && showError === '' && lastAction ==  'reset' )) }"
  >
    <label for="{{name}}" class="control-label">
    {{label}}<span *ngIf="required=='true'">*</span>:
    </label>
    <input
    (keydown)="isTyping= true"
    (keyup)="isTyping=false"
    (focus)="hasFocus=true"
    (blur)="hasFocus=false"
    class="form-control" type="{{type}}" formControlName="{{name}}" />
    isTyoing: {{isTyping}} | hasFocus {{ hasFocus }} | action {{ this.action}} | startValue: {{ startValue}} | lastACtion: {{ lastAction}}
    <div
      class="text-danger {{name}}-error"
      >
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
export class TextComponent implements OnInit, OnChanges, DoCheck {

  @Input() submitted: Boolean;
  @Input() group: FormGroup;
  @Input() name: string;
  @Input() label?: any;
  @Input() type = 'text';
  @Input() required = 'false';
  showError: string;
  hasFocus: false;
  isTyping: false;
  control: any;
  startValue = '';
  oldValue: '';
  action = '';  // action of input between focuses
  lastAction = '';
  startError: true;
  noRequired =  false;
    constructor(
      // private formBuilder: FormBuilder,
      // private elementRef: ElementRef
    ) {
    }
    ngOnInit() {
      // set initial state, fixes also tests
      this.hasFocus = false;
      this.isTyping = false;
      this.required = this.required !== 'false' ? 'true' : 'false';
      this.control = this.group.get(this.name);
      this.startValue = '';
      this.oldValue = '';
    }
    ngOnChanges() {
    }
    ngDoCheck() {

      // TODO: action based behaviour
      // * copy & paste
      // * delete from error/success to zero after submit
      if (this.hasFocus && this.action === 'no') { // startVAlue == ''
        this.startValue = this.oldValue; // (this.startValue === '') ? this.control.value : this.oldValue;
        if(this.lastAction === 'reset' && this.control.value === ''){
          this.action = this.lastAction;
        } else {
          this.action = 'start';
        }
      }
      const lenStartValue = this.startValue.length;
      const lenControlValue = this.control.value.length;
      // actions based on activity
      if (lenStartValue > lenControlValue) {
        this.action = (this.action === 'reset') ? this.action : 'shorten';
      } else if (lenStartValue < lenControlValue) {
        this.action = 'extended';
      } else if (lenStartValue === lenControlValue) {
        if(this.lastAction === 'reset' && this.control.value === ''){
          this.action = this.action;
        } else {
          this.action = (this.hasFocus) ? 'start' : 'touched'; //  (lenStartValue === 0) ? 'no' : 'start';
        }
      } else {
        this.action = 'replaced';
      }
      if (!this.hasFocus) {
        this.oldValue = this.control.value;
        this.startValue = this.oldValue;
        this.lastAction = this.action;
        this.action = 'no';
      }
      if (!this.isTyping ) {

        if (this.control) {
          if (!this.control.errors) {
            this.showError = '';  // sets default
          } else {
            
            
            if (this.hasFocus && this.showError === 'required' && this.control.errors.pattern) {
              // @TODO: maybe deletable
              // this.showError = this.showError;
            } else {
              // console.log('else');
              // console.log(this.action + " | " + this.control.value);
              if (this.control.errors !== null && this.submitted) {

                // Todo: after reset show error after leave
                if(this.lastAction !== 'reset'){

                  if (this.control.errors.pattern) {
                    this.showError = 'pattern';
                  }
                  if (this.control.errors.required) {
                    this.showError = 'required';
                  }
                }

                // make reset available
                if (this.lastAction === 'shorten' && this.control.value === '') {
                  this.showError = '';
                }
                if (this.action === 'shorten' && this.control.value === '') {
                  this.showError = '';
                  this.action = 'reset';
                }
                if (this.lastAction === 'reset' && this.control.value === '') {
                  this.showError = '';
                }

                // Todo: after being valid, change to error after leave

                } else {
                  this.showError = '';
                }
              }
              // }
            }
        }
      } else {
      }

    }

}
