import React from 'react';
import styled, { keyframes } from 'styled-components';

const spinningAnimation = keyframes`
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerDiv = styled.div<{ size: number }>`
  width: ${(props) => (props.size ? props.size : 24)}px;
  height: ${(props) => (props.size ? props.size : 24)}px;
  border-radius: 100%;
  border: 10px solid black;
  border-color: ${(props) => props.theme.colors.primary[400]} transparent
    ${(props) => props.theme.colors.primary[400]} transparent;
  animation: ${spinningAnimation} 1.2s linear infinite;
`;

const Spinner = ({ size }: { size: number }) => {
  return <SpinnerDiv size={size}></SpinnerDiv>;
};

export default Spinner;
