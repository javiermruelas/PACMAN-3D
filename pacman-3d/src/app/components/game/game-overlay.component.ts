import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { PauseComponent, SettingsComponent } from '../../pages';

export const overlayRoutes: Routes = [
  { path: 'pause', component: PauseComponent },
  { path: 'settings', component: SettingsComponent },
];

@Component({
  selector: 'game-overlay',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  template: `
    <div class="game-overlay">
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
