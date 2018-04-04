// angular
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// configuration
import { environment } from '@environment/environment';

/**
 * name component creates a custom name input field
 * @todo make submitted optional
 * @todo harmonize tag name standard with input name
 *
 * @example
 * <!-- Basic sample (name is mandatory)-->
 * <form-name [group]="form" [submitted]="submitted" [name]="first_name"></form-name>
 *
 * @example
 * <!-- Basic sample with required option -->
 * <form-name [...] required></form-name>
 *
 * @example
 * <!-- Basic sample with custom lable -->
 * <form-name [...] [label]="I am a name"></form-name>
 */
@Component({
  selector: environment.prefix + 'name',
  template: `
  <form-text [group]="group" [submitted]="submitted" label="{{label}}" required="{{required}}" name="{{name}}"></form-text>
  `
})
export class NameComponent implements OnInit {

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
   * special: input for name of html-tag
   */
  @Input() name: string;

  /**
   * constructor
   */
  constructor() {}

  /**
   * creating basic setting for name component and add it to main control
   */
  ngOnInit() {
    this.label = this.label || 'Name';
    this.required = this.required !== 'false' ? 'true' : 'false';
    const controlValidators = [];
    if (this.required === 'true') {
      controlValidators.push(Validators.required);
    }

    this.group.addControl(this.name, new FormControl('', controlValidators));
  }
}
