import { Injectable } from '@angular/core';
import { Cell } from '../cell';

@Injectable({
  providedIn: 'root',
})
export class MapModel {
  private cells: Cell[][] | undefined;
}
