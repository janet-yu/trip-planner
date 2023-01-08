import { css } from 'styled-components';

export const generateSpacingProps = (props: Partial<SpacingProps>) => {
  return css`
    ${props.mTop && `margin-top: ${props.mTop}px;`}
    ${props.mBottom && `margin-bottom: ${props.mBottom}px;`}
  ${props.my && `margin: ${props.my}px 0px;`}
  ${props.mx && `margin: 0px ${props.mx}px;`}
  ${props.mLeft && `margin: 0px 0px 0px ${props.mLeft}px;`}
  ${props.mRight && `margin: 0px ${props.mRight}px 0px 0px;`}
  `;
};

export type SpacingProps = {
  my?: number;
  mx?: number;
  mTop?: number;
  mBottom?: number;
  mLeft?: number;
  mRight?: number;
};
