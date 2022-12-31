import React from 'react';
import styled from 'styled-components';
import FormStep from './FormStep';
import { device } from '../../utils/mediaQueries';

const Header = styled.nav<{ stepCount: number }>`
  padding: 1em;
  display: grid;
  grid-template-columns: repeat(${(props) => props.stepCount * 2}, 1fr);
  position: relative;
`;

const ProgressBarWrapper = styled.div<{ stepCount: number }>`
  height: 3px;
  background-color: #eee;
  grid-column: 2 / ${(props) => props.stepCount * 2};
  grid-row: 1 / -1;
  top: 1.5rem;
  position: relative;
  display: none;

  @media ${device.mobileL} {
    display: block;
  }
`;

const ProgressBar = styled.div<{ stepCount: number; activeStep: number }>`
  width: calc(
    100% / ${(props) => props.stepCount - 1} * ${(props) => props.activeStep}
  );
  height: 3px;
  transition: width 0.5s ease-in;
  background-color: ${(props) => props.theme.colors.primary['800']};
`;

type FormProgressHeaderProps = {
  steps: {
    label: string;
  }[];
  activeStep: number;
};

/**
 *
 * @param props
 */

// Shoutout to https://www.telerik.com/kendo-react-ui/components/form/multi-step-form/
// for help!
const FormStepper = (props: FormProgressHeaderProps) => {
  return (
    <Header stepCount={props.steps.length}>
      <ol
        style={{
          gridColumn: '1 / -1',
          display: 'flex',
          position: 'relative',
          zIndex: '1',
        }}
      >
        {props.steps.map((step, idx) => (
          <FormStep
            active={props.activeStep === idx}
            completed={props.activeStep > idx}
            label={step.label}
            stepNumber={idx + 1}
            key={idx}
          />
        ))}
      </ol>
      <ProgressBarWrapper stepCount={props.steps.length}>
        <ProgressBar
          stepCount={props.steps.length}
          activeStep={props.activeStep}
        ></ProgressBar>
      </ProgressBarWrapper>
    </Header>
  );
};

export default FormStepper;
