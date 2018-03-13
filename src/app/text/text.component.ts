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
    [ngClass]="{'has-error': !(!submitted || (!control.invalid && showError === '')) }"
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
    isTyoing: {{isTyping}} | hasFocus {{ hasFocus }} | action {{ this.action}}
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
  showError =  '';
  hasFocus: false;
  isTyping: false;
  control: any;
  startValue = '';
  action = '';  // action of input between focuses
  startError: true;
  noRequired =  false;
    constructor(
      // private formBuilder: FormBuilder,
      // private elementRef: ElementRef
    ) {
      this.showError = '';
    }
    ngOnInit() {
      // set initial state, fixes also tests
      this.hasFocus = false;
      this.isTyping = false;
      this.required = this.required !== 'false' ? 'true' : 'false';
      this.control = this.group.get(this.name);
      this.showError = '';
    }
    ngOnChanges() {
       this.showError = '';
    }
    ngDoCheck() {

      // TODO: action based behaviour
      // * copy & paste
      // * delete from error/success to zero after submit
      if (this.hasFocus) {
        this.startValue = (this.startValue === '') ? this.control.value : this.startValue;
        this.action = '';
      } else {
        const lenStartValue = this.startValue.length;
        const lenControlValue = this.control.value.length;

        // actions based on activity
        if (lenStartValue > lenControlValue) {
          this.action = 'shorten';
        } else if (lenStartValue < lenControlValue) {
          this.action = 'extended';
        } else if (lenStartValue === lenControlValue) {
          this.action = 'no';
        } else {
          this.action = 'replaced';
        }
        this.startValue = '';
      }
      if (!this.isTyping ) {

        if (this.control) {
          if (!this.control.errors) {
            this.showError = '';
          } else {
            // console.log(this.name);
            // console.log(this.hasFocus);
            // console.log(this.showError);
            // console.log(this.control.errors);
            // console.log('----------');
            if (this.hasFocus && this.showError === 'required' && this.control.errors.pattern) {
              this.showError = this.showError;
            } else {
              if (this.control.errors !== null && this.submitted) {
                if (this.control.errors.pattern) {
                  this.showError = 'pattern';
                }
                if (this.control.errors.required) {
                  this.showError = 'required';
                }
                //  else {
                  //    this.showError = 'custom';
                  //  }
                  // this.showError = (this.control.errors.required) ? 'required': '';
                } else {
                  this.showError = '';
                }
              }
            }
    } else {
      this.showError = '';
    }
  } else {

  }

  }

}
