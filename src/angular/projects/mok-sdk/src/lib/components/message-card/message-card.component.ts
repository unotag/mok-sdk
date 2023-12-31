import { Component, Input } from '@angular/core';
import { MessageCardProps } from '../../types';
import { formatDate } from '../../utils/format-date';
@Component({
  selector: 'lib-message-card',
  template: `
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 15px;
        color: {{ messageCardProps.textColor }}
      "
    >
      <p style="{{ messageCardProps.textStyles }}"> {{messageCardProps.text}} </p>
      <p style="font-size: 14px; {{ messageCardProps.textStyles }}">{{ formatDate(messageCardProps.time) }}</p>
    </div>
    <hr style="opacity: 0.5; color: {{ messageCardProps.textColor }}; {{messageCardProps.ruleStyles}}" />
  `,
})
export class MessageCardComponent {
  @Input() messageCardProps!: MessageCardProps;

  constructor() {}

  formatDate(date: String): string {
    return formatDate(date);
  }
}
