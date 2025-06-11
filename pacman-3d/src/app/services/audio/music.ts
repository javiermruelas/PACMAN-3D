import { Injectable } from '@angular/core';
import { SoundService } from '../sound.service';
import * as Tone from 'tone';

@Injectable({
  providedIn: 'root',
})
export class Music {
  private synth: Tone.Synth;
  private part: Tone.Part;
  private isPlaying = false;

  // Pacman theme notes in Tone.js format
  private readonly melody = [
    { time: '0:0:0', note: 'D3', duration: '8n' },
    { time: '0:0:1', note: 'F#3', duration: '8n' },
    { time: '0:0:2', note: 'A3', duration: '8n' },

    { time: '0:1:0', note: 'D3', duration: '8n' },
    { time: '0:1:1', note: 'F#3', duration: '8n' },
    { time: '0:1:2', note: 'A3', duration: '8n' },

    { time: '0:2:0', note: 'G3', duration: '8n' },
    { time: '0:2:1', note: 'A#3', duration: '8n' },
    { time: '0:2:2', note: 'C4', duration: '8n' },
    { time: '0:2:3', note: 'A#3', duration: '8n' },
    { time: '0:3:0', note: 'G3', duration: '8n' },

    { time: '0:3:1', note: 'F3', duration: '8n' },
    { time: '0:3:2', note: 'E3', duration: '8n' },
    { time: '1:0:0', note: 'D3', duration: '8n' },
    { time: '1:0:1', note: 'E3', duration: '8n' },
    { time: '1:0:2', note: 'F3', duration: '8n' },
    { time: '1:0:3', note: 'G3', duration: '8n' },

    { time: '1:1:0', note: 'A3', duration: '8n' },
    { time: '1:1:1', note: 'G3', duration: '8n' },
    { time: '1:1:2', note: 'F3', duration: '8n' },
    { time: '1:1:3', note: 'D3', duration: '8n' },
  ];

  constructor(private soundService: SoundService) {
    // Initialize synth with square wave
    this.synth = this.soundService.createSynth({
      oscillator: { type: 'square' },
      envelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 0.3,
        release: 0.1,
      },
    } as Tone.SynthOptions);

    // Create part
    this.part = this.soundService.createPart((time, value) => {
      this.synth.triggerAttackRelease(value.note, value.duration, time);
    }, this.melody);

    this.part.loop = true;
    this.part.loopEnd = '2:0:0';
  }

  async start(): Promise<void> {
    if (this.isPlaying) return;

    // Start audio context
    await this.soundService.initialize();

    // Start transport and part
    this.soundService.startTransport(120);
    this.part.start(0);
    this.isPlaying = true;
  }

  stop(): void {
    if (!this.isPlaying) return;

    this.part.stop();
    this.soundService.stopTransport();
    this.isPlaying = false;
  }
}
