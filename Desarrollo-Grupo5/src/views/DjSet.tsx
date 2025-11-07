import { useState, useEffect, useRef } from 'react';
import { Music } from 'lucide-react';
import { StepSequencer } from '../components/StepSequencer.tsx';
import { TransportControls } from '../components/TransportControls.tsx';
import { ThemeManager } from '../components/ThemeManager.tsx';
import { AudioEngine } from '../lib/audioEngine';
import { AudioRecorder } from '../lib/audioRecorder';
import { AudioVisualizer } from "../components/AudioVisualizer";
import { type TrackConfig, type PatternData, type Theme } from '../lib/supabase';
import '../styles/DjSet.css';

const DEFAULT_TRACKS: TrackConfig[] = [
  { id: 'kick', name: 'Kick', color: '#ef4444', type: 'drum' },
  { id: 'snare', name: 'Snare', color: '#f59e0b', type: 'drum' },
  { id: 'hihat', name: 'Hi-Hat', color: '#eab308', type: 'drum' },
  { id: 'bass', name: 'Bass', color: '#3b82f6', type: 'synth' },
];

function DjSet() {
  const audioEngineRef = useRef<AudioEngine | null>(null);
  const audioRecorderRef = useRef<AudioRecorder | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [bpm, setBpm] = useState(120);
  const [themeName, setThemeName] = useState('');
  const [steps, setSteps] = useState<{ [trackId: string]: boolean[] }>(() => {
    const initial: { [trackId: string]: boolean[] } = {};
    DEFAULT_TRACKS.forEach((track) => {
      initial[track.id] = Array(16).fill(false);
    });
    return initial;
  });

  useEffect(() => {
    audioEngineRef.current = new AudioEngine();
    audioRecorderRef.current = new AudioRecorder();
    audioEngineRef.current.onStep((step) => setCurrentStep(step));
    return () => {
      audioEngineRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    audioEngineRef.current?.setBPM(bpm);
  }, [bpm]);

  const handleStepToggle = (trackId: string, index: number) => {
    setSteps((prev) => ({
      ...prev,
      [trackId]: prev[trackId].map((v, i) => (i === index ? !v : v)),
    }));
  };

  const handlePlayPause = async () => {
    const engine = audioEngineRef.current;
    if (!engine) return;

    if (isPlaying) {
      engine.stop();
      setIsPlaying(false);
      setCurrentStep(-1);
    } else {
      const patternData: PatternData = { steps, tracks: DEFAULT_TRACKS };
      engine.setPattern(patternData);
      await engine.start();
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    audioEngineRef.current?.stop();
    setIsPlaying(false);
    setCurrentStep(-1);
    
    if (isRecording) {
      handleStopRecording();
    }
  };

  const handleBpmChange = (newBpm: number) => setBpm(newBpm);

  const handleStartRecording = async () => {
    const engine = audioEngineRef.current;
    const recorder = audioRecorderRef.current;
    
    if (!engine || !recorder) return;
    
    try {
      const audioContext = engine.getAudioContext();
      const masterOutput = engine.getMasterOutput();
      
      if (!audioContext || !masterOutput) {
        alert('Error: No se puede acceder al audio engine');
        return;
      }
      
      await recorder.startRecording(audioContext, masterOutput);
      setIsRecording(true);
      console.log('Grabación iniciada');
    } catch (error) {
      console.error('Error al iniciar grabación:', error);
      alert('Error al iniciar la grabación');
    }
  };

  const handleStopRecording = async () => {
    const recorder = audioRecorderRef.current;
    
    if (!recorder) return;
    
    try {
      const fileName = themeName.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'beat';
      await recorder.stopRecording(fileName);
      setIsRecording(false);
    } catch (error) {
      console.error('Error al detener grabación:', error);
      alert('Error al guardar la grabación');
      setIsRecording(false);
    }
  };

  const handleSave = () => {
    const data = JSON.stringify({ name: themeName, bpm, steps });
    localStorage.setItem('djset-theme', data);
    alert('Tema guardado localmente');
  };

  const handleLoad = () => {
    const raw = localStorage.getItem('djset-theme');
    if (!raw) return alert('No hay tema guardado');
    try {
      const data = JSON.parse(raw);
      setThemeName(data.name);
      setBpm(data.bpm);
      setSteps(data.steps);
      alert('Tema cargado correctamente');
    } catch {
      alert('Error al cargar el tema');
    }
  };

  const currentTheme: Theme = { name: themeName, bpm, pattern_data: { steps, tracks: DEFAULT_TRACKS } };

  return (
    <div className="djset-container">
      <div className="djset-inner">
        <header className="djset-header">
          <div className="title">
            <Music className="music-icon" color="#10b981" />
            <h1>DJ Set</h1>
          </div>
        </header>

        <ThemeManager
          currentTheme={currentTheme}
          onLoad={handleLoad}
          onSave={handleSave}
          onNameChange={setThemeName}
        />

        <TransportControls
          isPlaying={isPlaying}
          bpm={bpm}
          onPlayPause={handlePlayPause}
          onStop={handleStop}
          onBpmChange={handleBpmChange}
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
          isRecording={isRecording}
        />

        {isRecording && (
          <div style={{
            textAlign: 'center',
            padding: '10px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '2px solid #ef4444',
            borderRadius: '8px',
            margin: '10px 0',
            color: '#ef4444',
            fontWeight: 'bold',
            animation: 'pulse 1.5s infinite'
          }}>
            🔴 GRABANDO...
          </div>
        )}

        {isPlaying ? (
          <AudioVisualizer audioEngine={audioEngineRef.current} width={800} height={150} />
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '20px',
              border: '2px dashed #555',
              borderRadius: '10px',
              color: '#999',
              margin: '20px auto',
              width: '80%',
              maxWidth: '800px',
              fontSize: '1.1rem',
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            No hay beat reproduciéndose
          </div>
        )}


        <StepSequencer
          tracks={DEFAULT_TRACKS}
          steps={steps}
          currentStep={currentStep}
          onStepToggle={handleStepToggle}
        />

        <footer className="djset-footer">
          <p>Click en la cuadrícula para activar pasos • Presioná Play para escuchar • Presioná Record MP3 para grabar</p>
        </footer>
      </div>
    </div>
  );
}

export default DjSet;
