import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primaryPurple: '#6974D4',
    paleYellow: '#FFF5C1',
    grey: '#515151',
  },
};

const Theme = ({ children }) => {
  <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export { Theme, theme };
