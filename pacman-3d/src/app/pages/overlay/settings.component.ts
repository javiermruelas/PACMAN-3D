import { Component } from '@angular/core';

@Component({
  selector: 'game-settings',
  standalone: true,
  template: `
    <div class="settings-screen">
      <h2>Settings</h2>
      <div class="settings-content">
        <div class="setting">
          <label>Sound Volume</label>
          <input type="range" min="0" max="100" />
        </div>
        <div class="setting">
          <label>Music Volume</label>
          <input type="range" min="0" max="100" />
        </div>
      </div>
      <button>Back</button>
    </div>
  `,
  styles: [
    `
      .settings-screen {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        padding: 2rem;
        border-radius: 8px;
      }
    `,
  ],
})
export class SettingsComponent {}
