import React from 'react';
import FormStep from '../components/FormStepper/FormStep';

export default {
  title: 'FormStep',
  component: FormStep,
};

export const ActiveFormStep = () => (
  <FormStep active={true} label={'City'} stepNumber={1} completed={false} />
);

export const InactiveFormStep = () => (
  <FormStep active={false} label={'City'} stepNumber={1} completed={false} />
);
