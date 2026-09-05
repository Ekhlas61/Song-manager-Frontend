import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Song, Statistics, SongsState, SongFormData } from './types';

const initialState: SongsState = {
  songs: [],
  stats: null,
  loading: false,
  error: null,
  filter: { genre: '', search: '' },
};

const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    // Fetch
    fetchSongsRequest: (state, action: PayloadAction<Record<string, string> | undefined>) => {
      void action;
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.loading = false;
      const hasCreationDates = action.payload.every((song) => Boolean(song.createdAt));
      state.songs = hasCreationDates
        ? [...action.payload].sort(
            (left, right) =>
              new Date(right.createdAt as string).getTime() - new Date(left.createdAt as string).getTime(),
          )
        : action.payload;
    },
    fetchSongsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Create
    createSongRequest: (state, action: PayloadAction<SongFormData>) => {
      void action;
      state.loading = true;
    },
    createSongSuccess: (state, action: PayloadAction<Song>) => {
      state.loading = false;
      state.songs.unshift(action.payload);
    },
    createSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update
    updateSongRequest: (state, action: PayloadAction<{ id: string; data: SongFormData }>) => {
      void action;
      state.loading = true;
    },
    updateSongSuccess: (state, action: PayloadAction<Song>) => {
      state.loading = false;
      const idx = state.songs.findIndex(s => s._id === action.payload._id);
      if (idx !== -1) state.songs[idx] = action.payload;
    },
    updateSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete
    deleteSongRequest: (state, action: PayloadAction<string>) => {
      void action;
      state.loading = true;
    },
    deleteSongSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.songs = state.songs.filter(s => s._id !== action.payload);
    },
    deleteSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Stats
    fetchStatsRequest: (state) => {
      state.loading = true;
    },
    fetchStatsSuccess: (state, action: PayloadAction<Statistics>) => {
      state.loading = false;
      state.stats = action.payload;
    },
    fetchStatsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Filter
    setFilter: (state, action: PayloadAction<Partial<SongsState['filter']>>) => {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
});

export const {
  fetchSongsRequest, fetchSongsSuccess, fetchSongsFailure,
  createSongRequest, createSongSuccess, createSongFailure,
  updateSongRequest, updateSongSuccess, updateSongFailure,
  deleteSongRequest, deleteSongSuccess, deleteSongFailure,
  fetchStatsRequest, fetchStatsSuccess, fetchStatsFailure,
  setFilter,
} = songSlice.actions;

export default songSlice.reducer;