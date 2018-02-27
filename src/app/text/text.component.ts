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

@Component({
  selector: environment.prefix + 'text',
  styles: [ `
  .hide-opacity{
    opacity: 0;
  }
  .form-control  + div.text-danger{
    opacity:0;

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
    <input class="form-control" type="{{type}}" formControlName="{{name}}" />
    
    <div 
      class="text-danger {{name}}-error"
      [ngClass]="{'hide-opacity': (!submitted) }">
    <span 
      class="mt30--xs form-control-feedback" 
      >
        <i class="icon-warning glyphicon glyphicon-alert text-danger"></i>
    </span>
  
      <div class="text-danger {{name}}-error">
      <small 
        [hidden]="!(showError === 'required')"
        >Das ist ein Pflichtfeld</small>
      </div>
      <small  [hidden]="!(showError === 'pattern')"
      >Bitte überprüfen Sie das Textfeld.</small>
    </div>
  </div>
  `
})
export class TextComponent implements OnInit, OnChanges {

  @Input() submitted: Boolean;
  @Input() group: FormGroup;
  @Input() name: string;
  @Input() label?: any;
  @Input() type = 'text';
  @Input() required = 'false';
  showError =  '';
  control: any;
  startValue: string;
  startError: true;
  noRequired =  false;
    constructor(private formBuilder: FormBuilder, private elementRef: ElementRef) {
    }
    ngOnInit() {
      this.required = this.required !== 'false' ? 'true' : 'false';
      this.control = this.group.get(this.name);
    }
    ngOnChanges(){
      console.log('ngdocheck')
    }
    ngDoCheck(){
      console.log('ngOnchanges')
      if(this.control){

        if(this.control.errors !== null && this.submitted){
          if(this.control.errors.required){
            this.showError = 'required';
          }
          else if(this.control.errors.pattern){
            this.showError = 'pattern'
          }
         else {
           this.showError = 'custom';
         }
        // this.showError = (this.control.errors.required) ? 'required': '';
        
      } else {
        this.showError = '';
      }
    }

    }
}
