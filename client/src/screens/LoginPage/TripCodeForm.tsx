import { Formik, Form } from 'formik';
import React from 'react';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { LoginPrompt } from './styles';

const TripCodeForm = (props: any) => {
  return (
    <div>
      <LoginPrompt>Enter trip code:</LoginPrompt>
      <Formik
        initialValues={{
          code: '',
        }}
        onSubmit={() => {}}
      >
        {(props) => (
          <Form
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <TextInput
              type="text"
              name="code"
              placeholder="Code"
              style={{ margin: '10px 0' }}
            />
            <Button variant="primary" onClick={() => {}} type="submit" my={16}>
              Enter code
            </Button>
          </Form>
        )}
      </Formik>
      <a href="#" onClick={() => props.setLoginView('login')}>
        Back
      </a>
    </div>
  );
};

export { TripCodeForm };
