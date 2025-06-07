import { Component, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '../../button.component';
import { SplashChars } from './splash-chars.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  imports: [ButtonComponent, SplashChars],
  standalone: true,
  template: `
    <div id="splash-page" class="page splash">
      <pac-splash-chars></pac-splash-chars>
      <pac-button size="lg" (click)="startGame()">Start Game</pac-button>
    </div>
  `,
  styles: [
    `
      .splash {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1vw;
      }
      .bubble {
        width: 100px;
        height: 100px;
        background-color: #000000;
        border-radius: 50%;
        opacity: 0.8;
        position: absolute;
        transform: scale(1);
      }
      .bubble-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 1000;
        pointer-events: none;
        background-color: transparent;
      }
      @keyframes bubbleGrow {
        0% {
          transform: scale(1);
          background-color: #000000;
        }
        100% {
          transform: scale(5);
          background-color: var(--pac-yellow);
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class SplashComponent {
  private static bubbleAmount = 10;

  constructor(private router: Router) {}

  private createBubbles(): HTMLDivElement[] {
    let bubbles: HTMLDivElement[] = [];

    for (let i = 0; i < SplashComponent.bubbleAmount; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';

      // Position bubbles randomly across the screen
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;

      bubble.style.left = `${x}px`;
      bubble.style.top = `${y}px`;

      bubbles.push(bubble);
    }

    return bubbles;
  }

  private navigateToGame(): void {
    this.router.navigate(['/game']);
  }

  /**
   * Begins bubble animation and navigates us to game.
   */
  protected startGame(): void {
    const bubbleContainer = document.createElement('div');
    bubbleContainer.className = 'bubble-wrapper';
    document.body.appendChild(bubbleContainer);

    const bubbles = this.createBubbles();
    bubbles.forEach((bubble) => {
      bubbleContainer.appendChild(bubble);
    });

    // Add event listener to last bubble
    const lastBubble = bubbles[bubbles.length - 1];
    lastBubble.addEventListener(
      'animationend',
      () => {
        // Clean up the bubble container
        this.navigateToGame();
        document?.body.removeChild(bubbleContainer);
      },
      { once: true },
    );

    // Start bubble animations with staggered delays
    requestAnimationFrame(() => {
      bubbles.forEach((bubble, index) => {
        const delay = index * 80;
        bubble.style.animation = `bubbleGrow 300ms ease-out ${delay}ms forwards`;
      });
    });
  }
}
