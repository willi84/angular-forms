import { Component, OnInit, Input, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators

 } from '@angular/forms';
import { environment } from '../../environments/environment.prod';
import { EmailCheckValidator } from './../validators/emailCheck/emailCheck.validator';
@Component({
  selector: environment.prefix + 'email',
  template: `
  <form-text [group]="group" [submitted]="submitted" label="E-Mail" type="email" required="{{required}}" name="{{tagName}}"></form-text>
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
  ) {
    this.tagName = this.elementRef.nativeElement.tagName.toLowerCase().replace(environment.prefix, '');
  }
  ngOnInit() {

    this.label = this.label || 'E-Mail';
    this.required = this.required !== 'false' ? 'true' : 'false';
    const controlValidators = [Validators.pattern('[^ @]*@[^ @]*')];
    if (this.required === 'true') {
      controlValidators.push(Validators.required);
    }
    controlValidators.push(EmailCheckValidator);

    this.group.addControl('email', new FormControl('', {
      validators: controlValidators
    }));
  }
}
