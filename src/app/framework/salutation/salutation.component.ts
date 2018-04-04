// angular
import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// configuration
import { environment } from '@environment/environment';

/**
 * salutation component creates a salutation selectbox
 * @todo make submitted optional
 *
 * @example
 * <!-- Basic sample -->
 * <form-salutation [group]="form" [submitted]="submitted"></form-salutation>
 *
 * @example
 * <!-- Basic sample with required option -->
 * <form-salutation [...] required></form-salutation>
 *
 * @example
 * <!-- Basic sample with custom lable -->
 * <form-salutation [...] [label]="I am a Salutation"></form-salutation>
 */
@Component({
  selector: environment.prefix + 'salutation',
  template: `
  <form-selectbox [group]="group" [submitted]="submitted" label="{{label}}" required="{{required}}" name="{{tagName}}"></form-selectbox>
  `
})
export class SalutationComponent implements OnInit {

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
   * creating basic setting for salutation component and add it to main control
   */
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
