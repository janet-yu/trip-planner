import React, { useState } from 'react';
import styled from 'styled-components';
import FormStepper from '../../../components/FormStepper';
import WhereForm from './WhereForm';
import WhenForm from './WhenForm';
import { Formik } from 'formik';
import Button from '../../../components/Button';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useAuth from '../../../hooks/useAuth';

const FormContainer = styled.div`
  background-color: #f7f7fb;
  border-radius: 18px;
  padding: 2rem;
`;

const Form = styled.form`
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export type FormState = {
  place: {
    id: string;
    value: string;
  };
  startDate: Date | null;
  endDate: Date | null;
};

const whereFormSchema = Yup.object({
  place: Yup.object({
    id: Yup.string().required(),
    value: Yup.string().required('Please select a location'),
  }),
});

const whenFormSchema = Yup.object({
  startDate: Yup.date().required(),
  endDate: Yup.date().required(),
});

const validationSchemas = [whereFormSchema, whenFormSchema];

const PlanTripForm = () => {
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
  const [currentStep, setCurrentStep] = useState(0);
  const {
    auth: { user },
  } = useAuth();
  const isLastStep = currentStep === formSteps.length - 1;
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const handleSubmitData = async (values: any) => {
    const data = {
      title: values.place.value,
      placeReferenceId: values.place.id,
      startDate: values.startDate,
      endDate: values.endDate,
      userId: user._id,
    };

    const response = await axiosPrivate.post<{
      data: { trip: { _id: string } };
    }>(`/trips` as string, data);

    navigate(`/trip/${response.data.data.trip._id}`);
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
            formValues={formValues}
          />
        );
    }
  };

  return (
    <FormContainer>
      <FormStepper steps={formSteps} activeStep={currentStep} />
      <Formik
        initialValues={initialState}
        validationSchema={validationSchemas[currentStep]}
        onSubmit={(values) => {
          if (isLastStep) {
            handleSubmitData(values);
          } else {
            handleNextStep();
          }
        }}
      >
        {({ handleSubmit, setFieldValue, values, errors }) => (
          <Form onSubmit={handleSubmit}>
            {renderCurrentStep(values, setFieldValue)}
            {errors.place ? <p>{errors.place.value}</p> : <p></p>}
            <ButtonContainer>
              {currentStep > 0 && (
                <Button
                  variant='primary'
                  type='button'
                  onClick={handlePreviousStep}
                >
                  Back
                </Button>
              )}
              <Button variant='primary' type='submit' mLeft={8}>
                Continue
              </Button>
            </ButtonContainer>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default PlanTripForm;
