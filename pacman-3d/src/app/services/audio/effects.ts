import { Injectable } from '@angular/core';
import { SoundService } from '../sound.service';
import * as Tone from 'tone';

@Injectable({ providedIn: 'root' })
export class SoundEffects {
  private synth: Tone.Synth;
  private ghostSynth: Tone.Synth;

  constructor(private soundService: SoundService) {
    this.synth = this.soundService.createSynth();
    this.ghostSynth = this.soundService.createSynth({
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.1 },
    } as Tone.SynthOptions);
  }

  async playChompSound(): Promise<void> {
    await this.soundService.initialize();
    this.synth.triggerAttackRelease('C5', '0.1s');
    setTimeout(() => this.synth.triggerAttackRelease('G4', '0.1s'), 100);
  }

  async playGhostSound(): Promise<void> {
    await this.soundService.initialize();
    this.ghostSynth.triggerAttackRelease('Bb3', '0.2s');
    setTimeout(() => this.ghostSynth.triggerAttackRelease('Ab3', '0.2s'), 200);
  }

  async playPowerPelletSound(): Promise<void> {
    await this.soundService.initialize();
    const now = this.soundService.getCurrentTime();
    this.synth.triggerAttackRelease('B5', '0.1s', now);
    this.synth.triggerAttackRelease('E6', '0.1s', now + 0.1);
    this.synth.triggerAttackRelease('B5', '0.1s', now + 0.2);
  }

  async playDeathSound(): Promise<void> {
    await this.soundService.initialize();
    const now = this.soundService.getCurrentTime();
    this.synth.triggerAttackRelease('B4', '0.3s', now);
    this.synth.triggerAttackRelease('Ab4', '0.3s', now + 0.3);
    this.synth.triggerAttackRelease('F4', '0.3s', now + 0.6);
    this.synth.triggerAttackRelease('D4', '0.6s', now + 0.9);
  }

  async playGhostEatenSound(): Promise<void> {
    await this.soundService.initialize();
    const now = this.soundService.getCurrentTime();
    this.synth.triggerAttackRelease('B5', '0.1s', now);
    this.synth.triggerAttackRelease('G5', '0.2s', now + 0.1);
  }

  async playGameStartSound(): Promise<void> {
    await this.soundService.initialize();
    const now = this.soundService.getCurrentTime();
    this.synth.triggerAttackRelease('C5', '0.2s', now);
    this.synth.triggerAttackRelease('E5', '0.2s', now + 0.2);
    this.synth.triggerAttackRelease('G5', '0.2s', now + 0.4);
    this.synth.triggerAttackRelease('C6', '0.4s', now + 0.6);
  }
}
