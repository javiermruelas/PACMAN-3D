import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor() {
    this.initializeMap();
    this.initializeGhosts();
    this.initializePlayer();
    this.initializeGame();
  }

  private initializeMap() {}

  private initializeGhosts() {}

  private initializePlayer() {}

  private initializeGame() {}
}
