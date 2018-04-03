// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// framework
import { EmailComponent } from '@framework/email/email.component';
import { NameComponent } from '@framework/name/name.component';
import { CompanyComponent } from '@framework/company/company.component';
import { MessageComponent } from '@framework/message/message.component';
import { SalutationComponent } from '@framework/salutation/salutation.component';
import { SubjectComponent } from '@framework/subject/subject.component';
import { PhoneComponent } from '@framework/phone/phone.component';

// shared
import { StatusComponent } from '@shared/status/status.component';
import { TextComponent } from '@shared/text/text.component';
import { TextAreaComponent } from '@shared/textarea/textarea.component';
import { SelectboxComponent } from '@shared/selectbox/selectbox.component';

// root component
import {ContactComponent} from '@app/contact.component';

// services
import { SanitizeService } from '@services/sanitize/sanitize.service';
import { ApiService } from '@services/api/api.service';
import { StatusService } from '@services/status/status.service';

/**
 * module of the application
 */
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
