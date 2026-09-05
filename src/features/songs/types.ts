export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SongFormData {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

export interface Statistics {
  overview: {
    totalSongs: number;
    totalArtists: number;
    totalAlbums: number;
    totalGenres: number;
  };
  songsPerGenre: { _id: string; count: number }[];
  artistStats: {
    artist: string;
    songCount: number;
    albumCount: number;
    albums: string[];
  }[];
  songsPerAlbum: { _id: { album: string; artist: string }; count: number }[];
}

export interface SongsState {
  songs: Song[];
  stats: Statistics | null;
  loading: boolean;
  error: string | null;
  filter: {
    genre: string;
    search: string;
  };
}