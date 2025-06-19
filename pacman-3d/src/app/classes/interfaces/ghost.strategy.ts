import { Vector3 } from 'three';
import { Direction } from '../enums';

export abstract class GhostStrategy {
  abstract chase(currentPosition: Vector3, target: Vector3): Direction;
  abstract scatter(currentPosition: Vector3, target: Vector3): Direction;
  abstract frightened(currentPosition: Vector3): Direction;
}
