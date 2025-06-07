import { Routes } from '@angular/router';
import { SplashComponent, GameComponent } from './pages';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SplashComponent,
  },
  {
    path: 'game',
    component: GameComponent,
  },
];
