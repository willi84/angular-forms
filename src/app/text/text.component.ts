import { Component, OnInit, Input, ElementRef, OnChanges} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ControlContainer,
  FormGroupDirective

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
    (focus)="hasFocus=true"
    (blur)="hasFocus=false"
    class="form-control" type="{{type}}" formControlName="{{name}}" />
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
  control: any;
  startValue: string;
  startError: true;
  noRequired =  false;
    constructor(private formBuilder: FormBuilder, private elementRef: ElementRef) {
      this.showError = '';
    }
    ngOnInit() {
      this.required = this.required !== 'false' ? 'true' : 'false';
      this.control = this.group.get(this.name);
      this.showError = '';
    }
    ngOnChanges() {
       this.showError = '';
    }
    ngDoCheck() {
       this.showError = '';
      if (this.control) {
        if (!this.control.errors) {
          this.showError = '';
        } else {

          if (this.control.errors !== null && this.submitted){
            if (this.control.errors.required) {
              this.showError = 'required';
            }
            if (this.control.errors.pattern) {
              this.showError = 'pattern';
            }
            //  else {
              //    this.showError = 'custom';
              //  }
              // this.showError = (this.control.errors.required) ? 'required': '';
            } else {
              this.showError = '';
            }
          }
    } else {
      this.showError = '';
    }

  }
}
