import { Injectable } from '@angular/core';
import * as Tone from 'tone';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private initialized = false;

  async initialize(): Promise<void> {
    if (!this.initialized) {
      await Tone.start();
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
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.start();
  }

  stopTransport(): void {
    Tone.Transport.stop();
  }

  getCurrentTime(): number {
    return Tone.now();
  }
}
