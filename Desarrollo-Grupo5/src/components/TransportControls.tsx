import { Play, Pause, Download } from 'lucide-react';
import '../styles/TransportControls.css';

interface TransportControlsProps {
  isPlaying: boolean;
  bpm: number;
  onPlayPause: () => void;
  onStop: () => void;
  onBpmChange: (bpm: number) => void;
  onStartRecording?: () => void;
  onStopRecording?: () => void;
  isRecording?: boolean;
}

export function TransportControls({
  isPlaying,
  bpm,
  onPlayPause,
  onStop,
  onBpmChange,
  onStartRecording,
  onStopRecording,
  isRecording = false
}: TransportControlsProps) {
  return (
    <div className="transport-controls">
      <div className="transport-buttons">
        <button
          className={`transport-button play-button-2 ${isPlaying ? 'playing' : ''}`}
          onClick={onPlayPause}
        >
          {isPlaying ? <><Pause size={20} /> Pause</> : <><Play size={20} /> Play</>}
        </button>

        {onStartRecording && onStopRecording && (
          <button
            className={`transport-button record-button ${isRecording ? 'recording' : ''}`}
            onClick={isRecording ? onStopRecording : onStartRecording}
            disabled={!isPlaying && !isRecording}
          >
            <Download size={20} /> {isRecording ? 'Stop Recording' : 'Record MP3'}
          </button>
        )}
      </div>

      <div className="bpm-controls">
        <label style={{color:'white', fontWeight:600}}>BPM:</label>
        <input
          type="range"
          min={60}
          max={180}
          value={bpm}
          onChange={(e) => onBpmChange(Number(e.target.value))}
          className="bpm-slider"
        />
        <div className="bpm-display">{bpm}</div>
      </div>
    </div>
  );
}