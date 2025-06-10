import { Component } from '@angular/core';

@Component({
  selector: 'pac-pause',
  standalone: true,
  template: `
    <div class="pause-screen">
      <h2>Game Paused</h2>
      <button>Resume</button>
      <button>Settings</button>
      <button>Quit</button>
    </div>
  `,
  styles: [],
})
export class PauseComponent {}
