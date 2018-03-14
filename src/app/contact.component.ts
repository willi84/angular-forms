import {
  Component
} from '@angular/core';
import {
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
selector: 'app-form-contact',
styles: [ `
  .hide-opacity{
    opacity: 0;
  }
`],
template: `
<form novalidate  action="https://www.google.com" [formGroup]="form" (ngSubmit)="onSubmit()" >
  <div class="row">
    <div class="col-sm-10 text-danger mb50--xs">
      <span [ngClass]="{'hide-opacity': (!form.invalid || !submitted) }"
      >Bitte füllen Sie alle rot gekennzeichneten Felder aus.</span>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-10">
      <form-subject [group]="form" [submitted]="submitted" required></form-subject>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-10">
      <form-message [group]="form" [submitted] ="submitted"
    label=" Ihre Nachfrage/Nachricht an uns"></form-message>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-10">
      <form-company [group]="form" [submitted]="submitted"></form-company>
    </div>
  </div>
  <div class="row">

    <div class="col-sm-2">
      <form-salutation [group]="form" [submitted]="submitted"></form-salutation>
    </div>
    <div class="col-sm-8">
      <form-name [group]="form" [submitted]="submitted" name="first_name" label="Vorname"  required></form-name>
    </div>
    <div class="col-sm-8">
      <form-name [group]="form" [submitted]="submitted" name="last_name" label="Nachname" required></form-name>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-10">
      <form-email [group]="form" [submitted]="submitted" required></form-email>
    </div>
    <div class="col-sm-10">
      <form-phone [group]="form" [submitted]="submitted"required></form-phone>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-20">
    <button class="mt20--xs btn btn--primary pull-right">
      <i class="glyphicon glyphicon-envelope"></i> Mitteilung absenden </button>
    </div>
  </div>
  <hr />
  {{ form.value | json}}

  </form>
  `
})
export class ContactComponent implements OnInit {
  submitted: Boolean = false;


  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.submitted = false;
  }

  ngOnInit() {

    this.form = this.formBuilder.group({});
  }
  onSubmit() {
    this.submitted = true;
  }

}
