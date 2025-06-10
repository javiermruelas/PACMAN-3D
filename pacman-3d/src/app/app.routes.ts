import { Routes } from '@angular/router';
import {
  SplashPageComponent,
  GamePageComponent,
  LeaderboardPageComponent,
} from './pages';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SplashPageComponent,
  },
  {
    path: 'game',
    component: GamePageComponent,
  },
  {
    path: 'leaderboard',
    component: LeaderboardPageComponent,
  },
];
