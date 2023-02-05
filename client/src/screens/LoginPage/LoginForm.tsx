import { Formik, Form } from 'formik';
import React from 'react';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoginPrompt, CTAText } from './styles';
import axios from 'axios';

const LoginForm = (props: any) => {
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    const request = {
      username: values.username,
      password: values.password,
    };

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/login`,
      request
    );

    if (response.data) {
      navigate(`/plan-trip`);
    }
  };
  return (
    <div>
      <LoginPrompt>What are you waiting for?</LoginPrompt>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
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
              name="username"
              placeholder="Username"
              style={{ margin: '10px 0' }}
              onChange={props.handleChange}
            />
            <TextInput
              type="password"
              name="password"
              placeholder="Password"
              style={{
                margin: '10px 0',
              }}
              onChange={props.handleChange}
            />
            <Button variant="primary" type="submit" my={16}>
              Sign in
            </Button>
          </Form>
        )}
      </Formik>
      <CTAText>
        Don't have an account?{' '}
        <NavLink to="/plan-trip">Create a trip here!</NavLink>
      </CTAText>
      <CTAText>
        Have a trip code?{' '}
        <a href="#" onClick={() => props.setLoginView('code')}>
          Enter it here!
        </a>
      </CTAText>
      <CTAText>
        Don't have an account?
        <a href="#" onClick={() => props.setLoginView('signup')}>
          Sign up here!
        </a>
      </CTAText>
    </div>
  );
};

export { LoginForm };
