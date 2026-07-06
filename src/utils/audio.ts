/**
 * Numooji Reusable AudioManager
 * Procedural Audio Synthesizer using Web Audio API.
 * Keeps loading times instant, avoids external asset dependencies, and runs offline.
 * Perfectly calibrated for a cozy, woodblock, felt-piano, and hand-drawn notebook vibe.
 */

export type SoundEffectType =
  | 'hover'
  | 'click'
  | 'select'
  | 'correct'
  | 'wrong'
  | 'streak'
  | 'replay'
  | 'timerEnding'
  | 'gameOverWin'
  | 'gameOverLose';

export type CharacterPersonalityType = 'pibble' | 'momo' | 'sly' | 'bo' | 'nori';

class AudioManagerImpl {
  private audioCtx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  
  private isMuted: boolean = false;
  private musicVolume = 0.22; // Looping music at cozy 22%
  private sfxVolume = 0.38;   // Subtle UI SFX at 38%

  // Look-ahead Scheduler parameters
  private musicIntervalId: any = null;
  private nextNoteTime = 0;
  private scheduleAheadTime = 0.15; // 150ms look-ahead window
  private lookahead = 50;           // check queue every 50ms
  private currentBeat = 0;
  private isMusicPlaying = false;

  constructor() {
    // Read mute settings from session-persistent localStorage
    const saved = localStorage.getItem('numooji_muted');
    this.isMuted = saved === 'true';

    // Auto-unlock Web Audio on first user interaction gesture
    const unlock = () => {
      this.resume();
      this.startMusic();
      
      // Cleanup events
      window.removeEventListener('click', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('keydown', unlock);
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('click', unlock);
      window.addEventListener('touchstart', unlock);
      window.addEventListener('keydown', unlock);
    }
  }

  /**
   * Lazily initializes the audio graph.
   */
  public init() {
    if (this.audioCtx) return;

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    try {
      this.audioCtx = new AudioContextClass();
      
      // Create node hierarchy
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.connect(this.audioCtx.destination);

      this.musicGain = this.audioCtx.createGain();
      this.musicGain.connect(this.masterGain);
      // If muted, set start music volume to 0
      this.musicGain.gain.setValueAtTime(this.isMuted ? 0 : this.musicVolume, this.audioCtx.currentTime);

      this.sfxGain = this.audioCtx.createGain();
      this.sfxGain.connect(this.masterGain);
      this.sfxGain.gain.setValueAtTime(this.isMuted ? 0 : this.sfxVolume, this.audioCtx.currentTime);

    } catch (e) {
      console.warn('AudioContext initialization failed:', e);
    }
  }

  /**
   * Resumes the AudioContext if it was suspended by browser autoplay policy.
   */
  public resume() {
    this.init();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  /**
   * Starts background procedural sequencer.
   */
  public startMusic() {
    if (this.isMusicPlaying) return;
    this.init();
    
    if (!this.audioCtx) return;
    
    this.isMusicPlaying = true;
    this.nextNoteTime = this.audioCtx.currentTime + 0.15;
    this.currentBeat = 0;

    const tick = () => {
      if (!this.audioCtx) return;
      // Queue up any beats that fall within the schedule window
      while (this.nextNoteTime < this.audioCtx.currentTime + this.scheduleAheadTime) {
        this.scheduleBeat(this.currentBeat, this.nextNoteTime);
        this.advanceBeat();
      }
    };

    // Run lookahead loop
    this.musicIntervalId = setInterval(tick, this.lookahead);
  }

  /**
   * Steps the music timeline forward by beat duration.
   */
  private advanceBeat() {
    const beatDuration = 0.85; // Cozy ~70 BPM (0.85 seconds per beat)
    this.nextNoteTime += beatDuration;
    this.currentBeat = (this.currentBeat + 1) % 16; // 16-beat cycle (4 bars of 4 beats)
  }

  /**
   * Schedules a single procedural beat with a gorgeous felt-piano and soft-marimba layout.
   */
  private scheduleBeat(beat: number, time: number) {
    if (!this.audioCtx || !this.musicGain) return;

    // Chord progression root notes (slow, deep, filtered)
    let bassFreq = 130.81; // C3
    let chordFreqs: number[] = [];

    const bar = Math.floor(beat / 4);
    const beatOfBar = beat % 4;

    // Cmaj7 -> G6 -> Am7 -> Fadd9 (Calming, whimsical circle)
    if (bar === 0) {
      bassFreq = 130.81; // C3 fundamental
      chordFreqs = [261.63, 329.63, 392.00, 493.88]; // C4, E4, G4, B4 (Cmaj7)
    } else if (bar === 1) {
      bassFreq = 98.00; // G2 fundamental
      chordFreqs = [293.66, 392.00, 493.88, 587.33]; // D4, G4, B4, D5 (G6/G9)
    } else if (bar === 2) {
      bassFreq = 110.00; // A2 fundamental
      chordFreqs = [261.63, 329.63, 440.00, 523.25]; // C4, E4, A4, C5 (Am7)
    } else {
      bassFreq = 87.31; // F2 fundamental
      chordFreqs = [261.63, 349.23, 440.00, 523.25]; // C4, F4, A4, C5 (Fmaj7)
    }

    // Play bass and strummed backing chord on beat 0 of every bar
    if (beatOfBar === 0) {
      // Warm, deep acoustic bass (triangle oscillator, heavily lowpass filtered)
      this.playProceduralNote(bassFreq, 0.15, 2.0, 'triangle', 250, time, this.musicGain);
      
      // Cozy backing chord (sine waves, staggered subtly to mimic finger strumming)
      chordFreqs.forEach((freq, idx) => {
        this.playProceduralNote(freq, 0.05, 1.5, 'sine', 500, time + idx * 0.04, this.musicGain);
      });
    } else if (beatOfBar === 2 && Math.random() < 0.7) {
      // Play a soft mid-frequency chord dyad on beat 2 for structural movement
      const mid1 = chordFreqs[1];
      const mid2 = chordFreqs[2];
      this.playProceduralNote(mid1, 0.04, 1.2, 'sine', 450, time, this.musicGain);
      this.playProceduralNote(mid2, 0.04, 1.2, 'sine', 450, time + 0.03, this.musicGain);
    } else {
      // Sparse, playful, ambient pentatonic melody on other beats (40% probability)
      if (Math.random() < 0.4) {
        const pentatonicScale = [329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00]; // E4, G4, A4, C5, D5, E5, G5, A5
        const randomNote = pentatonicScale[Math.floor(Math.random() * pentatonicScale.length)];
        // Extremely soft and woodblock-sounding (triangle with damp decay)
        this.playProceduralNote(randomNote, 0.045, 0.8, 'triangle', 750, time, this.musicGain);
      }
    }
  }

  /**
   * Helper to play a single cozy note with envelope and lowpass sweeps.
   */
  private playProceduralNote(
    freq: number,
    vol: number,
    duration: number,
    type: OscillatorType,
    filterCutoff: number,
    time: number,
    targetGain: GainNode
  ) {
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const filter = this.audioCtx.createBiquadFilter();
    const gainNode = this.audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(filterCutoff, time);
    filter.frequency.exponentialRampToValueAtTime(100, time + duration);

    gainNode.gain.setValueAtTime(0, time);
    // Soft attack (prevents popping, sounds like felt hammers / soft mallets)
    gainNode.gain.linearRampToValueAtTime(vol, time + 0.06);
    // Long elegant exponential decay
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(targetGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  /**
   * Triggers a specific UI or system sound effect.
   */
  public play(type: SoundEffectType) {
    this.resume();
    if (this.isMuted || !this.audioCtx || !this.sfxGain) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    switch (type) {
      case 'hover': {
        // Soft pencil tip / wood tapping
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(260, now);
        
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.start(now);
        osc.stop(now + 0.06);
        break;
      }

      case 'click': {
        // Crisp woodblock click
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.sfxGain);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(500, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1100, now);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.start(now);
        osc.stop(now + 0.09);
        break;
      }

      case 'select': {
        // Double cute select wood tick-tack
        const playTick = (freq: number, delay: number) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(this.sfxGain);

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + delay);

          gain.gain.setValueAtTime(0.14, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.06);

          osc.start(now + delay);
          osc.stop(now + delay + 0.07);
        };
        playTick(350, 0);
        playTick(480, 0.08);
        break;
      }

      case 'correct': {
        // Cozy marimba chord arpeggio
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.sfxGain);

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.04);
          
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(900, now + idx * 0.04);

          gain.gain.setValueAtTime(0, now + idx * 0.04);
          gain.gain.linearRampToValueAtTime(0.1, now + idx * 0.04 + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.35);

          osc.start(now + idx * 0.04);
          osc.stop(now + idx * 0.04 + 0.40);
        });
        break;
      }

      case 'wrong': {
        // Muted double plop thud
        const playPlop = (freq: number, delay: number) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.sfxGain);

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now + delay);
          osc.frequency.linearRampToValueAtTime(freq * 0.75, now + delay + 0.15);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(250, now + delay);

          gain.gain.setValueAtTime(0.15, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.18);

          osc.start(now + delay);
          osc.stop(now + delay + 0.20);
        };
        playPlop(160, 0);
        playPlop(130, 0.1);
        break;
      }

      case 'streak': {
        // Whimsical ascending scale (cozy sparkle climb)
        const scale = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50]; // Pentatonic scale arpeggio
        scale.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(this.sfxGain);

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);

          gain.gain.setValueAtTime(0, now + idx * 0.05);
          gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.05 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.25);

          osc.start(now + idx * 0.05);
          osc.stop(now + idx * 0.05 + 0.3);
        });
        break;
      }

      case 'replay': {
        // White noise-based paper sketchbook page turn
        try {
          const sampleRate = ctx.sampleRate;
          const bufferSize = sampleRate * 0.4; // 0.4 seconds
          const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
          const data = buffer.getChannelData(0);
          
          // Generate noise
          for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
          }

          const noiseNode = ctx.createBufferSource();
          noiseNode.buffer = buffer;

          const filter = ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(1000, now);
          filter.frequency.exponentialRampToValueAtTime(500, now + 0.35);
          filter.Q.setValueAtTime(1.5, now);

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.09, now + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

          noiseNode.connect(filter);
          filter.connect(gain);
          gain.connect(this.sfxGain);

          noiseNode.start(now);

          // Add a soft bell note underneath
          const bell = ctx.createOscillator();
          const bellGain = ctx.createGain();
          bell.connect(bellGain);
          bellGain.connect(this.sfxGain);

          bell.type = 'sine';
          bell.frequency.setValueAtTime(440, now + 0.1);

          bellGain.gain.setValueAtTime(0, now + 0.1);
          bellGain.gain.linearRampToValueAtTime(0.05, now + 0.12);
          bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

          bell.start(now + 0.1);
          bell.stop(now + 0.4);

        } catch (err) {
          // Fallback if audio buffer fails
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(392, now);
          gain.gain.setValueAtTime(0.1, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
          osc.start(now);
          osc.stop(now + 0.25);
        }
        break;
      }

      case 'timerEnding': {
        // Deep warm desk-bell resonant chime
        const oscFundamental = ctx.createOscillator();
        const oscHarmonic = ctx.createOscillator();
        const gainF = ctx.createGain();
        const gainH = ctx.createGain();

        oscFundamental.connect(gainF);
        oscHarmonic.connect(gainH);
        gainF.connect(this.sfxGain);
        gainH.connect(this.sfxGain);

        oscFundamental.type = 'sine';
        oscFundamental.frequency.setValueAtTime(220, now); // A3

        oscHarmonic.type = 'sine';
        oscHarmonic.frequency.setValueAtTime(440, now); // A4 harmonic

        gainF.gain.setValueAtTime(0.12, now);
        gainF.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        gainH.gain.setValueAtTime(0.04, now);
        gainH.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

        oscFundamental.start(now);
        oscHarmonic.start(now);
        oscFundamental.stop(now + 1.3);
        oscHarmonic.stop(now + 0.9);
        break;
      }

      case 'gameOverWin': {
        // Beautiful ambient pentatonic cascade
        const cascade = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C4 to C6
        cascade.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.sfxGain);

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(800, now + idx * 0.12);

          gain.gain.setValueAtTime(0, now + idx * 0.12);
          gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.12 + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.8);

          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 0.9);
        });
        break;
      }

      case 'gameOverLose': {
        // Comforting, downward minor wooden slide
        const scale = [293.66, 261.63, 220.00, 196.00, 146.83]; // Downwards cascade
        scale.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.sfxGain);

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.14);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(350, now + idx * 0.14);

          gain.gain.setValueAtTime(0, now + idx * 0.14);
          gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.14 + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.14 + 0.7);

          osc.start(now + idx * 0.14);
          osc.stop(now + idx * 0.14 + 0.8);
        });
        break;
      }
    }
  }

  /**
   * Triggers a personality character effect.
   */
  public playReaction(id: CharacterPersonalityType) {
    this.resume();
    if (this.isMuted || !this.audioCtx || !this.sfxGain) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    switch (id) {
      case 'pibble': {
        // Playful double bubble-pop
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(1400, now + 0.05);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.start(now);
        osc.stop(now + 0.06);

        // tiny squeak delayed
        const squeak = ctx.createOscillator();
        const sGain = ctx.createGain();
        squeak.connect(sGain);
        sGain.connect(this.sfxGain);

        squeak.type = 'sine';
        squeak.frequency.setValueAtTime(1200, now + 0.08);
        squeak.frequency.exponentialRampToValueAtTime(1500, now + 0.12);

        sGain.gain.setValueAtTime(0, now + 0.08);
        sGain.gain.linearRampToValueAtTime(0.06, now + 0.09);
        sGain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

        squeak.start(now + 0.08);
        squeak.stop(now + 0.14);
        break;
      }

      case 'momo': {
        // Warm resonant temple wooden bell
        const osc = ctx.createOscillator();
        const oscHarmonic = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.connect(filter);
        oscHarmonic.connect(filter);
        filter.connect(gain);
        gain.connect(this.sfxGain);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, now);

        oscHarmonic.type = 'sine';
        oscHarmonic.frequency.setValueAtTime(540, now); // third harmonic for bell bell resonance

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, now);
        filter.frequency.exponentialRampToValueAtTime(100, now + 1.1);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc.start(now);
        oscHarmonic.start(now);
        osc.stop(now + 1.2);
        oscHarmonic.stop(now + 1.2);
        break;
      }

      case 'sly': {
        // Delicate metal wind chime
        const frequencies = [1100, 1650, 2200];
        frequencies.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(this.sfxGain);

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.03);

          gain.gain.setValueAtTime(0, now + idx * 0.03);
          gain.gain.linearRampToValueAtTime(0.05, now + idx * 0.03 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.03 + 0.5);

          osc.start(now + idx * 0.03);
          osc.stop(now + idx * 0.03 + 0.55);
        });
        break;
      }

      case 'bo': {
        // Pencil ticking clock accent
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1800, now);

        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.012);

        osc.start(now);
        osc.stop(now + 0.015);
        break;
      }

      case 'nori': {
        // Magical, airy sweep sparkle
        const playSweep = (delay: number, baseFreq: number) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.sfxGain);

          osc.type = 'sine';
          osc.frequency.setValueAtTime(baseFreq, now + delay);
          osc.frequency.exponentialRampToValueAtTime(baseFreq * 2.2, now + delay + 0.12);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1800, now + delay);

          gain.gain.setValueAtTime(0, now + delay);
          gain.gain.linearRampToValueAtTime(0.05, now + delay + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.15);

          osc.start(now + delay);
          osc.stop(now + delay + 0.16);
        };
        playSweep(0, 900);
        playSweep(0.04, 1100);
        playSweep(0.08, 1300);
        break;
      }
    }
  }

  /**
   * Toggles global mute state and saves preference.
   * Smoothly fades background music in/out.
   */
  public setMuted(muted: boolean) {
    this.isMuted = muted;
    localStorage.setItem('numooji_muted', muted ? 'true' : 'false');
    
    // Ensure initialized
    this.resume();

    if (!this.audioCtx || !this.musicGain || !this.sfxGain) return;

    const time = this.audioCtx.currentTime;

    if (muted) {
      // Smooth music fade out over 0.5s to prevent abrupt clicks
      this.musicGain.gain.cancelScheduledValues(time);
      this.musicGain.gain.setValueAtTime(this.musicGain.gain.value, time);
      this.musicGain.gain.linearRampToValueAtTime(0, time + 0.5);

      // Instant silence for SFX
      this.sfxGain.gain.cancelScheduledValues(time);
      this.sfxGain.gain.setValueAtTime(0, time);
    } else {
      // Smooth music fade in over 0.8s
      this.musicGain.gain.cancelScheduledValues(time);
      this.musicGain.gain.setValueAtTime(0, time);
      this.musicGain.gain.linearRampToValueAtTime(this.musicVolume, time + 0.8);

      // Instantly restore SFX volume
      this.sfxGain.gain.cancelScheduledValues(time);
      this.sfxGain.gain.setValueAtTime(this.sfxVolume, time);

      // Play soft tap to confirm unmute
      this.play('click');
    }
  }

  /**
   * Gets current mute status.
   */
  public getMuted(): boolean {
    return this.isMuted;
  }
}

// Export a single application-wide static instance
export const audioManager = new AudioManagerImpl();
