import styled from 'styled-components';
import { SpacingProps, generateSpacingProps } from '../utils';

type BoxProps = {
  display?: string;
} & SpacingProps;

const Box = styled.div<BoxProps>`
  ${(props) => generateSpacingProps(props)}
`;

export default Box;
