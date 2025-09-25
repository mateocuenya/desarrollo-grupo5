import { useState } from 'react'
import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

interface Track {
  id: number;
  title: string;
  artist: string;
}

interface Album {
  id: number;
  title: string;
  artist: string;
  cover: string;
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

const featuredAlbums: Album[] = [
  {
    id: 1,
    title: 'Sweet Nothing',
    artist: 'Calvin Harris',
    cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    title: 'Sweet Nothing',
    artist: 'Calvin Harris',
    cover: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    title: 'Sweet Nothing',
    artist: 'Calvin Harris',
    cover: 'https://images.pexels.com/photos/2479312/pexels-photo-2479312.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 4,
    title: 'Sweet Nothing',
    artist: 'Calvin Harris',
    cover: 'https://images.pexels.com/photos/1616470/pexels-photo-1616470.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
