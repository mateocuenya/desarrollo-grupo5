import '../styles/StepSequencer.css';
import { type TrackConfig } from '../lib/supabase';

interface StepSequencerProps {
  tracks: TrackConfig[];
  steps: { [trackId: string]: boolean[] };
  currentStep: number;
  onStepToggle: (trackId: string, stepIndex: number) => void;
}

export function StepSequencer({ tracks, steps, currentStep, onStepToggle }: StepSequencerProps) {
  const totalSteps = steps[tracks[0]?.id]?.length || 16;

  return (
    <div className="step-sequencer">
      {tracks.map((track) => (
        <div key={track.id} className="track">
          <div className="track-name">
            <div className="track-color" style={{ backgroundColor: track.color }} />
            {track.name}
          </div>
          <div className="steps">
            {Array.from({ length: totalSteps }).map((_, stepIndex) => {
              const isActive = steps[track.id]?.[stepIndex] || false;
              const isCurrent = stepIndex === currentStep;
              return (
                <button
                  key={stepIndex}
                  onClick={() => onStepToggle(track.id, stepIndex)}
                  className= {`step ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}
                  style={{ backgroundColor: isActive ? track.color : undefined }}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
