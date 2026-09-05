import styled from '@emotion/styled';

type FilterBarProps = {
  search: string;
  genre: string;
  genres: string[];
  onSearchChange: (value: string) => void;
  onGenreChange: (value: string) => void;
  onClear: () => void;
};

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.85rem',
  width: '100%',
  '@media (min-width: 768px)': {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
});

const Input = styled.input({
  width: '100%',
  minHeight: '46px',
  borderRadius: '10px',
  border: '1px solid rgba(148, 163, 184, 0.22)',
  background: 'rgba(15, 23, 42, 0.7)',
  color: '#f8fafc',
  padding: '0.8rem 0.95rem',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  '&:focus': {
    borderColor: '#818cf8',
    boxShadow: '0 0 0 3px rgba(129, 140, 248, 0.18)',
  },
  '::placeholder': {
    color: '#94a3b8',
  },
});

const Select = styled.select({
  width: '100%',
  minHeight: '46px',
  borderRadius: '10px',
  border: '1px solid rgba(148, 163, 184, 0.22)',
  background: 'rgba(15, 23, 42, 0.7)',
  color: '#f8fafc',
  padding: '0.8rem 0.95rem',
  outline: 'none',
  '&:focus': {
    borderColor: '#818cf8',
    boxShadow: '0 0 0 3px rgba(129, 140, 248, 0.18)',
  },
});

const Button = styled.button({
  minHeight: '46px',
  border: '1px solid rgba(148, 163, 184, 0.2)',
  borderRadius: '10px',
  background: 'rgba(99, 102, 241, 0.14)',
  color: '#e2e8f0',
  padding: '0.8rem 1rem',
  fontWeight: 600,
  transition: 'transform 0.2s ease, border-color 0.2s ease',
  '&:hover': {
    borderColor: 'rgba(129, 140, 248, 0.7)',
  },
  '@media (min-width: 768px)': {
    width: 'auto',
    minWidth: '120px',
  },
});

const FilterBar = ({
  search,
  genre,
  genres,
  onSearchChange,
  onGenreChange,
  onClear,
}: FilterBarProps) => (
  <Wrapper>
    <Input
      type="search"
      value={search}
      placeholder="Search songs, artists, or albums"
      onChange={(event) => onSearchChange(event.target.value)}
      aria-label="Search songs"
    />

    <Select
      value={genre}
      onChange={(event) => onGenreChange(event.target.value)}
      aria-label="Filter by genre"
    >
      <option value="">All genres</option>
      {genres.map((genreItem) => (
        <option key={genreItem} value={genreItem}>
          {genreItem}
        </option>
      ))}
    </Select>

    <Button type="button" onClick={onClear}>
      Clear
    </Button>
  </Wrapper>
);

export default FilterBar;