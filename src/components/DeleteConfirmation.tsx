import { useEffect, useRef } from 'react';
import { FiAlertTriangle, FiX } from 'react-icons/fi';
import styled from '@emotion/styled';
import type { Song } from '../features/songs/types';

type DeleteConfirmationProps = {
  song: Song;
  onCancel: () => void;
  onConfirm: (id: string) => void;
};

const Backdrop = styled.div({
  position: 'fixed',
  inset: 0,
  zIndex: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
  background: 'rgba(2, 6, 23, 0.72)',
  backdropFilter: 'blur(5px)',
});

const Dialog = styled.div({
  width: '100%',
  maxWidth: '440px',
  borderRadius: '20px',
  border: '1px solid rgba(251, 113, 133, 0.28)',
  background: 'linear-gradient(145deg, rgba(31, 41, 67, 0.99), rgba(15, 23, 42, 0.99))',
  boxShadow: '0 24px 70px rgba(2, 6, 23, 0.55)',
  padding: '1.25rem',
  '@media (min-width: 480px)': {
    padding: '1.5rem',
  },
});

const Header = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '1rem',
});

const HeadingGroup = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.8rem',
});

const WarningIcon = styled.span({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '40px',
  height: '40px',
  borderRadius: '12px',
  background: 'rgba(251, 113, 133, 0.14)',
  color: '#fda4af',
});

const Heading = styled.h2({
  margin: '0.15rem 0 0',
  color: '#f8fafc',
  fontSize: '1.2rem',
  lineHeight: 1.25,
});

const CloseButton = styled.button({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '36px',
  height: '36px',
  border: '1px solid rgba(148, 163, 184, 0.2)',
  borderRadius: '10px',
  background: 'rgba(15, 23, 42, 0.55)',
  color: '#cbd5e1',
});

const Message = styled.p({
  margin: '1.25rem 0',
  color: '#dbeafe',
  fontSize: '0.95rem',
  lineHeight: 1.6,
  overflowWrap: 'anywhere',
});

const SongName = styled.strong({
  color: '#f8fafc',
});

const Actions = styled.div({
  display: 'flex',
  flexDirection: 'column-reverse',
  gap: '0.7rem',
  '@media (min-width: 420px)': {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

const ActionButton = styled.button<{ danger?: boolean }>(({ danger = false }) => ({
  minHeight: '44px',
  flex: '1 1 auto',
  borderRadius: '10px',
  border: danger ? '1px solid rgba(251, 113, 133, 0.48)' : '1px solid rgba(148, 163, 184, 0.25)',
  background: danger ? 'linear-gradient(135deg, #be123c, #e11d48)' : 'rgba(15, 23, 42, 0.7)',
  color: danger ? '#fff1f2' : '#e2e8f0',
  fontWeight: 700,
  padding: '0.7rem 1rem',
}));

const DeleteConfirmation = ({ song, onCancel, onConfirm }: DeleteConfirmationProps) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cancelButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  return (
    <Backdrop onMouseDown={(event) => event.target === event.currentTarget && onCancel()}>
      <Dialog role="alertdialog" aria-modal="true" aria-labelledby="delete-song-title" aria-describedby="delete-song-message">
        <Header>
          <HeadingGroup>
            <WarningIcon aria-hidden="true"><FiAlertTriangle size={20} /></WarningIcon>
            <Heading id="delete-song-title">Delete song?</Heading>
          </HeadingGroup>
          <CloseButton type="button" aria-label="Close delete confirmation" onClick={onCancel}>
            <FiX aria-hidden="true" size={18} />
          </CloseButton>
        </Header>
        <Message id="delete-song-message">
          Are you sure you want to delete <SongName>&quot;{song.title}&quot;</SongName>? This action cannot be undone.
        </Message>
        <Actions>
          <ActionButton ref={cancelButtonRef} type="button" onClick={onCancel}>Cancel</ActionButton>
          <ActionButton type="button" danger onClick={() => onConfirm(song._id)}>Delete</ActionButton>
        </Actions>
      </Dialog>
    </Backdrop>
  );
};

export default DeleteConfirmation;
