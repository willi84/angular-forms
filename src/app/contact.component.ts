import {
  Component, ChangeDetectionStrategy
} from '@angular/core';
import {
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { SanitizeService } from './services/sanitize/sanitize.service';
// import {Observable} from "rxjs/Observable";

import { HttpClient} from '@angular/common/http';
import { environment } from '../environments/environment.prod';
// import { Headers, RequestOptions } from '@angular/http';

@Component({
  selector: environment.prefix +  'contact',
  // changeDetection: ChangeDetectionStrategy.OnPush,
styles: [ `
  .hide-opacity{
    opacity: 0;
  }
`],
template: `
<h1>Forms sample</h1>
<form novalidate  action="https://www.google.com" [formGroup]="form" (ngSubmit)="onSubmit()" >
  <div class="row">
    <div class="col-sm-10 text-danger mb50--xs">
      <span [ngClass]="{'hide-opacity': (!form.invalid || !submitted) }"
      >Bitte füllen Sie alle rot gekennzeichneten Felder aus.</span>
      <span [ngClass]="{'hide-opacity': !(form.valid  && submitted && responseApi && responseApi.ok === 1) }"
      >Ihre Anfrage wurde erfolgreich versendet</span>
      <span [ngClass]="{'hide-opacity': !(form.valid  && submitted && responseApi && responseApi.ok === 0) }"
      >Es ist ein Fehler aufgetreten {{ responseApi | json }}</span>
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
      <form-salutation [group]="form" [submitted]="submitted" required></form-salutation>
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
  responseApi = {}


  public form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private sanitize: SanitizeService,
    private http: HttpClient
  ) {
    this.submitted = false;
    this.sanitize = sanitize;
    this.http = http;
  }

  ngOnInit() {

    this.form = this.formBuilder.group({});
  }
  onSubmit() {
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    console.log(this.form.controls);
    const body =
      'firstname=' + this.form.controls.first_name.value + '&' +
      'lastname=' + this.form.controls.last_name.value + '&' +
      'email=' + this.form.controls.email.value + '&' +
      'data=' + this.form.controls.message.value + '&' +
      'company=' + this.form.controls.company.value + '&' +
      'phone=' + this.form.controls.phone.value + '&' +
      'title=' + this.form.controls.salutation.value + '&' +
      'subject=' + this.form.controls.subject.value;


    //   lastname=${this.form.controls.last_name.value}&
    //   email=${this.form.controls.email.value}&
    //   data=${this.form.controls.message.value}&
    //   company=${this.form.controls.company.value}&
    //   phone=${this.form.controls.phone.value}&
    //   title=${this.form.controls.salutation.value}&
    //   subject=${this.form.controls.subject.value}
    // ';
    // const body2 = {
    //     firstname:this.form.controls.first_name.value,
    //   lastname:this.form.controls.last_name.value,
    //   email:this.form.controls.email.value,
    //   data:this.form.controls.message.value,
    //   company:this.form.controls.company.value,
    //   phone:this.form.controls.phone.value,
    //   title:this.form.controls.salutation.value,
    //   subject:this.form.controls.subject.value

    // }
    console.log(body);

    this.submitted = true;
    const fields = Object.getOwnPropertyNames(this.form.controls);
    const lenNodes: number = fields.length;
    console.log(fields);
    // IE11 not support forEach on nodeList
    for (let i = 0; i < lenNodes;  i++) {
     const field = this.form.controls[fields[i]];
      field.setValue ( this.sanitize.sanitize(field.value));
    }
    if (this.form.valid) {

      // Content-Type:application/x-www-form-urlencoded
      this.http.post(environment.API, body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).subscribe(
        data => {
          this.responseApi = data;
          console.log(data);
        }
      );
    }
  }

}
