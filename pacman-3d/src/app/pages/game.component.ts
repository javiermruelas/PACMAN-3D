import { Component } from '@angular/core';

@Component({
  selector: 'pac-game',
  standalone: true,
  template: `
    <div class="game-container">
      <div class="game-canvas"></div>
    </div>
  `,
})
export class GameComponent {}
