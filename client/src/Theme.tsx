import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: {
      [50]: '#E9EBFB',
      [300]: '#7D88E9',
      [400]: '#5F6CE3',
      [500]: '#4150DC',
      [800]: '#2931B9',
    },
    accent: '#FFF5C1',
    grey: {
      [50]: '#F5F6F6',
      [100]: '#D6D9E1',
      [200]: '#B2BACD',
      [300]: '#9BA2B4',
      [400]: '#7F8AA4',
      [500]: '#697693',
      [700]: '#4A546B',
      [800]: '#3A4255',
    },
  },
};

const Theme = ({ children }: { children: JSX.Element }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export { Theme, theme };
