/** SoundEffectService will contain the sounds of our videogame. */
import { Injectable } from '@angular/core';
import * as Tone from 'tone';

@Injectable({ providedIn: 'root' })
export class SoundService {
  private synth: Tone.Synth;
  private ghostSynth: Tone.Synth;

  constructor() {
    this.synth = new Tone.Synth().toDestination();
    this.ghostSynth = new Tone.Synth({
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.1 },
    }).toDestination();
  }

  playChompSound(): void {
    this.synth.triggerAttackRelease('C5', '0.1s');
    setTimeout(() => this.synth.triggerAttackRelease('G4', '0.1s'), 100);
  }

  playGhostSound(): void {
    this.ghostSynth.triggerAttackRelease('Bb3', '0.2s');
    setTimeout(() => this.ghostSynth.triggerAttackRelease('Ab3', '0.2s'), 200);
  }

  playPowerPelletSound(): void {
    const now = Tone.now();
    this.synth.triggerAttackRelease('B5', '0.1s', now);
    this.synth.triggerAttackRelease('E6', '0.1s', now + 0.1);
    this.synth.triggerAttackRelease('B5', '0.1s', now + 0.2);
  }

  playDeathSound(): void {
    const now = Tone.now();
    this.synth.triggerAttackRelease('B4', '0.3s', now);
    this.synth.triggerAttackRelease('Ab4', '0.3s', now + 0.3);
    this.synth.triggerAttackRelease('F4', '0.3s', now + 0.6);
    this.synth.triggerAttackRelease('D4', '0.6s', now + 0.9);
  }

  playGhostEatenSound(): void {
    const now = Tone.now();
    this.synth.triggerAttackRelease('B5', '0.1s', now);
    this.synth.triggerAttackRelease('G5', '0.2s', now + 0.1);
  }

  playGameStartSound(): void {
    const now = Tone.now();
    this.synth.triggerAttackRelease('C5', '0.2s', now);
    this.synth.triggerAttackRelease('E5', '0.2s', now + 0.2);
    this.synth.triggerAttackRelease('G5', '0.2s', now + 0.4);
    this.synth.triggerAttackRelease('C6', '0.4s', now + 0.6);
  }
}
