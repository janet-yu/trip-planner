import { css } from 'styled-components';

export const generateSpacingProps = (props: Partial<SpacingProps>) => {
  return css`
    ${props.mTop && `margin-top: ${props.mTop}px;`}
    ${props.mBottom && `margin-bottom: ${props.mBottom}px;`}
  ${props.my && `margin: ${props.my}px 0px;`}
  ${props.mx && `margin: 0px ${props.mx}px;`}
  ${props.mLeft && `margin: 0px 0px 0px ${props.mLeft}px;`}
  ${props.mRight && `margin: 0px ${props.mRight}px 0px 0px;`}

  ${props.p && `padding: ${props.p}px;`}
  ${props.px && `padding: 0px ${props.py}px;`}
  ${props.py && `padding: ${props.py}px 0px;`}
  ${props.pTop && `padding: ${props.pTop}px 0px 0px 0px;`}
  ${props.pBottom && `padding: 0px 0px ${props.pBottom}px 0px;`}
  ${props.pRight && `padding: 0px ${props.pRight}px 0px 0px;`}
  ${props.pLeft && `padding: 0px 0px 0px ${props.pLeft}px;`}
  `;
};

export type SpacingProps = {
  my?: number;
  mx?: number;
  mTop?: number;
  mBottom?: number;
  mLeft?: number;
  mRight?: number;
  p?: number;
  py?: number;
  px?: number;
  pTop?: number;
  pBottom?: number;
  pLeft?: number;
  pRight?: number;
};
