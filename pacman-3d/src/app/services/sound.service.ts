import { Injectable } from '@angular/core';
import * as Tone from 'tone';
import { TransportClass } from 'tone/build/esm/core/clock/Transport';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private initialized = false;
  private toneTransport: TransportClass | undefined;

  async initialize(): Promise<void> {
    if (!this.initialized) {
      await Tone.start();
      this.toneTransport = Tone.getTransport();
      this.initialized = true;
    }
  }

  createSynth(options?: Partial<Tone.SynthOptions>): Tone.Synth {
    return new Tone.Synth(options).toDestination();
  }

  createPart(
    callback: (time: number, value: any) => void,
    events: any[],
  ): Tone.Part {
    return new Tone.Part(callback, events);
  }

  startTransport(bpm: number = 120): void {
    if (!this.toneTransport) {
      return console.warn("SoundService: Tone Transport wasn't initialized.");
    }

    this.toneTransport.bpm.value = bpm;
    this.toneTransport.start();
  }

  stopTransport(): void {
    if (!this.toneTransport) {
      return console.warn("SoundService: Tone Transport wasn't initialized.");
    }

    this.toneTransport.stop();
  }

  getCurrentTime(): number {
    return Tone.now();
  }
}
