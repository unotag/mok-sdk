import { Component, Input } from '@angular/core';
import { NotificationButtonProps } from './types';

@Component({
  selector: 'lib-mok-sdk',
  template: `
    <lib-notification-button
      [apiKey]="NotificationButton.apiKey"
      [id]="NotificationButton.id"
      [containerStyles]="NotificationButton.containerStyles"
      [messageBoxStyles]="NotificationButton.messageBoxStyles"
      [headerStyles]="NotificationButton.headerStyles"
      [textStyles]="NotificationButton.textStyles"
      [ruleStyles]="NotificationButton.ruleStyles"
      [position]="positionValue"
      [isDev]="isDevMode"
      [isLocal]="isLocalMode"
    ></lib-notification-button>
  `,
  styles: [],
})

export class MokSdkComponent {
  @Input() NotificationButton!: NotificationButtonProps;
  isDevMode: any;
  positionValue: any;
  isLocalMode: any;
  
  constructor() {
  }
  ngOnInit(): void {
    this.positionValue = this.NotificationButton.position;
    this.isDevMode = this.NotificationButton.isDev;
    this.isLocalMode = this.NotificationButton.isLocal;
  }
}


