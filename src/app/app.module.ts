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

import {HttpClientModule} from '@angular/common/http';


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
    SelectboxComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [SanitizeService],
  bootstrap: [ContactComponent]
})
export class AppModule { }
