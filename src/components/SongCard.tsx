import styled from '@emotion/styled';
import { FiDisc, FiEdit2, FiMic, FiMusic, FiTrash2 } from 'react-icons/fi';
import type { Song } from '../features/songs/types';

type SongCardProps = {
  song: Song;
  onEdit: (song: Song) => void;
  onDelete: (song: Song) => void;
};

const Card = styled.article({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  minHeight: '245px',
  padding: '1.2rem',
  borderRadius: '18px',
  background: 'linear-gradient(145deg, rgba(31, 41, 67, 0.98), rgba(22, 32, 55, 0.98) 55%, rgba(35, 48, 77, 0.98))',
  border: '1px solid rgba(125, 211, 252, 0.22)',
  boxShadow: '0 14px 32px rgba(15, 23, 42, 0.28)',
  transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    borderColor: 'rgba(125, 211, 252, 0.58)',
    boxShadow: '0 20px 42px rgba(15, 23, 42, 0.42), 0 0 0 1px rgba(125, 211, 252, 0.08)',
  },
});

const Header = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.75rem',
});

const BadgeRow = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.75rem',
});

const MusicIcon = styled.span({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '42px',
  height: '42px',
  borderRadius: '14px',
  background: 'linear-gradient(135deg, #22d3ee, #38bdf8 48%, #818cf8)',
  color: '#082f49',
  boxShadow: '0 8px 18px rgba(34, 211, 238, 0.24)',
});

const TitleWrap = styled.div({
  minWidth: 0,
});

const Eyebrow = styled.span({
  display: 'block',
  marginBottom: '0.2rem',
  color: '#7dd3fc',
  fontSize: '0.66rem',
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
});

const HeaderGroup = styled.div({
  display: 'flex',
  alignItems: 'center',
  minWidth: 0,
});

const Title = styled.h3({
  fontSize: '1.1rem',
  lineHeight: 1.3,
  color: '#f8fbff',
  wordBreak: 'break-word',
  margin: 0,
});

const GenreTag = styled.span({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  padding: '0.35rem 0.7rem',
  borderRadius: '9999px',
  background: 'rgba(251, 191, 36, 0.14)',
  border: '1px solid rgba(251, 191, 36, 0.5)',
  color: '#fde68a',
  fontSize: '0.72rem',
  fontWeight: 600,
  maxWidth: '45%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const DetailList = styled.ul({
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.42rem',
  color: '#dbeafe',
  fontSize: '0.92rem',
  position: 'relative',
  zIndex: 1,
});

const DetailItem = styled.li({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.55rem',
  wordBreak: 'break-word',
  overflowWrap: 'anywhere',
});

const DetailIcon = styled.span({
  display: 'inline-flex',
  flexShrink: 0,
  marginTop: '0.15rem',
  color: '#67e8f9',
});

const Strong = styled.strong({
  color: '#f8fafc',
});

const Actions = styled.div({
  display: 'flex',
  gap: '0.65rem',
  marginTop: 'auto',
  flexWrap: 'wrap',
  position: 'relative',
  zIndex: 1,
});

const Button = styled.button<{ variant: 'secondary' | 'danger' }>(({ variant }) => ({
  flex: '1 1 120px',
  minHeight: '42px',
  borderRadius: '10px',
  border: variant === 'danger' ? '1px solid rgba(251, 113, 133, 0.38)' : '1px solid rgba(125, 211, 252, 0.28)',
  background: variant === 'danger' ? 'rgba(190, 24, 93, 0.16)' : 'rgba(14, 116, 144, 0.18)',
  color: variant === 'danger' ? '#fecdd3' : '#bae6fd',
  fontWeight: 600,
  padding: '0.7rem 0.9rem',
  transition: 'background 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
  '&:hover': {
    transform: 'translateY(-1px)',
    background: variant === 'danger' ? 'rgba(190, 24, 93, 0.28)' : 'rgba(14, 116, 144, 0.32)',
  },
}));

const SongCard = ({ song, onEdit, onDelete }: SongCardProps) => (
  <Card>
    <BadgeRow>
      <MusicIcon aria-hidden="true"><FiMusic size={21} /></MusicIcon>
      <GenreTag title={song.genre}>{song.genre}</GenreTag>
    </BadgeRow>

    <Header>
      <HeaderGroup>
        <TitleWrap>
          <Eyebrow>Now in your library</Eyebrow>
          <Title>{song.title}</Title>
        </TitleWrap>
      </HeaderGroup>
    </Header>

    <DetailList>
      <DetailItem>
        <DetailIcon aria-hidden="true"><FiMic size={16} /></DetailIcon>
        <span><Strong>Artist:</Strong> {song.artist}</span>
      </DetailItem>
      <DetailItem>
        <DetailIcon aria-hidden="true"><FiDisc size={16} /></DetailIcon>
        <span><Strong>Album:</Strong> {song.album}</span>
      </DetailItem>
    </DetailList>

    <Actions>
      <Button type="button" variant="secondary" onClick={() => onEdit(song)}>
        <FiEdit2 aria-hidden="true" /> Edit
      </Button>
      <Button type="button" variant="danger" onClick={() => onDelete(song)}>
        <FiTrash2 aria-hidden="true" /> Delete
      </Button>
    </Actions>
  </Card>
);

export default SongCard;