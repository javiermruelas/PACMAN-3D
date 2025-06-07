import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'game-overlay',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="overlay">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
      .overlay > * {
        pointer-events: auto;
      }
    `,
  ],
})
export class GameOverlay {}
