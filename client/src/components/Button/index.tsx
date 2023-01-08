import React, { MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';
import { generateSpacingProps, SpacingProps } from '../utils';

// @todo: refactor how selected buttons are rendered?
const variantStyles = (
  variant: 'primary' | 'secondary' | 'selected',
  bold: boolean
) => {
  if (variant === 'primary' || variant === 'selected') {
    return css`
      background-color: ${(props) => props.theme.colors.primary['500']};
      border: 1px solid transparent;
      color: #fff;
      font-weight: bold;
      &:hover {
        background-color: ${(props) => props.theme.colors.primary['400']};
      }
    `;
  }

  return css`
    background-color: transparent;
    border: ${bold ? '4px' : '1px'} solid
      ${(props) => props.theme.colors.grey['500']};
    color: ${(props) => props.theme.colors.grey['500']};
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

  ${(props) => variantStyles(props.variant, props.bold || false)}
  ${(props) => generateSpacingProps(props)}
`;

type ButtonProps = {
  onClick?: MouseEventHandler;
  variant: 'primary' | 'secondary' | 'selected';
  bold?: boolean;
  children?: any;
} & SpacingProps;

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
