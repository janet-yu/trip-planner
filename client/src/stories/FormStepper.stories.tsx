import React from 'react';
import FormStepperComponent from '../components/FormStepper';

export default {
  title: 'FormStepper',
  component: FormStepperComponent,
};

export const FormStepper = () => {
  const steps = [
    {
      label: 'Where to?',
    },
    {
      label: 'Dates',
    },
    {
      label: 'Who?',
    },
    {
      label: 'How?',
    },
  ];
  return <FormStepperComponent steps={steps} activeStep={2} />;
};
