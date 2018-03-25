import { StatusComponent } from './status/status.component';
/* tslint:disable:no-unused-variable */

import {async, TestBed, ComponentFixture,
  // fakeAsync,
  } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule,
  // FormGroup, FormControl
} from '@angular/forms';

import { HttpClientModule,
  // HttpRequest, HttpParams
 } from '@angular/common/http';

import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { HttpClientFeatureService } from './http-client-feature.service';

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
// import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Observable';
// import { importExpr } from '@angular/compiler/src/output/output_ast';
// import { NO_ERRORS_SCHEMA } from '@angular/core';


import { HttpClient, HttpHandler} from '@angular/common/http';
// import { EmailCheckValidator } from './emailCheck.validator';

import { Observable } from 'rxjs/Observable';
import { ApiService } from './services/api/api.service';
import { StatusService } from './services/status/status.service';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  let httpClient: HttpClient;
  let service: ApiService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule, ReactiveFormsModule,
        HttpClientModule,
        HttpClientTestingModule
      ],
      declarations: [
        ContactComponent,
        EmailComponent,
        NameComponent,
        CompanyComponent,
        SalutationComponent,
        SubjectComponent,
        PhoneComponent,
        MessageComponent,
        TextComponent,
        TextAreaComponent,
        SelectboxComponent,
        StatusComponent
      ],
      providers: [ HttpClient, HttpHandler, SanitizeService, ApiService, StatusService],
      // schemas:      [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));
  
  beforeEach(() => {
    httpClient = TestBed.get(HttpClient);
    service = TestBed.get(ApiService);
    httpClient = TestBed.get(HttpClient);

    spyOn(service, 'getApiFeedback').and.callFake(function(arg) {
      console.log(arg);
      // arg=firstname=xxx&lastname=xxxx&email=xxxx@xxx.de&data=xxx&company=xxx&phone=012&title=Frau&subject=xxx
      if (!arg) {
        return Observable.throw({status: 404});  // throw error
      } else if (arg.indexOf('subject=error') !== -1) {
        return Observable.throw({status: 404});
        // return Observable.of(`{ data:1}`
      } else if (arg.indexOf('empty') >= 0) {
        console.log('empty');
        return Observable.of(`{ data:2}`
        );
      } else {
        return Observable.of(
          // `{ data:1}`
          { ok: 1 }
        );
      }
    });

    // spyOn(service, 'getApiFeedback').and.returnValue(Observable.of({ data:1}));

  });
  beforeEach(async(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.submitted = false;
    fixture.detectChanges();
    component.form.controls.first_name.setValue('xxx');
    component.form.controls.last_name.setValue('xxxx');
    component.form.controls.email.setValue('xxxx@xxx.de');
    component.form.controls.message.setValue('xxx');
    component.form.controls.company.setValue('xxx');
    component.form.controls.phone.setValue('012');
    component.form.controls.salutation.setValue('Frau');
    component.form.controls.subject.setValue('xxx');
  }));

  describe('Function: getFeedContent', () => {
    it('should exist', () => {
      expect(service.getApiFeedback).toEqual(jasmine.any(Function));
    });

    it('should call httpClient.post with a given list of ids', () => {
      component.onSubmit();
      expect(component.responseApi).toEqual({ ok: 1 });
    });
    it('should simulate an error', () => {
      component.form.controls.subject.setValue('error');
      component.onSubmit();
      expect(component.responseApi).toEqual({ ok: 0 });
    });
    it('should simulate an error', () => {
      component.form.controls.phone.setValue('error');
      component.onSubmit();
      expect(component.responseApi).toEqual({  });
    });
  });
});
