import styled from '@emotion/styled';
import { FiMusic } from 'react-icons/fi';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { Song, SongFormData } from '../features/songs/types';
import {
  createSongRequest,
  deleteSongRequest,
  fetchSongsRequest,
  fetchStatsRequest,
  setFilter,
  updateSongRequest,
} from '../features/songs/songSlice';
import type { AppDispatch, RootState } from '../store';
import FilterBar from './FilterBar';
import SongForm from './SongForm';
import SongList from './SongList';
import Statistics from './Statistics';

const AppShell = styled.div({
  minHeight: '100vh',
  width: '100%',
  background: 'radial-gradient(circle at top, rgba(99, 102, 241, 0.18), transparent 35%), #0f172a',
  color: '#f8fafc',
});

const Container = styled.main({
  width: '100%',
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
  '@media (min-width: 768px)': {
    padding: '1.5rem',
  },
  '@media (min-width: 1280px)': {
    padding: '2rem',
  },
});

const Header = styled.header({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.35rem',
  padding: '1rem 0',
});

const Title = styled.h1({
  display: 'flex',
  alignItems: 'center',
  gap: '0.65rem',
  fontSize: 'clamp(1.9rem, 4vw, 3rem)',
  fontWeight: 700,
  fontFamily: 'Poppins, sans-serif',
  lineHeight: 1.1,
  wordBreak: 'break-word',
});

const Subtitle = styled.p({
  color: '#cbd5e1',
  fontSize: '0.98rem',
  maxWidth: '680px',
});

const ContentGrid = styled.div({
  display: 'grid',
  gap: '1rem',
  width: '100%',
  '@media (min-width: 1040px)': {
    gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
    alignItems: 'start',
  },
});

const Panel = styled.section({
  width: '100%',
  background: 'rgba(15, 23, 42, 0.66)',
  border: '1px solid rgba(148, 163, 184, 0.12)',
  borderRadius: '18px',
  boxShadow: '0 20px 40px rgba(15, 23, 42, 0.3)',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  '@media (min-width: 768px)': {
    padding: '1.25rem',
  },
});

const SectionHeader = styled.h2({
  fontSize: '1.05rem',
  fontWeight: 700,
  color: '#f8fafc',
  letterSpacing: '0.01em',
});

const Layout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { songs, stats, loading, error, filter } = useSelector((state: RootState) => state.songs);
  const [editingSong, setEditingSong] = useState<Song | null>(null);

  useEffect(() => {
    const params: Record<string, string> = {};

    if (filter.genre) {
      params.genre = filter.genre;
    }

    if (filter.search) {
      params.search = filter.search;
    }

    dispatch(fetchSongsRequest(Object.keys(params).length > 0 ? params : undefined));
    dispatch(fetchStatsRequest());
  }, [dispatch, filter.genre, filter.search]);

  const genreOptions = useMemo(
    () =>
      Array.from(new Set(songs.map((song) => song.genre).filter(Boolean))).sort((left, right) =>
        left.localeCompare(right),
      ),
    [songs],
  );

  const handleFormSubmit = (data: SongFormData) => {
    if (editingSong) {
      dispatch(updateSongRequest({ id: editingSong._id, data }));
    } else {
      dispatch(createSongRequest(data));
    }

    setEditingSong(null);
  };

  const handleEditSong = (song: Song) => {
    setEditingSong(song);
  };

  const handleDeleteSong = (id: string) => {
    dispatch(deleteSongRequest(id));
  };

  const handleClearFilters = () => {
    dispatch(setFilter({ genre: '', search: '' }));
  };

  return (
    <AppShell>
      <Container>
        <Header>
          <Title><FiMusic aria-hidden="true" /> Song Manager</Title>
          <Subtitle>Track your collection, discover patterns, and manage your library from one place.</Subtitle>
        </Header>

        <ContentGrid>
          <Panel>
            <SectionHeader>{editingSong ? 'Edit song' : 'Add a song'}</SectionHeader>
            <SongForm
              key={editingSong ? editingSong._id : 'new-song'}
              initialValues={editingSong ?? undefined}
              isEditing={Boolean(editingSong)}
              onSubmit={handleFormSubmit}
              onCancel={() => setEditingSong(null)}
            />
          </Panel>

          <Panel>
            <SectionHeader>Library overview</SectionHeader>
            <Statistics stats={stats} />
          </Panel>
        </ContentGrid>

        <Panel>
          <SectionHeader>Search & filter</SectionHeader>
          <FilterBar
            search={filter.search}
            genre={filter.genre}
            genres={genreOptions}
            onSearchChange={(value) => dispatch(setFilter({ search: value }))}
            onGenreChange={(value) => dispatch(setFilter({ genre: value }))}
            onClear={handleClearFilters}
          />
        </Panel>

        <SongList
          songs={songs}
          loading={loading}
          error={error}
          onEdit={handleEditSong}
          onDelete={handleDeleteSong}
        />
      </Container>
    </AppShell>
  );
};

export default Layout;