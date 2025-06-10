import { Component } from '@angular/core';

@Component({
  selector: 'pac-splash-chars',
  template: `
    <div class="splash-chars">
      @for (char of splashChars; track $index) {
        <p class="pac-text" [style.animation-delay]="$index * 0.1 + 's'">
          {{ char }}
        </p>
      }
    </div>
  `,
  styles: [
    `
      .splash-chars {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      }
      .pac-text {
        font-size: clamp(2rem, 10vw, 12rem);
        margin: 0;
        animation: bounce 0.5s ease infinite alternate;
        text-shadow: 0 0 10px rgba(255, 255, 0, 0.5);
      }
      .pac-text:nth-child(2n + 1) {
        animation-name: pulse;
      }
      @keyframes bounce {
        from {
          transform: translateY(0);
        }
        to {
          transform: translateY(-20px);
        }
      }
      @keyframes pulse {
        from {
          transform: scale(1);
        }
        to {
          transform: scale(1.1);
        }
      }
    `,
  ],
  standalone: true,
})
export class SplashChars {
  protected splashChars: string[] = [
    'P',
    'A',
    'C',
    'M',
    'A',
    'N',
    '\u00A0',
    '3',
    'D',
  ];
}
