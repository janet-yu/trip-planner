import React from 'react';
import styled, { css } from 'styled-components';
import { device } from '../../utils/mediaQueries';

const StepIndicator = styled.div<{ active?: any; completed?: boolean }>`
  border-radius: 100%;
  border: 2px solid ${(props) => props.theme.colors.primary['500']};
  padding: 15px;
  width: 12px;
  height: 12px;
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
          border-color: ${props.theme.colors.grey['200']};
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

const Label = styled.p<{ active: boolean; completed: boolean }>`
  margin-top: 10px;
  color: ${(props) =>
    props.active || props.completed
      ? props.theme.colors.primary['500']
      : props.theme.colors.grey['400']};
  font-weight: ${(props) => (props.active ? 'bold' : 'regular')};
`;

type FormStepProps = {
  active: boolean;
  stepNumber: number;
  completed: boolean;
  label: string;
};

const FormStep = (props: FormStepProps) => {
  return (
    <Step active={props.active}>
      <StepIndicator active={props.active} completed={props.completed}>
        <p>{props.stepNumber}</p>
      </StepIndicator>
      <Label active={props.active} completed={props.completed}>
        {props.label}
      </Label>
    </Step>
  );
};

export default FormStep;
