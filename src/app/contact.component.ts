// angular
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

// services
import { SanitizeService } from '@services/sanitize/sanitize.service';
import { ApiService } from '@services/api/api.service';

// configuration
import { environment } from '@environment/environment.prod';

/**
 * Main Component of a form
 * @todo: make app independent from this
 *
 * @example
 * <form-contact></form-contact>
 */
@Component({
  selector: environment.prefix +  'contact',
  styles: [ `
    .hide-opacity{
      opacity: 0;
    }
    .text-center{
      text-align: center;
    }
  `],
  template: `
  <div class="row" class="{{responseApi.ok}}">
    <div class="text-danger text-center col-xs-20 mb50--xs">
    <span *ngIf="responseApi.ok === -1" [ngClass]="{'hide-opacity': responseApi.ok === -1 }">
    &nbsp;</span>
    <span *ngIf="responseApi.ok > -1 || submitted">

    <span *ngIf="(form.invalid && responseApi.ok === -1 )"
    >Bitte füllen Sie alle rot gekennzeichneten Felder aus.</span>
    <span *ngIf="(responseApi  && responseApi.ok === 1)"
    >Ihre Anfrage wurde erfolgreich versendet</span>
    <span *ngIf="(responseApi && responseApi.ok === 0)"
    >Es ist ein Fehler aufgetreten</span>
    </span>
    </div>
    <button class="mt20--xs btn btn--primary pull-right" *ngIf="responseApi.ok === 1" (click)="responseApi = { ok: -1}">
      <i class="glyphicon glyphicon-envelope"></i> Neue Mitteilung
      </button>
  </div>
  <form novalidate  [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="responseApi.ok !== 1">
    <div class="row">
      <div class="col-sm-12">
        <form-subject [group]="form" [submitted]="submitted" required></form-subject>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-20">
        <form-message [group]="form" [submitted] ="submitted"
      label=" Ihre Nachfrage/Nachricht an uns" required></form-message>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-10">
        <form-company [group]="form" [submitted]="submitted" required messages.required="bl"></form-company>
      </div>
    </div>
    <div class="row">

      <div class="col-sm-4">
        <form-salutation [group]="form" [submitted]="submitted" required></form-salutation>
      </div>
      <div class="col-sm-8">
        <form-name [group]="form" [submitted]="submitted" name="first_name" label="Vorname" required></form-name>
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
        <form-phone [group]="form" [submitted]="submitted" required></form-phone>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-20">
      <button class="mt20--xs btn btn--primary pull-right">
      <i class="icon-mail"></i> Mitteilung absenden </button>
      </div>
    </div>
    </form>
    `
})
export class ContactComponent implements OnInit {

  /**
   * status of form being submitted
   */
  submitted: Boolean = false;

  /**
   * response of API
   */
  responseApi = {
    ok: -1
  };

  /**
   *  main form group
   */
  public form: FormGroup;

   /**
     * constuctor
     * @param {any} formBuilder  instance of form builder
     * @param {any} sanitize  instance to sanitize service
     * @param {any} apiService instance to API service
     */
  constructor(

    private formBuilder: FormBuilder,
    private sanitize: SanitizeService,
    private apiService: ApiService
  ) {
      this.submitted = false;
      this.sanitize = sanitize;
  }

  /**
   * create basic form builder array
   */
  ngOnInit() {
    this.form = this.formBuilder.group({});
  }

  /**
   * handling submit, call API and changing view
   */
  onSubmit() {

    const body =
      'firstname=' + this.form.controls.first_name.value + '&' +
      'lastname=' + this.form.controls.last_name.value + '&' +
      'email=' + this.form.controls.email.value + '&' +
      'data=' + this.form.controls.message.value + '&' +
      'company=' + this.form.controls.company.value + '&' +
      'phone=' + this.form.controls.phone.value + '&' +
      'title=' + this.form.controls.salutation.value + '&' +
      'subject=' + this.form.controls.subject.value;

    this.submitted = true;

    const fields = Object.getOwnPropertyNames(this.form.controls);

    const lenNodes: number = fields.length;

    // IE11 not support forEach on nodeList
    for (let i = 0; i < lenNodes;  i++) {
     const field = this.form.controls[fields[i]];
      field.setValue ( this.sanitize.sanitize(field.value));
    }
    if (this.form.valid) {

      this.apiService.getApiFeedback(body)
      .subscribe(

        // success
        data => {
          this.responseApi = data;
          this.submitted = false;
          if (data.ok === 1) {
            this.form.reset();
          }

        },
        // error
        () => {
          this.responseApi = { ok: 0 };
        }
      );
    }
  }
}
