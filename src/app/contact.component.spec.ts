import { StatusComponent } from './status/status.component';
/* tslint:disable:no-unused-variable */

import {async, TestBed, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import {ContactComponent} from './contact.component';
import { EmailComponent } from './email/email.component';
import { NameComponent } from './name/name.component';
import { CompanyComponent } from './company/company.component';
import { MessageComponent } from './message/message.component';
import { TextComponent } from './text/text.component';
import { TextAreaComponent } from './textarea/textarea.component';
import { SalutationComponent } from './salutation/salutation.component';
import { SubjectComponent } from './subject/subject.component';
import { PhoneComponent } from './phone/phone.component';
import { SelectboxComponent } from './selectbox/selectbox.component';
import { SanitizeService } from './services/sanitize/sanitize.service';
// import { HttpClient, HttpHandler } from '@angular/common/http';
// import {Observable} from 'rxjs/Observable';
import {} from 'jasmine';

// import { FeedService } from './services/feed/feed.service';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { NO_ERRORS_SCHEMA } from '@angular/core';


import { HttpClient, HttpHandler} from '@angular/common/http';
// import { EmailCheckValidator } from './emailCheck.validator';



describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  let httpClient: HttpClient;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContactComponent,
      ],
      imports: [
        FormsModule, ReactiveFormsModule],
      providers: [ HttpClient, HttpHandler, SanitizeService],
      schemas:      [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));
  beforeEach(() => {
    httpClient = TestBed.get(HttpClient);
  });
  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [
  //       ContactComponent,
  //       EmailComponent,
  //       NameComponent,
  //       CompanyComponent,
  //       SalutationComponent,
  //       SubjectComponent,
  //       PhoneComponent,
  //       MessageComponent,
  //       TextComponent,
  //       TextAreaComponent,
  //       SelectboxComponent,
  //       StatusComponent
  //     ],
  //     // schemas: [ NO_ERRORS_SCHEMA],
  //     imports: [
  //       FormsModule,
  //       ReactiveFormsModule,
  //     ],
  //     providers: [
  //       SanitizeService,
  //       HttpClient,
  //       HttpHandler
  //     ],
  //   })
  //     .compileComponents();
  // });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.form = new FormGroup({
      email:   new FormControl('', []),
      first_name:  new FormControl('', [])
    });
    component.submitted = false;
    component.ngOnInit();
    fixture.detectChanges();
  }));

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });

  xit('check formsArray', fakeAsync(() => {
    expect(component.form.controls.first_name).toBeTruthy();
    expect(component.form.controls.last_name).toBeTruthy();
    expect(component.form.controls.email).toBeTruthy();
    expect(component.form.controls.message).toBeTruthy();
    expect(component.form.controls.subject).toBeTruthy();
    expect(component.form.controls.phone).toBeTruthy();
    expect(component.form.controls.salutation).toBeTruthy();
    expect(component.form.controls.company).toBeTruthy();
  }));
  xdescribe('Testing first_name', () => {

    it('should require name', fakeAsync(() => {
      expect(component.submitted).toBe(false);
      component.onSubmit();
      expect(component.submitted).toBe(true);
    }));
  });
  describe('xxx', () => {
    beforeEach(() => {
      httpClient = TestBed.get(HttpClient);
  
      spyOn(httpClient, 'post').and.callFake(function(arg){

        console.log(arg);
        if (!arg) {
          return Observable.throw({status: 404});  // throw error
        } else if (arg.indexOf('duplicated') >= 0) {
          return Observable.of('duplicate');
        } else if (arg.indexOf('neu') >= 0) {
          return Observable.of('ok');
        } else {
          return Observable.of('someError');
        }
      });
    });
    it('onSubmit: xxx - default', async(() => {
      const fixture = TestBed.createComponent(ContactComponent);
      const app = fixture.debugElement.componentInstance;

      const control = component.form.get('email');
                const form  = component.form;
      // this.form.controls.first_name.value = 'x';
      // this.form.controls.last_name.value = 'x'; 
      // this.form.controls.email.value  = 'xxx@xxx.de';
      // this.form.controls.message.value  = 'x';
      // this.form.controls.company.value  = 'x';
      // this.form.controls.phone.value  = '23';
      // this.form.controls.salutation.value  = 'Mann';
      // this.form.controls.subject.value  = 'x';
      
      console.log(app);
      console.log(control);
      console.log(form);
      console.log(component)

      app.email = 'invalid';
      app.onSubmit({ form: { valid: true, invalid: false}});
      expect(app.optivoStatus).toEqual('error');
    }));

    xit('onSubmit: xxx - default', async(() => {
      const fixture = TestBed.createComponent(ContactComponent);
      const app = fixture.debugElement.componentInstance;
  
      app.model.email = 'neu@gmx.de';
      app.onSubmit({ form: { valid: true, invalid: false}});
      expect(app.model.optivoStatus).toEqual('ok');
    }));
    xit('onSubmit: xxx - default', async(() => {
      const fixture = TestBed.createComponent(ContactComponent);
      const app = fixture.debugElement.componentInstance;
  
      app.model.email = 'duplicated@gmx.de';
      app.onSubmit({ form: { valid: true, invalid: false}});
      expect(app.model.optivoStatus).toEqual('duplicate');
    }));
  });
});
