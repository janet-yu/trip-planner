import React from 'react';
import FormStep from '../components/FormProgressHeader/FormStep';

export default {
  title: 'FormStep',
  component: FormStep,
};

export const ActiveFormStep = () => (
  <FormStep active={true} label={'City'} stepNumber={1} />
);

export const InactiveFormStep = () => (
  <FormStep active={false} label={'City'} stepNumber={1} />
);