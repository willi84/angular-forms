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
  selector: environment.prefix + 'selectbox',
  styles: [ `
  .hide-opacity{
    opacity: 0;
  }
  .form-control + span + div.text-danger{
    opacity:0;

  }
  .form-control:focus + span + div.text-danger{
    opacity:1;
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
    <select formControlName="{{name}}" class="form-control">
      <option *ngFor="let state of states" [ngValue]="state">{{state}}</option>
    </select>

      <span class="mt40--xs form-control-feedback" [hidden]="!control.invalid || !submitted">
          <i class="icon-warning fs10--sm  ml10--xs text-danger"></i>
      </span>
    <div class="text-danger {{name}}-error" [ngClass]="{'hide-opacity': (!control.invalid || !submitted) }">
      <small
      [hidden]="!control.hasError('required') || !submitted"
      >Pflichtfeld.</small>
    </div>
    <div class="text-danger {{name}}-error">
      <small  [hidden]="!control.hasError('pattern') || !submitted"
      >Bitte überprüfen Sie das Textfeld.</small>
    </div>
  </div>
  `
})
export class SelectboxComponent implements OnInit {

  @Input() submitted: Boolean;
  @Input() group: FormGroup;
  @Input() name: string;
  @Input() label?: any;
  @Input() required = 'false';
  control: any;
  states = ['Herr', 'Frau'];
    constructor(private formBuilder: FormBuilder, private elementRef: ElementRef) {
    }
    ngOnInit() {
      this.required = this.required !== 'false' ? 'true' : 'false';
      this.control = this.group.get(this.name);
    }
}
