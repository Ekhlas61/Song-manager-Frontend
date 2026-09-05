import styled from '@emotion/styled';
import type { Statistics as StatisticsType } from '../features/songs/types';

type StatisticsProps = {
  stats: StatisticsType | null;
};

const Section = styled.section({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
});

const OverviewGrid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '0.85rem',
  '@media (min-width: 768px)': {
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  },
});

const StatCard = styled.div({
  borderRadius: '14px',
  background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.92), rgba(15, 23, 42, 0.96))',
  border: '1px solid rgba(148, 163, 184, 0.16)',
  padding: '0.9rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  minHeight: '110px',
});

const Label = styled.span({
  fontSize: '0.78rem',
  fontWeight: 600,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: '#94a3b8',
});

const Value = styled.strong({
  fontSize: '1.7rem',
  color: '#f8fafc',
  lineHeight: 1.1,
});

const Panel = styled.div({
  borderRadius: '16px',
  background: 'rgba(15, 23, 42, 0.72)',
  border: '1px solid rgba(148, 163, 184, 0.16)',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

const DetailGrid = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1rem',
  '@media (min-width: 768px)': {
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  },
});

const List = styled.ul({
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.55rem',
  color: '#e2e8f0',
  fontSize: '0.9rem',
});

const ListItem = styled.li({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '0.75rem',
  padding: '0.5rem 0.6rem',
  borderRadius: '10px',
  background: 'rgba(30, 41, 59, 0.7)',
  overflowWrap: 'anywhere',
  '& > span': {
    minWidth: 0,
  },
  '& > strong': {
    flexShrink: 0,
    textAlign: 'right',
  },
});

const EmptyPanel = styled.div({
  padding: '1rem',
  borderRadius: '12px',
  background: 'rgba(15, 23, 42, 0.72)',
  border: '1px solid rgba(148, 163, 184, 0.18)',
  color: '#cbd5e1',
});

const Statistics = ({ stats }: StatisticsProps) => {
  if (!stats) {
    return (
      <Section>
        <EmptyPanel>No statistics available yet.</EmptyPanel>
      </Section>
    );
  }

  const overviewStats = [
    { label: 'Songs', value: stats.overview.totalSongs },
    { label: 'Artists', value: stats.overview.totalArtists },
    { label: 'Albums', value: stats.overview.totalAlbums },
    { label: 'Genres', value: stats.overview.totalGenres },
  ];

  return (
    <Section>
      <OverviewGrid>
        {overviewStats.map((item) => (
          <StatCard key={item.label}>
            <Label>{item.label}</Label>
            <Value>{item.value}</Value>
          </StatCard>
        ))}
      </OverviewGrid>

      <DetailGrid>
        <Panel>
          <h3>Songs by Genre</h3>
          <List>
            {stats.songsPerGenre.map((genre) => (
              <ListItem key={genre._id}><span>{genre._id}</span><strong>{genre.count}</strong></ListItem>
            ))}
          </List>
        </Panel>

        <Panel>
          <h3>Artist Statistics</h3>
          <List>
            {stats.artistStats.map((artist) => (
              <ListItem key={artist.artist}>
                <span>{artist.artist}</span>
                <strong>{artist.songCount} songs / {artist.albumCount} albums</strong>
              </ListItem>
            ))}
          </List>
        </Panel>

        <Panel>
          <h3>Songs by Album</h3>
          <List>
            {stats.songsPerAlbum.map((album) => (
              <ListItem key={`${album._id.artist}-${album._id.album}`}>
                <span>{album._id.album}</span><strong>{album.count}</strong>
              </ListItem>
            ))}
          </List>
        </Panel>
      </DetailGrid>
    </Section>
  );
};

export default Statistics;