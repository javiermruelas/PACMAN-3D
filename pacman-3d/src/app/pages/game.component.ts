import { Component } from '@angular/core';
import { GameOverlay, GamePad } from '../components';

@Component({
  selector: 'pac-game',
  imports: [GameOverlay, GamePad],
  standalone: true,
  template: `
    <div class="game-container">
      <game-overlay></game-overlay>
      <pac-game-pad></pac-game-pad>
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
export class GamePageComponent {}
