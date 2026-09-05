import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  createSongFailure,
  createSongRequest,
  createSongSuccess,
  deleteSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  fetchSongsFailure,
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchStatsFailure,
  fetchStatsRequest,
  fetchStatsSuccess,
  updateSongFailure,
  updateSongRequest,
  updateSongSuccess,
} from './songSlice';
import * as api from '../../api/songApi';

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong.';
};

function* fetchSongsSaga(action: ReturnType<typeof fetchSongsRequest>) {
  try {
    const songs: Awaited<ReturnType<typeof api.fetchSongs>> = yield call(api.fetchSongs, action.payload);
    yield put(fetchSongsSuccess(songs));
  } catch (error: unknown) {
    yield put(fetchSongsFailure(getErrorMessage(error)));
  }
}

function* createSongSaga(action: ReturnType<typeof createSongRequest>) {
  try {
    const song: Awaited<ReturnType<typeof api.createSong>> = yield call(api.createSong, action.payload);
    yield put(createSongSuccess(song));
    yield put(fetchStatsRequest());
  } catch (error: unknown) {
    yield put(createSongFailure(getErrorMessage(error)));
  }
}

function* updateSongSaga(action: ReturnType<typeof updateSongRequest>) {
  try {
    const { id, data } = action.payload;
    const song: Awaited<ReturnType<typeof api.updateSong>> = yield call(api.updateSong, id, data);
    yield put(updateSongSuccess(song));
    yield put(fetchStatsRequest());
  } catch (error: unknown) {
    yield put(updateSongFailure(getErrorMessage(error)));
  }
}

function* deleteSongSaga(action: ReturnType<typeof deleteSongRequest>) {
  try {
    yield call(api.deleteSong, action.payload);
    yield put(deleteSongSuccess(action.payload));
    yield put(fetchStatsRequest());
  } catch (error: unknown) {
    yield put(deleteSongFailure(getErrorMessage(error)));
  }
}

function* fetchStatsSaga() {
  try {
    const stats: Awaited<ReturnType<typeof api.fetchStats>> = yield call(api.fetchStats);
    yield put(fetchStatsSuccess(stats));
  } catch (error: unknown) {
    yield put(fetchStatsFailure(getErrorMessage(error)));
  }
}

export function* songSaga() {
  yield all([
    takeLatest(fetchSongsRequest.type, fetchSongsSaga),
    takeLatest(createSongRequest.type, createSongSaga),
    takeLatest(updateSongRequest.type, updateSongSaga),
    takeLatest(deleteSongRequest.type, deleteSongSaga),
    takeLatest(fetchStatsRequest.type, fetchStatsSaga),
  ]);
}