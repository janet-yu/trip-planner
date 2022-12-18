import React from 'react';
import styled, { css } from 'styled-components';

/**
 * 1. Need to keep track of active step
 * 2. Need to have progress bars
 * 3. Need to account for mobile views (no progress bars shown, one step shown at a time)
 * 4. Make note of last form step, does not have progress bar
 */

const StepIndicator = styled.div<{ active?: any; completed?: boolean }>`
  border-radius: 100%;
  border: 2px solid ${(props) => props.theme.colors.primary['500']};
  padding: 15px;
  width: 15px;
  height: 15px;
  text-align: center;
  display: inline-block;
  color: ${(props) => props.theme.colors.primary['500']};

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
          color: ${props.theme.colors.primary['500']};
        `}
`;

const FormStep = (props: any) => {
  return (
    <li
      style={{
        flex: '1 0 auto',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <StepIndicator active={props.active} completed={props.completed}>
        <p style={{ margin: 0 }}>{props.stepNumber}</p>
      </StepIndicator>
      <p style={{ marginTop: '5px' }}>{props.label}</p>
    </li>
  );
};

export default FormStep;
