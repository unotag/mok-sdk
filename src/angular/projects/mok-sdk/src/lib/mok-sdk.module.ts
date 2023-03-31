import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MokSdkComponent } from './mok-sdk.component';
import { MessageCardComponent } from './components/message-card/message-card.component';
import { NotificationButtonComponent } from './components/notification-button/notification-button.component';
import { LastElemDirective } from './components/last-elem.directive';

@NgModule({
  declarations: [
    MokSdkComponent,
    MessageCardComponent,
    NotificationButtonComponent,
    LastElemDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    MokSdkComponent
  ],
  // add CUSTOM_ELEMENTS_SCHEMA to the schemas array
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MokSdkModule { }
