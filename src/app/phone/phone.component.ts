import { Component, OnInit, Input, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
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
    this.tagName = this.elementRef.nativeElement.tagName.toLowerCase().replace(environment.prefix, '');
  }
  ngOnInit() {
    this.label = this.label || 'Telefonnummer';
    this.required = this.required !== 'false' ? 'true' : 'false';
    const controlValidators = [];
    if (this.required === 'true') {
      controlValidators.push(Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\\s\.\/0-9]*'));
    }

    this.group.addControl('phone', new FormControl('', controlValidators));
  }
}
