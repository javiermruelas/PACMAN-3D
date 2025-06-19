import { Injectable, inject } from '@angular/core';
import { MapModel } from './models';

@Injectable()
export class Map {
  private model: MapModel = inject(MapModel);
}
