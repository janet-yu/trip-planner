import { Formik, Form } from 'formik';
import React from 'react';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { LoginPrompt, CTAText } from './styles';

const LoginForm = (props: any) => {
  return (
    <div>
      <LoginPrompt>What are you waiting for?</LoginPrompt>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={() => {}}
      >
        {(formikprops) => (
          <Form
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <TextInput
              type="text"
              name="username"
              placeholder="Username"
              style={{ margin: '10px 0' }}
            />
            <TextInput
              type="password"
              name="password"
              placeholder="Password"
              style={{
                margin: '10px 0',
              }}
            />
            <Button variant="primary" onClick={() => {}} type="submit" my={16}>
              Sign in
            </Button>
          </Form>
        )}
      </Formik>
      <CTAText>
        Don't have an account? <a href="#">Create a trip here!</a>
      </CTAText>
      <CTAText>
        Have a trip code?{' '}
        <a href="#" onClick={() => props.setLoginView('code')}>
          Enter it here!
        </a>
      </CTAText>
    </div>
  );
};

export { LoginForm };
