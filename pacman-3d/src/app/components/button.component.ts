import { Component, Input } from '@angular/core';

@Component({
  selector: 'pac-button',
  standalone: true,
  template: `
    <button [class.large]="size === 'large'" [class.small]="size === 'small'">
      <ng-content></ng-content>
    </button>
  `,
  styles: [
    `
      button {
        background-color: #fdd521;
        border: none;
        border-radius: 4px;
        padding: 12px 24px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 0 #f97429;
        position: relative;
        top: 0;
        color: #000;
      }

      button:hover {
        background-color: #ffdf00;
        transform: translateY(2px);
        box-shadow: 0 2px 0 #f97429;
      }

      button:active {
        transform: translateY(4px);
        box-shadow: none;
      }

      .large {
        padding: 16px 32px;
      }

      .small {
        padding: 8px 16px;
      }
    `,
  ],
})
export class ButtonComponent {
  @Input() size: 'small' | 'large' | 'default' = 'default';
}
