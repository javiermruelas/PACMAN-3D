import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RendererService } from '../../services';

@Component({
  selector: 'game-canvas',
  template: `<canvas #rendererCanvas class="game-canvas"></canvas>`,
  styles: [
    `
      .game-canvas {
        width: 100%;
        height: 100%;
        display: block;
      }
    `,
  ],
  providers: [RendererService],
  standalone: true,
})
export class GameCanvas implements AfterViewInit {
  @ViewChild('rendererCanvas', { static: true })
  rendererCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private rendererService: RendererService) {}

  public ngAfterViewInit(): void {
    console.log('rendering and animating');
    this.rendererService.setCanvas(this.rendererCanvas);
    this.rendererService.createScene();
    this.rendererService.animate();
  }
}
