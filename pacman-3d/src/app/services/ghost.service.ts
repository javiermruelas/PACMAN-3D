import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GhostService {
  constructor() {
    this.initialize();
  }

  private initialize(): void {}
}
