import axios from 'axios';
import { Formik, Form } from 'formik';
import React from 'react';
import Button from '../../../components/Button';
import TextInput from '../../../components/TextInput';
import { LoginPrompt, CTAText } from '../styles';

const SignupForm = (props: any) => {
  const handleSubmit = async (values: any) => {
    console.log({ values });
    const request = {
      username: values.username,
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
    };

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/signup`,
      request
    );

    if (response.data) {
      console.log({ data: response.data });
      // navigate(`/trip/${response.data._id}`);
    }
  };

  return (
    <div>
      <LoginPrompt>Sign up</LoginPrompt>
      <Formik
        initialValues={{
          username: '',
          password: '',
          email: '',
          firstName: '',
          lastName: '',
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
              name="firstName"
              placeholder="First name"
              style={{ margin: '10px 0' }}
              onChange={props.handleChange}
            />
            <TextInput
              type="text"
              name="lastName"
              placeholder="Last name"
              style={{ margin: '10px 0' }}
              onChange={props.handleChange}
            />
            <TextInput
              type="text"
              name="email"
              placeholder="Email"
              style={{ margin: '10px 0' }}
              onChange={props.handleChange}
            />
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
              Sign up
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

export default SignupForm;
