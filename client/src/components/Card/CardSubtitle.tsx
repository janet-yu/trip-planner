import React from 'react';
import styled, { css } from 'styled-components';

type CardSubtitleProps = {
  position?: 'bottom' | 'top';
  children: any;
};

const SubtitleText = styled.h4<{ position?: string }>`
  ${(props) =>
    (props.position === 'bottom' || !props.position) &&
    css`
      margin: 0 0 0 0;
    `}

  ${(props) =>
    props.position === 'top' &&
    css`
      margin: 0 0 4px 0;
    `}
`;

const CardSubtitle = (props: CardSubtitleProps) => {
  return (
    <SubtitleText position={props.position}>{props.children}</SubtitleText>
  );
};

export default CardSubtitle;
