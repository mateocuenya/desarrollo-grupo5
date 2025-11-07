import * as Tone from 'tone';
import { type PatternData } from '../lib/supabase';

export class AudioEngine {
  private sequence: Tone.Sequence | null = null;
  private instruments: Map<
    string,
    | Tone.Sampler
    | Tone.MembraneSynth
    | Tone.NoiseSynth
    | Tone.MetalSynth
    | Tone.MonoSynth
  > = new Map();

  private currentStep = 0;
  private totalSteps = 16;
  private onStepCallback?: (step: number) => void;

  private analyser: AnalyserNode;

  constructor() {
    this.initializeInstruments();
    const master = Tone.Destination;
    this.analyser = Tone.context.createAnalyser();
    this.analyser.fftSize = 256;

    master.connect(this.analyser);
  }

  private initializeInstruments() {
    const kick = new Tone.MembraneSynth({
      pitchDecay: 0.05,
      octaves: 6,
      oscillator: { type: 'sine' },
      envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 1.4 }
    }).toDestination();

    const snare = new Tone.NoiseSynth({
      noise: { type: 'white' },
      envelope: { attack: 0.001, decay: 0.2, sustain: 0 }
    }).toDestination();

    const hihat = new Tone.MetalSynth({
      envelope: { attack: 0.001, decay: 0.1, release: 0.01 },
      harmonicity: 5.1,
      modulationIndex: 32,
      resonance: 4000,
      octaves: 1.5
    }).toDestination();

    const bass = new Tone.MonoSynth({
      oscillator: { type: 'sawtooth' },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.5, release: 0.3 }
    }).toDestination();

    this.instruments.set('kick', kick);
    this.instruments.set('snare', snare);
    this.instruments.set('hihat', hihat);
    this.instruments.set('bass', bass);
  }

  setBPM(bpm: number) {
    Tone.getTransport().bpm.value = bpm;
  }

  getBPM(): number {
    return Tone.getTransport().bpm.value;
  }

  setPattern(patternData: PatternData) {
    this.stop();
    this.totalSteps = patternData.steps[patternData.tracks[0]?.id]?.length || 16;

    this.sequence = new Tone.Sequence(
      (time, step) => {
        this.currentStep = step;

        if (this.onStepCallback) {
          Tone.Draw.schedule(() => {
            this.onStepCallback!(step);
          }, time);
        }

        patternData.tracks.forEach((track) => {
          if (patternData.steps[track.id]?.[step]) {
            this.triggerNote(track.id, time);
          }
        });
      },
      [...Array(this.totalSteps).keys()],
      '16n'
    );

    this.sequence.loop = true;
  }

  private triggerNote(trackId: string, time: number) {
    const instrument = this.instruments.get(trackId);
    if (!instrument) return;

    if (trackId === 'kick') {
      (instrument as Tone.MembraneSynth).triggerAttackRelease('C1', '8n', time);
    } else if (trackId === 'snare') {
      (instrument as Tone.NoiseSynth).triggerAttackRelease('16n', time);
    } else if (trackId === 'hihat') {
      (instrument as Tone.MetalSynth).triggerAttackRelease('16n', time);
    } else if (trackId === 'bass') {
      (instrument as Tone.MonoSynth).triggerAttackRelease('A1', '8n', time);
    }
  }

  async start() {
    await Tone.start();
    if (this.sequence) {
      this.sequence.start(0);
      Tone.getTransport().start();
    }
  }

  stop() {
    if (this.sequence) {
      this.sequence.stop();
      this.sequence.dispose();
      this.sequence = null;
    }
    Tone.getTransport().stop();
    this.currentStep = 0;
  }

  isPlaying(): boolean {
    return Tone.getTransport().state === 'started';
  }

  onStep(callback: (step: number) => void) {
    this.onStepCallback = callback;
  }

  dispose() {
    this.stop();
    this.instruments.forEach(instrument => instrument.dispose());
    this.instruments.clear();
  }

  getAnalyser() {
    return this.analyser;
  }

  getMasterOutput(): AudioNode {
    return Tone.Destination as unknown as AudioNode;
  }

  getAudioContext(): AudioContext {
    return Tone.context.rawContext as AudioContext;
  }
}
