import axios from 'axios';
import type { Song, SongFormData, Statistics } from '../features/songs/types';

const apiBaseUrl =
  import.meta.env.VITE_API_URL ||
  import.meta.env.REACT_APP_API_URL ||
  'https://song-manager-backend-2.onrender.com/api/songs';

const API = axios.create({
  baseURL: apiBaseUrl,
});

export const fetchSongs = (params?: Record<string, string>) =>
  API.get<Song[]>('/', { params }).then((res) => res.data);

export const createSong = (data: SongFormData) =>
  API.post<Song>('/', data).then((res) => res.data);

export const updateSong = (id: string, data: SongFormData) =>
  API.put<Song>(`/${id}`, data).then((res) => res.data);

export const deleteSong = (id: string) =>
  API.delete(`/${id}`).then((res) => res.data);

export const fetchStats = () =>
  API.get<Statistics>('/stats').then((res) => res.data);