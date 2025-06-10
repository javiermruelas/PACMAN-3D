import { ButtonComponent } from '../..';
import { Component } from '@angular/core';

@Component({
  selector: 'pac-settings',
  imports: [ButtonComponent],
  template: `
    <div class="page settings">
      <h2 class="pac-text">Settings</h2>
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
      <pac-button>Back</pac-button>
    </div>
  `,
  styles: [],
  standalone: true,
})
export class SettingsPageComponent {}
