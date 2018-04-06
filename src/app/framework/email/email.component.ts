// angular
import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// configuration
import { environment } from '@environment/environment.prod';

// features
import { emailCheckValidator } from '@validators/emailCheck/emailCheck.validator';

/**
 * email component creates a email inputbox
 * @todo make submitted optional
 *
 * @example
 * <!-- Basic sample -->
 * <form-email [group]="form" [submitted]="submitted"></form-email>
 *
 * @example
 * <!-- Basic sample with required option -->
 * <form-email [...] required></form-email>
 *
 * @example
 * <!-- Basic sample with custom lable -->
 * <form-email [...] [label]="I am a Salutation"></form-email>
 */
@Component({
  selector: environment.prefix + 'email',
  template: `
  <form-text [group]="group" [submitted]="submitted" label="E-Mail" type="email" required="{{required}}" name="{{tagName}}"></form-text>
  `
})
export class EmailComponent implements OnInit {

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
    private elementRef: ElementRef,
  ) {
    this.tagName = this.elementRef.nativeElement.tagName.toLowerCase().replace(environment.prefix, '');
  }

  /**
   * creating basic setting for email component and add it to main control
   */
  ngOnInit() {

    this.label = this.label || 'E-Mail';
    this.required = this.required !== 'false' ? 'true' : 'false';

    /**
     * @todo custom pattern entfernen
     */
    const controlValidators = [Validators.pattern('[^ @]*@[^ @]*')];
    if (this.required === 'true') {
      controlValidators.push(Validators.required);
    }
    controlValidators.push(emailCheckValidator);

    this.group.addControl('email', new FormControl('', {
      validators: controlValidators
    }));
  }
}
