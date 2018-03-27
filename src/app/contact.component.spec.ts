/* tslint:disable:no-unused-variable */

// angular
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHandler} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {} from 'jasmine';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Observable';

// framework
import { EmailComponent } from '@framework/email/email.component';
import { NameComponent } from '@framework/name/name.component';
import { CompanyComponent } from '@framework/company/company.component';
import { MessageComponent } from '@framework/message/message.component';
import { SalutationComponent } from '@framework/salutation/salutation.component';
import { SubjectComponent } from '@framework/subject/subject.component';
import { PhoneComponent } from '@framework/phone/phone.component';

// _shared
import { StatusComponent } from '@shared/status/status.component';
import { TextComponent } from '@shared/text/text.component';
import { TextAreaComponent } from '@shared/textarea/textarea.component';
import { SelectboxComponent } from '@shared/selectbox/selectbox.component';

// root component
import {ContactComponent} from './contact.component';

// features
import { SanitizeService } from '@services/sanitize/sanitize.service';
import { ApiService } from '@services/api/api.service';
import { StatusService } from '@services/status/status.service';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  let service: ApiService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule, ReactiveFormsModule
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
    service = TestBed.get(ApiService);

    spyOn(service, 'getApiFeedback').and.callFake(function(arg) {
      // arg=firstname=xxx&lastname=xxxx&email=xxxx@xxx.de&data=xxx&company=xxx&phone=012&title=Frau&subject=xxx
      if (!arg) {
        return Observable.throw({status: 404});  // throw error
      } else if (arg.indexOf('subject=error') !== -1) {
        return Observable.throw({status: 404});
      } else {
        return Observable.of(
          { ok: 1 }
        );
      }
    });
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
      expect(component.responseApi).toEqual({ ok: -1 });
    });
  });
});
