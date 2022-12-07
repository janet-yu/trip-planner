import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primaryPurple: '#4150DC',
    paleYellow: '#FFF5C1',
    grey: '#515151',
  },
};

const Theme = ({ children }: { children: JSX.Element }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export { Theme, theme };
