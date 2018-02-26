import { Component, OnInit, Input, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
 } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: environment.prefix + 'salutation',
  template: `
  <form-selectbox [group]="group" [submitted]="submitted" label="{{label}}" required="{{required}}" name="{{tagName}}"></form-selectbox>
  `
})
export class SalutationComponent implements OnInit {

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
    this.label = this.label || 'Anrede';
    this.required = this.required !== 'false' ? 'true' : 'false';
    const controlValidators = [];
    if (this.required === 'true') {
      controlValidators.push(Validators.required);
    }

    this.group.addControl('salutation', new FormControl('', controlValidators));
  }
}
