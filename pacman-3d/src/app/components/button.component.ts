import { Component, Input } from '@angular/core';

@Component({
  selector: 'pac-button',
  template: `
    <button [class]="buttonClasses">
      <ng-content></ng-content>
    </button>
  `,
  styles: [
    `
      button {
        background-color: var(--button-bg);
        border: none;
        border-radius: var(--button-border-radius);
        padding: var(--button-padding-default);
        cursor: pointer;
        transition: var(--button-transition);
        box-shadow: 0 var(--button-shadow-size) 0 var(--button-shadow);
        position: relative;
        top: 0;
        color: #000000;
      }

      button:hover {
        background-color: var(--button-hover-bg);
        transform: translateY(2px);
        box-shadow: 0 2px 0 var(--button-shadow);
      }

      button:active {
        transform: translateY(var(--button-shadow-size));
        box-shadow: none;
      }

      .lg {
        padding: var(--button-padding-lg);
      }

      .sm {
        padding: var(--button-padding-sm);
      }
    `,
  ],
  standalone: true,
})
export class ButtonComponent {
  @Input() size: 'sm' | 'lg' | 'default' = 'default';
  @Input() classes: string[] = [];

  protected get buttonClasses(): string {
    return `${this.size} ${this.classes.join(' ')}`;
  }
}
