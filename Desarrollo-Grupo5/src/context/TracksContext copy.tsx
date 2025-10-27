import { createContext, useContext, useState, type ReactNode } from 'react';

interface Album {
  id: number;
  title: string;
  artist: string;
  cover: string;
  audio: string;
  price: number;
}

interface TracksContextType {
  albums: Album[];
  addAlbum: (album: Album) => void;
}

const TracksContext = createContext<TracksContextType | undefined>(undefined);

export const TracksProvider = ({ children }: { children: ReactNode }) => {
  const [albums, setAlbums] = useState<Album[]>([]);

  const addAlbum = (album: Album) => {
    setAlbums(prev => [...prev, { ...album, id: Date.now() }]);
  };

  return (
    <TracksContext.Provider value={{ albums, addAlbum }}>
      {children}
    </TracksContext.Provider>
  );
};

export const useTracks = () => {
  const context = useContext(TracksContext);
  if (!context) throw new Error("useTracks debe usarse dentro de un TracksProvider");
  return context;
};
