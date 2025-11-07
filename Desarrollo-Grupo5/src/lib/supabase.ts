// lib/supabase.ts

export interface TrackConfig {
  id: string;
  name: string;
  color: string;
  type: 'drum' | 'synth' | 'sample';
}

export interface PatternData {
  steps: {
    [trackId: string]: boolean[];
  };
  tracks: TrackConfig[];
}

export interface Theme {
  id?: string;
  name: string;
  bpm: number;
  pattern_data: PatternData;
  created_at?: string;
  updated_at?: string;
}