import styled, { css } from 'styled-components';
import { SpacingProps, generateSpacingProps } from '../utils';

type BoxProps = {
  display?: string;
  justifyContent?: string;
  alignItems?: string;
  flexDirection?: 'column' | 'row';
} & SpacingProps;

const Box = styled.div<BoxProps>`
  display: ${(props) => (props.display ? props.display : 'block')};
  ${(props) =>
    props.display === 'flex' &&
    css`
      display: flex;
      ${props.justifyContent && `justify-content: ${props.justifyContent};`}
      ${props.alignItems && `align-items: ${props.alignItems};`}
      ${props.flexDirection && `flex-direction: ${props.flexDirection};`}
    `}
  ${(props) => generateSpacingProps(props)}
`;

export default Box;
