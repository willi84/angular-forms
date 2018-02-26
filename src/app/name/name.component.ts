import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
 } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: environment.prefix + 'name',
  template: `
  <form-text [group]="group" [submitted]="submitted" label="{{label}}" required="{{required}}" name="{{name}}"></form-text>
  `
})
export class NameComponent implements OnInit {

  @Input() submitted: Boolean;
  @Input() group: FormGroup;
  @Input() name: string;
  @Input() label?: any;
  @Input() required = 'false';
  constructor() {
  }
  ngOnInit() {
    this.label = this.label || 'Name';
    this.required = this.required !== 'false' ? 'true' : 'false';
    const controlValidators = [];
    if (this.required === 'true') {
      controlValidators.push(Validators.required);
    }

    this.group.addControl(this.name, new FormControl('', controlValidators));
  }
}
