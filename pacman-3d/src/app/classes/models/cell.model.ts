import { Injectable } from '@angular/core';
import { Vector3 } from 'three';
import { Cell } from '../cell';

@Injectable()
export class CellModel {
  private position: Vector3 | undefined;
  private type: Cell | undefined;
}
