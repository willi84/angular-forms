import { Component, OnInit, Input, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
 } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: environment.prefix + 'message',
  template: `
  <form-textarea [group]="group" [submitted] ="submitted"
  label="{{label}}" name="{{tagName}}" required="{{required}}"
  ></form-textarea>
  `
})
export class MessageComponent implements OnInit {

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
    this.label = this.label || 'Firma';
    this.required = this.required !== 'false' ? 'true' : 'false';
    // this.group.push(new FormControl('', [Validators.required]))
    this.group.addControl('message', new FormControl('', [Validators.required]));
  }
}
