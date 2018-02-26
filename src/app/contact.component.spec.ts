/* tslint:disable:no-unused-variable */

import {async, TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {ContactComponent} from './contact.component';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { NO_ERRORS_SCHEMA } from '@angular/core';
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

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let compiled;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
        SelectboxComponent
      ],
      // schemas: [ NO_ERRORS_SCHEMA],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.submitted = false;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    inputEl = compiled.querySelector('input');
  }));

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('check formsArray', fakeAsync(() => {
    expect(component.form.controls.first_name).toBeTruthy();
    expect(component.form.controls.last_name).toBeTruthy();
    expect(component.form.controls.email).toBeTruthy();
    expect(component.form.controls.message).toBeTruthy();
    expect(component.form.controls.subject).toBeTruthy();
    expect(component.form.controls.phone).toBeTruthy();
    expect(component.form.controls.salutation).toBeTruthy();
    expect(component.form.controls.company).toBeTruthy();
  }));
  describe('Testing first_name', () => {

    it('should require name', fakeAsync(() => {
      expect(component.submitted).toBe(false);
      component.onSubmit();
      expect(component.submitted).toBe(true);
    }));
  });
});
