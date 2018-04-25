// angular
import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// confiugration
import { environment } from '@environment/environment.prod';

/**
 * company component creates a company input field
 * @todo make submitted optional
 *
 * @example
 * <!-- Basic sample -->
 * <form-company [group]="form" [submitted]="submitted"></form-company>
 *
 * @example
 * <!-- Basic sample with required option -->
 * <form-company [...] required></form-company>
 *
 * @example
 * <!-- Basic sample with custom lable -->
 * <form-company [...] [label]="I am a Salutation"></form-company>
 */
@Component({
  selector: environment.prefix + 'company',
  template: `
  <form-text [group]="group" [submitted]="submitted" label="{{label}}" required="{{required}}" name="{{tagName}}" [messages]="messages"></form-text>
  `
})
export class CompanyComponent implements OnInit {

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
   * input to declare element as required.
   */
  @Input() messages? : any;

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


     // get all attributes with messages.<name>
     const attributeNames = this.elementRef.nativeElement.getAttributeNames();
     const lenAttributes: number = attributeNames.length;

    if(!this.messages){
      this.messages = {};
    }

    // IE11 not support forEach on nodeList
    for (let i = 0; i < lenAttributes; i++) {
      if(attributeNames[i].indexOf('messages.') === 0){
        const attrName = attributeNames[i].replace('messages.', '');
        console.log(attrName);
        console.log(this.messages[attrName])
        if(!this.messages[attrName]){
          this.messages[attrName] = this.elementRef.nativeElement.getAttribute(attributeNames[i]);
        }
        console.log(this.messages)
      }
    }

  
  }

  /**
   * creating basic setting for company component and add it to main control
   */
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
