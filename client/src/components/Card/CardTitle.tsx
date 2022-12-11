import React from 'react';
import styled from 'styled-components';

type CardTitleProps = {
  size?: 'large' | 'small';
  children: any;
};

// Add defaults?
const StyledH3 = styled.h3<{ size?: string }>`
  font-size: ${(props) => (props.size === 'large' ? '2em' : '1.2em')};
  margin: 0;
`;

const CardTitle = (props: CardTitleProps) => {
  return <StyledH3 size={props.size}>{props.children}</StyledH3>;
};

export default CardTitle;
