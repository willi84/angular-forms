// angular
import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// configuration
import { environment } from '@environment/environment';

/**
 * subject component creates a subject input field
 * @todo make submitted optional
 *
 * @example
 * <!-- Basic sample -->
 * <form-subject [group]="form" [submitted]="submitted"></form-subject>
 *
 * @example
 * <!-- Basic sample with required option -->
 * <form-subject [...] required></form-subject>
 *
 * @example
 * <!-- Basic sample with custom lable -->
 * <form-subject [...] [label]="I am a subject"></form-subject>
 */
@Component({
  selector: environment.prefix + 'subject',
  template: `
  <form-text [group]="group" [submitted]="submitted" label="{{label}}" required="{{required}}" name="{{tagName}}"></form-text>
  `
})
export class SubjectComponent implements OnInit {

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
   * creating basic setting for subject component and add it to main control
   */
  ngOnInit() {
    this.label = this.label || 'Betreff';
    this.required = this.required !== 'false' ? 'true' : 'false';
    const controlValidators = [];
    if (this.required === 'true') {
      controlValidators.push(Validators.required);
    }

    this.group.addControl('subject', new FormControl('', controlValidators));
  }
}
