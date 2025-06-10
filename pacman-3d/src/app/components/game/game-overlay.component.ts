import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { PauseComponent, SettingsPageComponent } from '../../pages';

export const overlayRoutes: Routes = [
  { path: 'pause', component: PauseComponent },
  { path: 'settings', component: SettingsPageComponent },
];

@Component({
  selector: 'game-overlay',
  imports: [RouterOutlet, RouterModule],
  template: `
    <div id="game-overlay-component" class="game-overlay">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .game-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10;
      }
      .game-overlay > * {
        pointer-events: auto;
      }
    `,
  ],
  standalone: true,
})
export class GameOverlay {}
