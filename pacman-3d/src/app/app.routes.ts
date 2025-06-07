import { Routes } from '@angular/router';
import { SplashComponent, GameComponent } from './pages';
import { PauseComponent } from './components/overlay/pause.component';
import { GameEndComponent } from './components/overlay/game-end.component';
import { SettingsComponent } from './components/overlay/settings.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SplashComponent,
  },
  {
    path: 'game',
    component: GameComponent,
    children: [
      { path: 'pause', component: PauseComponent },
      { path: 'end', component: GameEndComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
];
