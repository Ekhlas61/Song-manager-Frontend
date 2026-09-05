import styled from '@emotion/styled';
import { FiMusic } from 'react-icons/fi';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import heroImage from '../assets/hero.png';
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
import DeleteConfirmation from './DeleteConfirmation';
import SongForm from './SongForm';
import SongList from './SongList';
import Statistics from './Statistics';

const AppShell = styled.div({
  minHeight: '100vh',
  width: '100%',
  background: 'radial-gradient(circle at 15% 0%, rgba(99, 102, 241, 0.2), transparent 32%), #0f172a',
  color: '#f8fafc',
});

const Container = styled.main({
  width: '100%',
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '1rem 0.85rem 3rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  '@media (min-width: 768px)': { padding: '1.5rem 1.25rem 4rem', gap: '2rem' },
  '@media (min-width: 1280px)': { padding: '2rem 1.5rem 5rem' },
});

const Hero = styled.header<{ image: string }>(({ image }) => ({
  minHeight: '260px',
  display: 'flex',
  alignItems: 'flex-end',
  overflow: 'hidden',
  borderRadius: '24px',
  padding: '1.5rem',
  backgroundImage: `linear-gradient(90deg, rgba(5, 12, 32, 0.96) 0%, rgba(7, 17, 43, 0.76) 48%, rgba(7, 17, 43, 0.28) 100%), url(${image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  border: '1px solid rgba(125, 211, 252, 0.2)',
  boxShadow: '0 24px 55px rgba(4, 8, 24, 0.34)',
  '@media (min-width: 768px)': { minHeight: '320px', padding: '2.25rem' },
}));

const HeroContent = styled.div({ maxWidth: '610px' });
const HeroKicker = styled.span({
  display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.8rem',
  color: '#67e8f9', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase',
});
const Title = styled.h1({ margin: 0, fontSize: 'clamp(2.2rem, 6vw, 4.6rem)', fontWeight: 700, fontFamily: 'Poppins, sans-serif', lineHeight: 1, wordBreak: 'break-word' });
const Subtitle = styled.p({ marginTop: '1rem', color: '#dbeafe', fontSize: 'clamp(0.95rem, 2vw, 1.08rem)', lineHeight: 1.6, maxWidth: '560px' });
const Section = styled.section({ display: 'flex', flexDirection: 'column', gap: '1rem' });
const SectionHeading = styled.div({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' });
const SectionTitle = styled.h2({ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '0.01em' });
const SectionMeta = styled.span({ color: '#94a3b8', fontSize: '0.85rem' });
const Panel = styled.section({
  width: '100%', background: 'rgba(15, 23, 42, 0.66)', border: '1px solid rgba(148, 163, 184, 0.12)',
  borderRadius: '18px', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.3)', padding: '1rem', display: 'flex',
  flexDirection: 'column', gap: '1rem', scrollMarginTop: '1rem', '@media (min-width: 768px)': { padding: '1.25rem' },
});

const Layout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { songs, stats, loading, error, filter } = useSelector((state: RootState) => state.songs);
  const [editingSong, setEditingSong] = useState<Song | null>(null);
    const [deletingSong, setDeletingSong] = useState<Song | null>(null);
  const songFormRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (filter.genre) params.genre = filter.genre;
    if (filter.search) params.search = filter.search;
    dispatch(fetchSongsRequest(Object.keys(params).length > 0 ? params : undefined));
    dispatch(fetchStatsRequest());
  }, [dispatch, filter.genre, filter.search]);

  const genreOptions = useMemo(
    () => Array.from(new Set(songs.map((song) => song.genre).filter(Boolean))).sort((left, right) => left.localeCompare(right)),
    [songs],
  );

  const handleFormSubmit = (data: SongFormData) => {
    if (editingSong) dispatch(updateSongRequest({ id: editingSong._id, data }));
    else dispatch(createSongRequest(data));
    setEditingSong(null);
  };

  const handleEditSong = (song: Song) => {
    setEditingSong(song);
    requestAnimationFrame(() => songFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const handleClearFilters = () => dispatch(setFilter({ genre: '', search: '' }));

  const handleConfirmDelete = (id: string) => {
    dispatch(deleteSongRequest(id));
    setDeletingSong(null);
  };

  return (
    <AppShell>
      <Container>
        <Hero image={heroImage}>
          <HeroContent>
            <HeroKicker><FiMusic aria-hidden="true" /> Music library</HeroKicker>
            <Title>Song Manager</Title>
            <Subtitle>Track your collection, discover patterns, and manage your library from one place.</Subtitle>
          </HeroContent>
        </Hero>

        <Panel>
          <SectionHeading><SectionTitle>Search & filter</SectionTitle><SectionMeta>Find your next track</SectionMeta></SectionHeading>
          <FilterBar search={filter.search} genre={filter.genre} genres={genreOptions}
            onSearchChange={(value) => dispatch(setFilter({ search: value }))}
            onGenreChange={(value) => dispatch(setFilter({ genre: value }))} onClear={handleClearFilters} />
        </Panel>

        <Section>
          <SectionHeading><SectionTitle>Your Music Library</SectionTitle><SectionMeta>{songs.length} {songs.length === 1 ? 'song' : 'songs'}</SectionMeta></SectionHeading>
          <SongList songs={songs} loading={loading} error={error} onEdit={handleEditSong} onDelete={setDeletingSong} />
        </Section>

        <Section>
          <SectionHeading><SectionTitle>Library Overview</SectionTitle><SectionMeta>Collection at a glance</SectionMeta></SectionHeading>
          <Panel><Statistics stats={stats} /></Panel>
        </Section>

        <Panel ref={songFormRef}>
          <SectionHeading>
            <SectionTitle>{editingSong ? 'Edit Song' : 'Add a Song'}</SectionTitle>
            <SectionMeta>{editingSong ? `Editing: ${editingSong.title}` : 'Grow your collection'}</SectionMeta>
          </SectionHeading>
          <SongForm key={editingSong ? editingSong._id : 'new-song'} initialValues={editingSong ?? undefined}
            isEditing={Boolean(editingSong)} onSubmit={handleFormSubmit} onCancel={() => setEditingSong(null)} />
        </Panel>
      </Container>
      {deletingSong ? (
        <DeleteConfirmation song={deletingSong} onCancel={() => setDeletingSong(null)} onConfirm={handleConfirmDelete} />
      ) : null}
    </AppShell>
  );
};

export default Layout;
