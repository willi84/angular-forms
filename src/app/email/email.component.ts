import { Component, OnInit, Input, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators

 } from '@angular/forms';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: environment.prefix + 'email',
  template: `
  <form-text [group]="group" [submitted]="submitted" label="E-Mail" required="{{required}}" name="{{tagName}}"></form-text>
  `
})
export class EmailComponent implements OnInit {

  @Input() submitted: Boolean;
  @Input() group: FormGroup;
  @Input() label?: any;
  @Input() required = 'false';
  public tagName: string;

  constructor(
    private elementRef: ElementRef,
    private formBuilder: FormBuilder
  ) {
    this.tagName = elementRef.nativeElement.tagName.toLowerCase().replace(environment.prefix, '');
  }
  ngOnInit() {
    this.label = this.label || 'E-Mail';
    this.required = this.required !== 'false' ? 'true' : 'false';
    const controlValidators = [Validators.pattern('[^ @]*@[^ @]*')];
    if (this.required === 'true') {
      controlValidators.push(Validators.required);
    }

    this.group.addControl('email', new FormControl('', {
      validators: controlValidators,
      updateOn: 'blur',
    // updateOn: 'change'
  }));
  }
}
