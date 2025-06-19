import { Injectable } from '@angular/core';
import { GhostStrategy } from '../interfaces';
import { Direction } from '../enums';
import { Vector3 } from 'three';

@Injectable({
  providedIn: 'root',
})
export class ClydeStrategy implements GhostStrategy {
  chase(currentPosition: Vector3, target: Vector3): Direction {
    return Direction.UP;
  }

  scatter(currrentPosition: Vector3, target: Vector3): Direction {
    return Direction.UP;
  }

  frightened(currentPosition: Vector3): Direction {
    return Direction.UP;
  }
}
