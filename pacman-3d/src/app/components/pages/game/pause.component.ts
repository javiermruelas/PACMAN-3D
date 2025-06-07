import { Component } from '@angular/core';

@Component({
  selector: 'game-pause',
  standalone: true,
  template: `
    <div class="pause-screen">
      <h2>Game Paused</h2>
      <button>Resume</button>
      <button>Settings</button>
      <button>Quit</button>
    </div>
  `,
  styles: [
    `
      .pause-screen {
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
export class PauseComponent {}
