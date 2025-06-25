import { ElementRef, Injectable, NgZone, inject } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root',
})
export class RendererService {
  private ngZone: NgZone = inject(NgZone);
  private canvas: ElementRef<HTMLCanvasElement> | undefined;
  private renderer: THREE.WebGLRenderer | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private scene: THREE.Scene | null = null;
  private light: THREE.AmbientLight | null = null;

  private cube: THREE.Mesh | null = null;

  private frameId: number | null = null;

  public setCanvas(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas;
  }

  public destroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
    if (this.renderer != null) {
      this.renderer.dispose();
      this.renderer = null;
    }
  }

  public createScene(): void {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas?.nativeElement,
      alpha: true, // transparent background
      antialias: true, // smooth edges
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // create the scene
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.position.z = 5;
    this.scene.add(this.camera);

    // soft white light
    this.light = new THREE.AmbientLight(0x404040);
    this.light.position.z = 10;
    this.scene.add(this.light);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
  }

  public animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      }

      window.addEventListener('resize', () => {
        this.resize();
      });
    });
  }

  public render(): void {
    if (!this.renderer) {
      throw new Error(
        'RenderService cannot render. this.render not initialized.',
      );
    }
    if (!this.cube) {
      throw new Error(
        'RendererService cannot render. this.canvas not initialized.',
      );
    }
    if (!this.scene) {
      throw new Error(
        'RenderService cannot render. this.scene not initialized.',
      );
    }
    if (!this.camera) {
      throw new Error(
        'RendererService cannot render. this.camera not initialized.',
      );
    }

    this.frameId = requestAnimationFrame(() => {
      this.render();
    });

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * todo: refactor so that the renderer service is rendering our entire subprop tree
   */
  public resize(assets = []): void {
    if (!this.renderer) {
      throw new Error(
        'RenderService cannot run resize method. this.renderer not initialized.',
      );
    }
    if (!this.camera) {
      throw new Error(
        'RendererService cannot run resize method. Camera is not initialized.',
      );
    }
    if (!this.cube) {
      throw new Error('RendererService cannot render. Asset not initialized.');
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
}
