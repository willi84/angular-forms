import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: environment.prefix + 'status',
  template: `
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
  `,
  styles: [ `
  .hide-opacity{
  }
  .form-control  + div.text-danger{

  }
  .has-error .form-control:focus  + div.text-danger{
    opacity:1;
  }
  .icon-warning{
   color: red;
   margin-left: -30px;
   font-size: 20px;
  }
  .mt30--xs{
    margin-top: 30px;
  }
  .has-error .form-control{
    border: 1px solid red;
  }
  .has-error label{
    color: red;
  }
  ` ]
})
export class StatusComponent implements OnInit {

  @Input() showError: string;
  @Input() hasFocus: boolean;
  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }

}
