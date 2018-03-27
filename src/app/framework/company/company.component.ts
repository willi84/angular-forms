// angular
import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// confiugration
import { environment } from '@environment/environment.prod';

@Component({
  selector: environment.prefix + 'company',
  template: `
  <form-text [group]="group" [submitted]="submitted" label="{{label}}" required="{{required}}" name="{{tagName}}"></form-text>
  `
})
export class CompanyComponent implements OnInit {

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
    this.label = this.label || 'Firma';
    this.required = this.required !== 'false' ? 'true' : 'false';
    const controlValidators = [];
    if (this.required === 'true') {
      controlValidators.push(Validators.required);
    }

    this.group.addControl('company', new FormControl('', controlValidators));
  }
}
