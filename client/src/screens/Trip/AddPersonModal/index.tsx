import React from 'react';
import styled from 'styled-components';
import Modal from '../../../components/Modal';
import { Formik } from 'formik';
import Button from '../../../components/Button';
import { axiosPrivate } from '../../../api/axios';
import TextInput from '../../../components/TextInput';

const ModalContent = styled.div``;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const AddPersonModal = ({
  setModalClose,
  setTrip,
  tripId
}: {
  setModalClose: any;
  tripId: string;
  setTrip: any;
}) => {
  const initialState = {
    username: ''
  };

  const handleSubmitData = async (values: any) => {
    const request = {
      username: values.username
    };

    const updated = await axiosPrivate.post(
      `${process.env.REACT_APP_API_URL}/trips/${tripId}/people`,
      request
    );

    setTrip(updated.data.data.trip);
  };

  return (
    <Modal setModalClose={setModalClose}>
      <ModalContent>
        <FormTitle>Add Person</FormTitle>
        <Formik
          initialValues={initialState}
          onSubmit={(values) => {
            handleSubmitData(values);
          }}>
          {({ handleSubmit, handleChange, errors }) => (
            <form onSubmit={handleSubmit}>
              <TextInput
                placeholder="Search user by username"
                name="username"
                role="searchbox"
                onChange={handleChange}
              />
              <ButtonWrapper>
                <Button variant="primary" type="submit">
                  Add
                </Button>
              </ButtonWrapper>
            </form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default AddPersonModal;
