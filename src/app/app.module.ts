import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { ContactComponent } from './contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailComponent } from './email/email.component';
import { NameComponent } from './name/name.component';
import { CompanyComponent } from './company/company.component';
import { PhoneComponent } from './phone/phone.component';
import { SubjectComponent } from './subject/subject.component';
import { SalutationComponent } from './salutation/salutation.component';
import { TextComponent } from './text/text.component';
import { TextAreaComponent } from './textarea/textarea.component';
import { MessageComponent } from './message/message.component';
import { SelectboxComponent } from './selectbox/selectbox.component';
import { SanitizeService } from './services/sanitize/sanitize.service';
import { ApiService } from './services/api/api.service';

import {HttpClientModule} from '@angular/common/http';
import { StatusComponent } from './status/status.component';
import { StatusService } from './services/status/status.service';


@NgModule({
  declarations: [
    ContactComponent,
    EmailComponent,
    NameComponent,
    CompanyComponent,
    TextComponent,
    TextAreaComponent,
    MessageComponent,
    PhoneComponent,
    SubjectComponent,
    SalutationComponent,
    SelectboxComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [SanitizeService, ApiService, StatusService],
  bootstrap: [ContactComponent]
})
export class AppModule { }
