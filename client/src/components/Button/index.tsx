import React, { MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';

// @todo: refactor how selected buttons are rendered?
const variantStyles = (variant: 'primary' | 'secondary' | 'selected') => {
  if (variant === 'primary' || variant === 'selected') {
    return css`
      background-color: ${(props) => props.theme.colors.primaryPurple};
      border: 1px solid transparent;
      color: #fff;
      font-weight: bold;
      &:hover {
        background-color: #5d67c7;
      }
    `;
  }

  return css`
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.colors.grey};
    color: ${(props) => props.theme.colors.grey};
  `;
};

const StyledButton = styled.button<ButtonProps>`
  border-radius: 50px;
  padding: 1em;
  min-width: 150px;
  transition: all 0.2s ease-in;
  &:hover {
    cursor: pointer;
  }
  ${(props) => variantStyles(props.variant)}
  ${(props) => props.mTop && `margin-top: ${props.my}px;`}
  ${(props) => props.mBottom && `margin-bottom: ${props.my}px;`}
  ${(props) => props.my && `margin: ${props.my}px 0px;`}
  ${(props) => props.mx && `margin: 0px ${props.mx}px;`}
`;

type ButtonProps = {
  onClick: MouseEventHandler;
  variant: 'primary' | 'secondary' | 'selected';
  children?: any;
  my?: number;
  mx?: number;
  mTop?: number;
  mBottom?: number;
  mLeft?: number;
  mRight?: number;
};

// Don't use React.HTMLProps<HTMLButtonElement> lol
// https://github.com/typescript-cheatsheets/react/issues/128
const Button = (
  props: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { onClick, variant, children, ...rest } = props;

  return (
    <StyledButton onClick={onClick} variant={variant} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
