export type MapCellType = 'wall' | 'path' | 'pellet' | 'powerPellet' | 'empty';

export class MapCell {
  private x: number | undefined;
  private y: number | undefined;
  private type: MapCellType | undefined;
}

export class Map {
  constructor() {}
}
