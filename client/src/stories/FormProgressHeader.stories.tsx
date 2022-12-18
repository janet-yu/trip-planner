import React from 'react';
import FormStep from '../components/FormProgressHeader/FormStep';
import { default as FormStepProgressHeaderComponent } from '../components/FormProgressHeader';

export default {
  title: 'FormStepProgressHeader',
  component: FormStepProgressHeaderComponent,
  subcomponents: [FormStep],
};

export const FormStepProgressHeader = () => {
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
  return <FormStepProgressHeaderComponent steps={steps} activeStep={2} />;
};
