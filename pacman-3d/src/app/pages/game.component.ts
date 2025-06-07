import { Component } from '@angular/core';
import { GameOverlay } from '../components/overlay/overlay.component';

@Component({
  selector: 'pac-game',
  imports: [GameOverlay],
  standalone: true,
  template: `
    <div class="game-container">
      <game-overlay></game-overlay>
      <div class="game-canvas"></div>
    </div>
  `,
  styles: [
    `
      .game-container {
        position: relative;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
      }
      .game-canvas {
        width: 100%;
        height: 100%;
        background: #000;
      }
    `,
  ],
})
export class GameComponent {}
