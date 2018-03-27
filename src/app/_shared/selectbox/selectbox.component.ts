// angular
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';

// configuration
import { environment } from '@environment/environment.prod';

// services
import { StatusService } from '@services/status/status.service';

@Component({
  selector: environment.prefix + 'selectbox',
  styles: [ `
  .hide-opacity{
  }
  .form-control + span + div.text-danger{
  }
  /*.form-control:focus + span + div.text-danger{
    opacity:1;
  }
  .has-error .form-control:focus  + div.text-danger{
    opacity:1;
  }
  .icon-warning{
    color: red;
    margin-left: -50px;
    font-size: 20px;
   }*/

`],
  template: `
  <div class="form-group"
    [formGroup]="group"
    [ngClass]="{'has-error':statusService.getValidationStatus(this) }"
  >
    <label for="{{name}}" class="control-label">
    {{label}}<span *ngIf="required=='true'">*</span>:
    </label>
    <select
    (change)="isSelecting=true;"
    formControlName="{{name}}" class="form-control">
    <option *ngFor="let state of states" [ngValue]="state"
      >{{state}}</option>
    </select>
    <div class="text-danger {{name}}-error">
      <span name="error-icon"
        [style.visibility]="showError === '' ? 'hidden' : 'visible'"
        class="mt30--xs form-control-feedback"
        >
        <i class="icon-warning glyphicon glyphicon-alert text-danger"></i>
      </span>
      <div name="error-message" class="text-danger {{name}}-error"
        [style.visibility]="hasFocus ? 'visible' : 'hidden'"
      >
        <small name="error-required"
          [hidden]="!(showError === 'required')"
          >Das ist ein Pflichtfeld</small>
        <small name="error-pattern"
          [hidden]="!(showError === 'pattern')"
        >Bitte überprüfen Sie das Textfeld.</small>
        <small  name="error-default" [hidden]="!(showError === '')"
        >&nbsp;</small>
      </div>
    </div>
  </div>
  `
})
export class SelectboxComponent implements OnInit, OnChanges, DoCheck {

  @Input() submitted: Boolean;
  @Input() group: FormGroup;
  @Input() name: string;
  @Input() label?: any;
  @Input() required = 'false';
  states = ['Herr', 'Frau'];
  showError: string;
  hasFocus = false;
  isTyping =  false;
  control: any;
  startValue = '';
  oldValue: '';
  isSelecting = false;
  action = '';  // action of input between focuses
  lastAction = '';
  startError = true;
  noRequired =  false;
    constructor(
        public statusService: StatusService
      ) {
    }
    ngOnInit() {
      // set initial state, fixes also tests
      this.hasFocus = false;
      this.isTyping = false;
      this.required = this.required !== 'false' ? 'true' : 'false';
      this.control = this.group.get(this.name);
      this.startValue = '';
      this.oldValue = '';
    }
    ngOnChanges() {
    }
    ngDoCheck() {
      this.statusService.checkStatus(this);
    }
}
