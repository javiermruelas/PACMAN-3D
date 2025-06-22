import { Injectable } from '@angular/core';
import { Vector3 } from 'three';
import { GhostName, GhostMode, Direction } from '../enums';

@Injectable()
export class GhostModel {
  constructor() {
    console.log('Ghost Model Instantiated');
  }
  public position: Vector3 | undefined;
  public direction: Direction | undefined;
  public mode: GhostMode | undefined;
  public target: Vector3 | undefined;
  public speed: number | undefined;
  public isAlive: boolean | undefined;
  public modeTimer: number | undefined;
}
