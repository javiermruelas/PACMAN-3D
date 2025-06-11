import { MapCell } from '../../classes';

export type GhostMode = 'SCATTER' | 'CHASED' | 'FRIGHTENED';
export type GhostName = 'Blinky' | 'Pinky' | 'Inky' | 'Clyde';

export class Ghost {
  constructor(name: GhostName, color: string) {
    this.name = name;
    this.color = color;
  }

  private name: GhostName | undefined;
  private color: string | undefined;
  private position: MapCell | undefined;
  private target: MapCell | undefined;
  private mode: GhostMode | undefined;
  private scatterCorner: MapCell | undefined;
  private speed: number | undefined;

  public move(): void {}
  public moveFrightened(): void {}
  public moveChase(): void {}
  public moveScatter(): void {}
}
