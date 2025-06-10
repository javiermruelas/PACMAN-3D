import { GameService } from '../game/game.service';
import { MapTile } from '../../shared/classes/map-tile.model';

export abstract class GameGhost {
  constructor(private game: GameService) {}

  abstract name: string;
  abstract color: string;
  abstract position: MapTile;
  abstract target: MapTile;

  abstract move(): void;
  abstract moveFrightened(): void;
  abstract moveChase(): void;
  abstract moveScatter(): void;
}
