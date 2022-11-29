import React from 'react';
import styled from 'styled-components';

type CardTextAreaProps = {
  textAlign?: 'center' | 'left' | 'right';
  children: any;
};

const TextContainer = styled.div<{ textAlign: string }>`
  margin: 1em 1em 1.5em 1.5em;
  color: #fff;
  position: relative;
  z-index: 1;
  font-family: 'Nunito', sans-serif;
  text-align: ${(props) => props.textAlign || 'left'};
`;

const CardTextArea = (props: CardTextAreaProps) => {
  return (
    <TextContainer textAlign={props.textAlign}>{props.children}</TextContainer>
  );
};

export default CardTextArea;
