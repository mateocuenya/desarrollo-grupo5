import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

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
  const [albums, setAlbums] = useState<Album[]>(() => {
    const stored = localStorage.getItem('albums');
    return stored ? JSON.parse(stored) : [];
  });

  const addAlbum = (album: Album) => {
    setAlbums(prev => {
      const updated = [...prev, { ...album, id: Date.now() }];
      localStorage.setItem('albums', JSON.stringify(updated)); 
      return updated;
    });
  };


  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'albums') {
        setAlbums(event.newValue ? JSON.parse(event.newValue) : []);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

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
