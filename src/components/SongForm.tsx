import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import styled from '@emotion/styled';
import type { SongFormData } from '../features/songs/types';

type SongFormProps = {
  initialValues?: Partial<SongFormData>;
  onSubmit: (data: SongFormData) => void;
  onCancel?: () => void;
  isEditing?: boolean;
};

const emptyValues: SongFormData = {
  title: '',
  artist: '',
  album: '',
  genre: '',
};

const Form = styled.form({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.9rem',
  width: '100%',
});

const FieldGroup = styled.div({
  display: 'grid',
  gap: '0.75rem',
  '@media (min-width: 640px)': {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
});

const Label = styled.label({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.45rem',
  fontSize: '0.82rem',
  fontWeight: 600,
  color: '#cbd5e1',
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
  '&:focus': {
    borderColor: '#818cf8',
    boxShadow: '0 0 0 3px rgba(129, 140, 248, 0.18)',
  },
});

const Actions = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  marginTop: '0.25rem',
  '@media (min-width: 480px)': {
    flexDirection: 'row',
  },
});

const SubmitButton = styled.button({
  flex: 1,
  minHeight: '46px',
  border: 'none',
  borderRadius: '10px',
  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  color: '#f8fafc',
  fontWeight: 700,
  padding: '0.85rem 1.1rem',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 8px 18px rgba(99, 102, 241, 0.28)',
  },
});

const CancelButton = styled.button({
  flex: 1,
  minHeight: '46px',
  borderRadius: '10px',
  border: '1px solid rgba(148, 163, 184, 0.25)',
  background: 'rgba(15, 23, 42, 0.7)',
  color: '#e2e8f0',
  fontWeight: 600,
  padding: '0.85rem 1.1rem',
});

const SongForm = ({
  initialValues,
  onSubmit,
  onCancel,
  isEditing = false,
}: SongFormProps) => {
  const [formData, setFormData] = useState<SongFormData>(
    initialValues ? { ...emptyValues, ...initialValues } : emptyValues,
  );

  const handleChange =
    (field: keyof SongFormData) => (event: ChangeEvent<HTMLInputElement>) => {
      setFormData((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: SongFormData = {
      title: formData.title.trim(),
      artist: formData.artist.trim(),
      album: formData.album.trim(),
      genre: formData.genre.trim(),
    };

    if (!payload.title || !payload.artist || !payload.album || !payload.genre) {
      return;
    }

    onSubmit(payload);
    setFormData(emptyValues);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FieldGroup>
        <Label>
          Title
          <Input
            type="text"
            value={formData.title}
            onChange={handleChange('title')}
            placeholder="Song title"
            required
          />
        </Label>

        <Label>
          Artist
          <Input
            type="text"
            value={formData.artist}
            onChange={handleChange('artist')}
            placeholder="Artist"
            required
          />
        </Label>
      </FieldGroup>

      <FieldGroup>
        <Label>
          Album
          <Input
            type="text"
            value={formData.album}
            onChange={handleChange('album')}
            placeholder="Album"
            required
          />
        </Label>

        <Label>
          Genre
          <Input
            type="text"
            value={formData.genre}
            onChange={handleChange('genre')}
            placeholder="Genre"
            required
          />
        </Label>
      </FieldGroup>

      <Actions>
        <SubmitButton type="submit">{isEditing ? 'Update Song' : 'Add Song'}</SubmitButton>
        {isEditing && onCancel ? (
          <CancelButton type="button" onClick={onCancel}>
            Cancel
          </CancelButton>
        ) : null}
      </Actions>
    </Form>
  );
};

export default SongForm;