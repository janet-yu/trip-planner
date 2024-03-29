import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type CardProps = {
  backgroundImageUrl?: string;
  textPosition?: 'center' | 'bottomLeft';
  children: any;
  link?: string;
};

type StyledDivProps = {
  backgroundImageUrl?: string;
  textPosition?: string;
};

const StyledLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

// todo: search up typescript syntax
const StyledDiv = styled.div<StyledDivProps>`
  border-radius: 24px;
  ${(props) =>
    props.backgroundImageUrl && `background: url(${props.backgroundImageUrl});`}
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: ${(props) =>
    props.textPosition === 'center' ? 'center' : 'flex-start'};
  justify-content: ${(props) =>
    props.textPosition === 'center' ? 'center' : 'flex-end'};
  min-height: 248px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 0;
  }
`;

/**
 * Need onclick handler
 * @param props
 */
const Card = (props: CardProps) => {
  return (
    <StyledDiv
      backgroundImageUrl={props.backgroundImageUrl}
      textPosition={props.textPosition}
    >
      {props.link && <StyledLink to={props.link} />}
      {props.children}
    </StyledDiv>
  );
};

export default Card;
