// angular
import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// configuration
import { environment } from '@environment/environment.prod';

/**
 * phone component creates a phone input field
 * @todo make submitted optional
 *
 * @example
 * <!-- Basic sample -->
 * <form-phone [group]="form" [submitted]="submitted"></form-phone>
 *
 * @example
 * <!-- Basic sample with required option -->
 * <form-phone [...] required></form-phone>
 *
 * @example
 * <!-- Basic sample with custom lable -->
 * <form-phone [...] [label]="I am a subject"></form-phone>
 */
@Component({
  selector: environment.prefix + 'phone',
  template: `
  <form-text [group]="group" [submitted]="submitted" label="{{label}}" type="tel" required="{{required}}" name="{{tagName}}"></form-text>
  `
})
export class PhoneComponent implements OnInit {

  /**
   * Input with status of form being submitted.
   */
  @Input() submitted: Boolean;

  /**
   * Input with reference to main form control.
   */
  @Input() group: FormGroup;

  /**
   * optional input to customize label.
   */
  @Input() label?: any;

  /**
   * input to declare element as required.
   */
  @Input() required = 'false';

  /**
   * name of html tag
   */
  public tagName: string;

  /**
   * constructor
   * @param elementRef reference to element
   */
  constructor(
    private elementRef: ElementRef
  ) {
    this.tagName = this.elementRef.nativeElement.tagName.toLowerCase().replace(environment.prefix, '');
  }

  /**
   * creating basic setting for phone component and add it to main control
   */
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
