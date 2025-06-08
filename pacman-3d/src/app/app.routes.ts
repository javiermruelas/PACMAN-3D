import { Routes } from '@angular/router';
import {
  SplashComponent,
  GameComponent,
  PauseComponent,
  GameEndComponent,
  SettingsComponent,
} from './pages';

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
