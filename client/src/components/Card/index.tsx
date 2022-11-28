import React from 'react';
import styled, { css } from 'styled-components';

type CardProps = {
  cardTitle: string;
  cardSubtitle?: string;
  textPosition?: 'bottomLeft' | 'center';
  subtitlePosition?: 'top' | 'bottom';
  backgroundImageUrl?: string;
  titleSize?: 'small' | 'large';
  subtitleSize?: 'small' | 'large';
};

type StyledDivProps = {
  backgroundImageUrl?: string;
  textPosition?: string;
};

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
  text-align: ${(props) =>
    props.textPosition === 'center' ? 'center' : 'left'};
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

const StyledH3 = styled.h3<{ titleSize: string }>`
  font-size: ${(props) => (props.titleSize === 'large' ? '2em' : '1.2em')};
  margin: 0;
`;

// research stacking context again
const TextContainer = styled.div`
  margin: 1em 1em 1.5em 1.5em;
  color: #fff;
  position: relative;
  z-index: 1;
  font-family: 'Nunito', sans-serif;
`;

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
      <TextContainer>
        {props.subtitlePosition === 'top' && props.cardSubtitle && (
          <SubtitleText position={props.subtitlePosition}>
            {props.cardSubtitle}
          </SubtitleText>
        )}
        <StyledH3 titleSize={props.titleSize}>{props.cardTitle}</StyledH3>
        {(props.subtitlePosition === 'bottom' || !props.subtitlePosition) && (
          <SubtitleText position={props.subtitlePosition}>
            {props.cardSubtitle}
          </SubtitleText>
        )}
      </TextContainer>
    </StyledDiv>
  );
};

export default Card;
