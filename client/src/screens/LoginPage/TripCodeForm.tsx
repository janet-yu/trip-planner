import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { LoginPrompt } from './styles';

const TripCodeForm = (props: any) => {
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    const { code } = values;

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/trip-codes/${code}/trip`);

    if (response.data) {
      navigate(`/trip/${response.data._id}?readonly=true`);
    }
  };

  return (
    <div>
      <LoginPrompt>Enter trip code:</LoginPrompt>
      <Formik
        initialValues={{
          code: ''
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}>
        {(props) => (
          <Form
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <TextInput
              type="text"
              name="code"
              placeholder="Code"
              style={{ margin: '10px 0' }}
              onChange={props.handleChange}
            />
            <Button variant="primary" type="submit" my={16}>
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
