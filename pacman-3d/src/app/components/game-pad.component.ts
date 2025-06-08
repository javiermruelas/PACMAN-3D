import { Component } from '@angular/core';

@Component({
  selector: 'pac-game-pad',
  template: `
    <div id="user-controls-legend" class="game-pad">
      <div class="controls-group">
        <div class="d-pad">
          <div class="control-item up">
            <span class="key symbol square-key">↑</span>
            <span class="action">Move Up</span>
          </div>
          <div class="control-item left">
            <span class="key symbol square-key">←</span>
            <span class="action">Move Left</span>
          </div>
          <div class="control-item right">
            <span class="key symbol square-key">→</span>
            <span class="action">Move Right</span>
          </div>
          <div class="control-item down">
            <span class="key symbol square-key">↓</span>
            <span class="action">Move Down</span>
          </div>
        </div>
        <div class="control-item spacebar">
          <span class="key">Space</span>
          <span class="action">Pause</span>
        </div>
        <div class="control-item">
          <span class="key square-key">R</span>
          <span class="action">Restart</span>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .game-pad {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: rgba(0, 0, 0, 0.7);
        padding: 15px;
        border-radius: 8px;
        color: white;
        font-family: monospace;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
      }

      .controls-group {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }

      .d-pad {
        display: grid;
        grid-template-columns: repeat(
          3,
          auto
        ); /* 3 columns for left, center (empty), right */
        grid-template-rows: repeat(
          3,
          auto
        ); /* 3 rows for up, middle (left/right), down */
        gap: 5px; /* Smaller gap within the D-pad */
        justify-content: center; /* Center the D-pad within its container */
        align-items: center;
      }

      .d-pad .control-item {
        display: flex;
        flex-direction: column; /* Changed to column for D-pad to keep action below key */
        align-items: center;
        gap: 2px; /* Smaller gap between key and action for D-pad */
      }

      .d-pad .control-item .action {
        font-size: 12px; /* Smaller font for action in D-pad to fit */
        white-space: nowrap; /* Prevents action text from wrapping */
      }

      .d-pad .up {
        grid-column: 2; /* Place "up" in the middle column */
        grid-row: 1; /* Place "up" in the top row */
      }

      .d-pad .left {
        grid-column: 1; /* Place "left" in the first column */
        grid-row: 2; /* Place "left" in the middle row */
      }

      .d-pad .right {
        grid-column: 3; /* Place "right" in the third column */
        grid-row: 2; /* Place "right" in the middle row */
      }

      .d-pad .down {
        grid-column: 2; /* Place "down" in the middle column */
        grid-row: 3; /* Place "down" in the bottom row */
      }

      /* General key styling */
      .key {
        background-color: #333;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        min-width: 50px;
        text-align: center;
        border: 1px solid #555;
        box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.3);
        transition: all 0.1s ease-out;
      }

      .key:active {
        transform: translateY(1px);
        box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.3);
        color: #000;
        background-color: var(--pac-yellow);
        opacity: 0.8;
      }

      .key.symbol {
        font-size: 28px;
        line-height: 1;
      }

      .action {
        font-size: 14px;
      }

      /* Square Key Styling (R and directional buttons) */
      .key.square-key {
        width: 40px;
        height: 40px;
        min-width: auto;
        padding: 0;
        border-radius: 4px;
      }

      /* Spacebar Styling */
      .control-item.spacebar .key {
        width: 120px;
        min-width: auto;
        height: 40px;
        border-radius: 6px;
        padding: 0 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
      }

      /* Other control items (Space, R) */
      .control-item {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    `,
  ],
  standalone: true,
})
export class GamePad {}
