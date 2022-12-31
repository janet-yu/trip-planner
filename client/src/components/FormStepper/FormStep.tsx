import React from 'react';
import styled, { css } from 'styled-components';
import { device } from '../../utils/mediaQueries';

const StepIndicator = styled.div<{ active?: any; completed?: boolean }>`
  border-radius: 100%;
  border: 2px solid ${(props) => props.theme.colors.primary['500']};
  padding: 15px;
  width: 15px;
  height: 15px;
  text-align: center;
  display: inline-block;
  transition: background 0.5s ease-in;

  ${(props) =>
    props.active || props.completed
      ? css`
          background: ${props.theme.colors.primary['500']};
          color: white;
        `
      : css`
          background: white;
          border-color: #aaa;
          color: #aaa;
          color: ${props.theme.colors.grey['500']};
        `}
`;

const Step = styled.li<{ active: boolean }>`
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  display: ${(props) => (props.active ? 'flex' : 'none')};

  @media ${device.mobileL} {
    display: flex;
  }
`;

const FormStep = (props: any) => {
  return (
    <Step active={props.active}>
      <StepIndicator active={props.active} completed={props.completed}>
        <p style={{ margin: 0 }}>{props.stepNumber}</p>
      </StepIndicator>
      <p style={{ marginTop: '5px' }}>{props.label}</p>
    </Step>
  );
};

export default FormStep;
