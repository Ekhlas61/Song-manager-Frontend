import styled from '@emotion/styled';
import { FiMusic } from 'react-icons/fi';
import type { Song } from '../features/songs/types';
import Loading from './Loading';
import SongCard from './SongCard';

type SongListProps = {
  songs: Song[];
  loading: boolean;
  error: string | null;
  onEdit: (song: Song) => void;
  onDelete: (id: string) => void;
};

const Section = styled.section({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const Grid = styled.div({
  display: 'grid',
  gap: '1rem',
  gridTemplateColumns: '1fr',
  '@media (min-width: 640px)': {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
  '@media (min-width: 1024px)': {
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  },
});

const EmptyState = styled.div({
  borderRadius: '16px',
  border: '1px dashed rgba(148, 163, 184, 0.3)',
  background: 'rgba(15, 23, 42, 0.55)',
  color: '#cbd5e1',
  padding: '1.5rem',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.6rem',
});

const ErrorBox = styled.div({
  borderRadius: '12px',
  background: 'rgba(239, 68, 68, 0.12)',
  border: '1px solid rgba(239, 68, 68, 0.35)',
  color: '#fecaca',
  padding: '1rem',
});

const SongList = ({ songs, loading, error, onEdit, onDelete }: SongListProps) => {
  if (loading && songs.length === 0) {
    return (
      <Section>
        <Loading label="Loading songs..." />
      </Section>
    );
  }

  if (error) {
    return (
      <Section>
        <ErrorBox>{error}</ErrorBox>
      </Section>
    );
  }

  if (songs.length === 0) {
    return (
      <Section>
        <EmptyState><FiMusic aria-hidden="true" /> No songs match the current filters.</EmptyState>
      </Section>
    );
  }

  return (
    <Section>
      <Grid>
        {songs.map((song) => (
          <SongCard key={song._id} song={song} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </Grid>
    </Section>
  );
};

export default SongList;