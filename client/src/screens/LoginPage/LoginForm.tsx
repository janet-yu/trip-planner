import React from 'react';
import { Formik, Form } from 'formik';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { LoginPrompt, CTAText } from './styles';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const LoginForm = (props: any) => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

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
      setAuth({
        token: response.data.data.accessToken,
        user: response.data.data.user,
      });

      // Navigate to dashboard
      navigate(from, { replace: true });
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
