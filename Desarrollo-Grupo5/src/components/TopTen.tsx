import { useState } from 'react';
import TrackItem from './TrackItem';
import '../styles/TopTen.css';

interface Track {
  id: number;
  title: string;
  artist: string;
}

const topTracks: Track[] = [
  { id: 1, title: 'Sweet Nothing', artist: 'Calvin Harris' },
  { id: 2, title: 'Sweet Nothing', artist: 'Calvin Harris' },
  { id: 3, title: 'Sweet Nothing', artist: 'Calvin Harris' },
  { id: 4, title: 'Sweet Nothing', artist: 'Calvin Harris' },
  { id: 5, title: 'Sweet Nothing', artist: 'Calvin Harris' },
  { id: 6, title: 'Sweet Nothing', artist: 'Calvin Harris' },
  { id: 7, title: 'Sweet Nothing', artist: 'Calvin Harris' },
  { id: 8, title: 'Sweet Nothing', artist: 'Calvin Harris' },
  { id: 9, title: 'Sweet Nothing', artist: 'Calvin Harris' },
  { id: 10, title: 'Sweet Nothing', artist: 'Calvin Harris' }
];

export default function TopTen(){
const [hoveredTrack, setHoveredTrack] = useState<number | null>(null);

  return (
    <div className="sidebar">
      <div className="top-tracks-card">
        <h3 className="top-tracks-title">
          Beat's <span className="top-tracks-accent">Top10</span>
        </h3>
        <div className="tracks-list">
          {topTracks.map((track, index) => (
            <TrackItem
              key={track.id}
              track={track}
              index={index}
              isHovered={hoveredTrack === track.id}
              onHover={setHoveredTrack}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
