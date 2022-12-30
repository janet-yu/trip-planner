import React, { useState } from 'react';
import styled from 'styled-components';
import FormStepper from '../../../components/FormStepper';
import WhereForm from './WhereForm';
import WhenForm from './WhenForm';
import { Formik } from 'formik';
import Button from '../../../components/Button';

const FormContainer = styled.div`
  background-color: #f7f7fb;
  border-radius: 18px;
`;

const Form = styled.form`
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export type FormState = {
  place: {
    id: string;
    value: string;
  };
  startDate: Date | null;
  endDate: Date | null;
};

const PlanTripForm = (props: any) => {
  const formSteps = [
    {
      label: 'Where?',
    },
    {
      label: 'When?',
    },
    // {
    //   label: 'Who?',
    // },
  ];
  const initialState = {
    place: {
      id: '',
      value: '',
    },
    startDate: null,
    endDate: null,
  };
  // @todo: create initial form state
  const [currentStep, setCurrentStep] = useState(0);
  const isLastStep = currentStep === formSteps.length - 1;

  const handleSubmitData = (values: any) => {
    console.log('submit data');
  };

  const handleNextStep = () => {
    setCurrentStep((currentStep) => currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep === 0) {
      return;
    }

    setCurrentStep((currentStep) => currentStep - 1);
  };

  const renderCurrentStep = (
    formValues: FormState,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    switch (currentStep) {
      case 0:
        return (
          <WhereForm formValues={formValues} setFieldValue={setFieldValue} />
        );
      case 1:
        return (
          <WhenForm
            handleNextStep={handleNextStep}
            setFieldValue={setFieldValue}
          />
        );
    }
  };

  return (
    <FormContainer>
      <FormStepper steps={formSteps} activeStep={currentStep} />
      <Formik
        initialValues={initialState}
        onSubmit={(values) => {
          if (isLastStep) {
            handleSubmitData(values);
          } else {
            handleNextStep();
          }
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <Form onSubmit={handleSubmit}>
            {renderCurrentStep(values, setFieldValue)}
            <Button
              variant="primary"
              type="submit"
              style={{
                alignSelf: 'center',
                margin: '1rem',
              }}
            >
              Continue
            </Button>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default PlanTripForm;
