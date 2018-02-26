import { Component, OnInit, Input, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
 } from '@angular/forms';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: environment.prefix + 'phone',
  template: `
  <form-text [group]="group" [submitted]="submitted" label="{{label}}" type="tel" required="{{required}}" name="{{tagName}}"></form-text>
  `
})
export class PhoneComponent implements OnInit {

  @Input() submitted: Boolean;
  @Input() group: FormGroup;
  @Input() label?: any;
  @Input() required = 'false';
  public tagName: string;

  constructor(
    private elementRef: ElementRef
  ) {
    this.tagName = elementRef.nativeElement.tagName.toLowerCase().replace(environment.prefix, '');
  }
  ngOnInit() {
    this.label = this.label || 'Telefonnummer';
    this.required = this.required !== 'false' ? 'true' : 'false';
    const controlValidators = [];
    if (this.required === 'true') {
      controlValidators.push(Validators.required);
    }

    this.group.addControl('phone', new FormControl('', controlValidators));
  }
}
