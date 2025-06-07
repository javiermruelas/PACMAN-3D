import { Component } from '@angular/core';

@Component({
  selector: 'game-end',
  standalone: true,
  template: `
    <div class="game-end-screen">
      <h2>Game Over</h2>
      <div class="score">Score: 0</div>
      <button>Play Again</button>
      <button>Main Menu</button>
    </div>
  `,
  styles: [
    `
      .game-end-screen {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        padding: 2rem;
        border-radius: 8px;
        text-align: center;
      }
    `,
  ],
})
export class GameEndComponent {}
