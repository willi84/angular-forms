import { Component, OnInit, Input, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ControlContainer,
  FormGroupDirective

 } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: environment.prefix + 'textarea',
  styles: [ `
  .hide-opacity{
    opacity: 0;
  }
  
`],
  template: `
  <div class="form-group"
    [formGroup]="group"
    [ngClass]="{'has-error': control.invalid && submitted }"
  >
    <label for="{{name}}" class="control-label">
    {{label}}<span *ngIf="required=='true'">*</span>:
    </label>
    <textarea rows="{{rows}}" class="form-control" type="text" formControlName="{{name}}"></textarea>
      <span class="mt30--xs form-control-feedback" [hidden]="!control.invalid || !submitted">
          <i class="icon-warning text-danger"></i>
      </span>

      <!-- placeholder -->
      <div class="text-danger {{name}}-error">
        <small    >Defaultplatzhalter</small>
      </div>

      
  </div>
  `
})
export class TextAreaComponent implements OnInit {

  @Input() submitted: Boolean;
  @Input() group: FormGroup;
  @Input() name: string;
  @Input() label?: any;
  @Input() rows = 5;
  @Input() required = 'false';
  control: any;
    constructor(private formBuilder: FormBuilder, private elementRef: ElementRef) {
    }
    ngOnInit() {
      this.required = this.required !== 'false' ? 'true' : 'false';
      this.control = this.group.get(this.name);
    }
}
