import { Global, css } from '@emotion/react';
import { theme } from './theme';

export const GlobalStyles = () => (
  <Global
    styles={css`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap');

      :root {
        color: ${theme.colors.text};
        background: ${theme.colors.background};
        font-family: ${theme.fonts.body};
        line-height: 1.5;
        font-weight: 400;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      html {
        background: ${theme.colors.background};
      }

      body {
        min-height: 100vh;
        background: ${theme.colors.background};
        color: ${theme.colors.text};
        overflow-x: hidden;
      }

      img {
        max-width: 100%;
        display: block;
      }

      button,
      input,
      select {
        font: inherit;
      }

      button {
        cursor: pointer;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      ::selection {
        background: rgba(99, 102, 241, 0.35);
      }
    `}
  />
);