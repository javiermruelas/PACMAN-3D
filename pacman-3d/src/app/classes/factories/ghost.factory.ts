import { Injectable, Injector } from '@angular/core';
import { GhostStrategy } from '../interfaces';
import { GhostName } from '../enums';
import { Ghost } from '../ghost';
import {
  BlinkyStrategy,
  ClydeStrategy,
  InkyStrategy,
  PinkyStrategy,
} from '../strategies';

@Injectable({
  providedIn: 'root',
})
export class GhostFactory {
  constructor(private injector: Injector) {}

  createGhost(name: GhostName): Ghost {
    const strategy = this.getStrategy(name);
    return new Ghost(strategy);
  }

  private getStrategy(name: GhostName): GhostStrategy {
    switch (name) {
      case GhostName.BLINKY:
        return this.injector.get(BlinkyStrategy);
      case GhostName.INKY:
        return this.injector.get(InkyStrategy);
      case GhostName.PINKY:
        return this.injector.get(PinkyStrategy);
      case GhostName.CLYDE:
        return this.injector.get(ClydeStrategy);
      default:
        throw new Error(`Unknown ghost type: ${name}`);
    }
  }
}
