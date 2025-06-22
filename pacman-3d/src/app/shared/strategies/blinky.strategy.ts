import { Injectable } from '@angular/core';
import { Vector3 } from 'three';
import { GhostStrategy } from '../interfaces';
import { Direction } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class BlinkyStrategy implements GhostStrategy {
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
