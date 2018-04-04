// angular
import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// configuration
import { environment } from '@environment/environment';

/**
 * message component creates a textarea ffor messages
 * @todo make submitted optional
 *
 * @example
 * <!-- Basic sample -->
 * <form-message [group]="form" [submitted]="submitted"></form-message>
 *
 * @example
 * <!-- Basic sample with required option -->
 * <form-message [...] required></form-message>
 *
 * @example
 * <!-- Basic sample with custom lable -->
 * <form-message [...] [label]="I am a Message"></form-message>
 */
@Component({
  selector: environment.prefix + 'message',
  template: `
  <form-textarea [group]="group" [submitted] ="submitted"
  label="{{label}}" name="{{tagName}}" required="{{required}}"
  ></form-textarea>
  `
})
export class MessageComponent implements OnInit {

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
   * creating basic setting for message component and add it to main control
   */
  ngOnInit() {
    this.label = this.label || 'Ihr Text';
    this.required = this.required !== 'false' ? 'true' : 'false';
    const controlValidators = [];
    if (this.required === 'true') {
      controlValidators.push(Validators.required);
    }

    this.group.addControl('message', new FormControl('', controlValidators));
  }
}
