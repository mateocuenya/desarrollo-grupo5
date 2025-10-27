export interface TrackFormData {
  title: string;
  bpm: string;
  duration: string;
  discography: string;
  format: string;
  releaseDate: string;
  artistName: string;
  artistLastName: string;
  price: string;
  genre: string;
}

export interface ValidationErrors {
  title: string | null;
  bpm: string | null;
  duration: string | null;
  discography: string | null;
  format: string | null;
  releaseDate: string | null;
  artistName: string | null;
  artistLastName: string | null;
  price: string | null;
  genre: string | null;
}

export const validateTrackForm = (data: TrackFormData): ValidationErrors => {
  const allowedFormats = ['MP3', 'WAV', 'FLAC', 'AAC'];
  const allowedGenres = ['Progressive House', 'Deep House', 'Tech House', 'Techno', 'Trance', 'Ambient', 'Drum & Bass'];

  return {
    title: !data.title.trim()
      ? 'El título es obligatorio'
      : !/^[\w\s]{2,100}$/.test(data.title)
      ? 'El título debe tener entre 2 y 100 caracteres'
      : null,

    bpm: !data.bpm.trim()
      ? 'El BPM es obligatorio'
      : !/^\d+$/.test(data.bpm)
      ? 'BPM inválido: debe ser un número entero'
      : null,

    duration: !data.duration.trim()
      ? 'La duración es obligatoria'
      : !/^[0-5]?\d:[0-5]\d$/.test(data.duration)
      ? 'Duración inválida: formato mm:ss'
      : null,

    discography: !data.discography.trim()
      ? 'La discográfica es obligatoria'
      : !/^.{2,50}$/.test(data.discography)
      ? 'Discográfica inválida: entre 2 y 50 caracteres'
      : null,

    format: !data.format.trim()
      ? 'El formato es obligatorio'
      : !allowedFormats.includes(data.format)
      ? 'Formato inválido'
      : null,

    releaseDate: !data.releaseDate.trim()
      ? 'La fecha de lanzamiento es obligatoria'
      : !/^\d{4}-\d{2}-\d{2}$/.test(data.releaseDate)
      ? 'Fecha inválida: usar formato YYYY-MM-DD'
      : null,

    artistName: !data.artistName.trim()
      ? 'El nombre del autor es obligatorio'
      : !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{2,50}$/.test(data.artistName)
      ? 'Nombre del autor inválido: solo letras y entre 2 y 50 caracteres'
      : null,

    artistLastName: !data.artistLastName.trim()
      ? 'El apellido del autor es obligatorio'
      : !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{2,50}$/.test(data.artistLastName)
      ? 'Apellido del autor inválido: solo letras y entre 2 y 50 caracteres'
      : null,

    price: !data.price.trim()
      ? 'El precio es obligatorio'
      : !/^\d+(\.\d{1,2})?$/.test(data.price)
      ? 'Precio inválido: máximo 2 decimales'
      : null,

    genre: !data.genre.trim()
      ? 'El género es obligatorio'
      : !allowedGenres.includes(data.genre)
      ? 'Género inválido'
      : null,
  };
};
