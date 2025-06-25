import { Component } from '@angular/core';
import { GameCanvas, GameOverlay, GamePad, GameScore } from '../components';
import { RendererService } from '../services';

@Component({
  selector: 'pac-game',
  providers: [RendererService],
  imports: [GameOverlay, GameScore, GamePad, GameCanvas],
  standalone: true,
  template: `
    <div class="page game">
      <game-overlay></game-overlay>
      <game-pad></game-pad>
      <game-score></game-score>
      <game-canvas></game-canvas>
    </div>
  `,
  styles: [
    `
      .game-ui {
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
