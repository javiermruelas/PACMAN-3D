import { Component, ViewChild, ElementRef } from '@angular/core';
import { GameOverlay, GamePad } from '../components';
import { RendererService } from '../services';

@Component({
  selector: 'pac-game',
  providers: [RendererService],
  imports: [GameOverlay, GamePad],
  standalone: true,
  template: `
    <div class="page game">
      <game-overlay></game-overlay>
      <pac-game-pad></pac-game-pad>
      <div class="game-ui"></div>
      <canvas id="render-canvas" class="game-canvas"></canvas>
    </div>
  `,
  styles: [
    `
      .game-ui {
        position: relative;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
      }
      .game-canvas {
        width: 100%;
        height: 100%;
        background: #000;
      }
    `,
  ],
})
export class GamePageComponent {
  private renderer;
  @ViewChild('render-canvas', { static: true })
  public canvas: ElementRef<HTMLCanvasElement>;

  public constructor(private renderer: RendererService) {}

  public ngOnInit(): void {
    this.renderer.createScene(this.canvas);
    this.renderer.animate();
  }
}
