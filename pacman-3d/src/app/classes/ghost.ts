import { inject, Injectable } from '@angular/core';
import { AssetService, GhostService } from '../services';
import { GhostModel } from './models';
import { GhostMode, Direction } from './enums';
import { GhostStrategy } from './interfaces';

/**
 * This class is essentially the Ghost controller. It makes use of
 * the model, and the view is the GhostAsset. This will access the
 * same model as this file but will instead handle the actual
 * ThreeJS rendering.
 */
@Injectable()
export class Ghost {
  private asset: AssetService = inject(AssetService);
  private service: GhostService = inject(GhostService);
  private model: GhostModel = new GhostModel();
  private strategy: GhostStrategy;

  constructor(strategy: GhostStrategy) {
    this.strategy = strategy;
  }

  public move(): void {
    switch (this.model.mode) {
      case GhostMode.CHASE:
        this.moveChase();
        break;
      case GhostMode.SCATTER:
        this.moveScatter();
        break;
      case GhostMode.FRIGHTENED:
        this.moveFrightened();
        break;
      case GhostMode.EATEN:
        this.playDeathAnimation();
        break;
    }
  }

  private moveChase(): void {
    if (!this.model.position) {
      return console.warn(
        `${this.constructor.name}: this.model.position not initialized.`,
      );
    }

    if (!this.model.target) {
      return console.warn(
        `${this.constructor.name}: this.model.target not initialized.`,
      );
    }

    const direction = this.strategy?.chase(
      this.model.position,
      this.model.target,
    );
    this.updatePosition(direction);
  }

  private moveScatter(): void {}

  private moveFrightened(): void {}

  private playDeathAnimation(): void {}

  private updatePosition(direction: Direction): void {
    // this.service.updatePosition(this.model.position);
  }
}
