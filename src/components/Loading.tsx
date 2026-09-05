import styled from '@emotion/styled';

const LoadingContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.75rem',
  minHeight: '120px',
  color: '#cbd5e1',
  fontSize: '0.95rem',
  textAlign: 'center',
});

const Spinner = styled.div({
  width: '18px',
  height: '18px',
  border: '2px solid rgba(148, 163, 184, 0.35)',
  borderTopColor: '#8b5cf6',
  borderRadius: '50%',
  animation: 'spin 0.75s linear infinite',
});

const Loading = ({ label = 'Loading...' }: { label?: string }) => (
  <LoadingContainer>
    <Spinner aria-label="loading" />
    <span>{label}</span>
  </LoadingContainer>
);

export default Loading;