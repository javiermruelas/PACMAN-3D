import { Component } from '@angular/core';
import { ButtonComponent } from '../../button.component';
import { SplashChars } from './splash-chars.component';

@Component({
  selector: 'app-splash',
  imports: [ButtonComponent, SplashChars],
  standalone: true,
  template: `
    <div class="splash-wrapper">
      <pac-splash-chars></pac-splash-chars>
      <pac-button>Start Game</pac-button>
    </div>
  `,
  styles: [
    `
      .splash-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        overflow-x: hidden;
        gap: 1vw;
      }
    `,
  ],
})
export class SplashComponent {}
