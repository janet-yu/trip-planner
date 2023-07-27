import { Formik } from 'formik';
import React from 'react';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import styled from 'styled-components';
import axios from 'axios';
import TextInput from '../../../components/TextInput';
import Box from '../../../components/Box';
import DatePicker from '../../../components/DatePicker';

const FormTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
`;

const EditActivityModal = ({
  setModalClose,
  setTrip,
  tripId,
  activity
}: {
  setModalClose: any;
  tripId: string;
  setTrip: any;
  activity: any;
}) => {
  const initialState = {
    date: undefined,
    notes: activity.notes || ''
  };

  const handleSubmitData = async (values: { date?: Date; notes?: string }) => {
    const request = {
      updates: {
        ...values
      }
    };

    const updated = await axios.patch(
      `${process.env.REACT_APP_API_URL}/trips/${tripId}/itinerary/activity/${activity._id}`,
      request
    );

    setTrip(updated.data.data.trip);
  };

  return (
    <Modal setModalClose={setModalClose}>
      <div>
        <FormTitle>Edit Activity</FormTitle>
        <Formik
          initialValues={initialState}
          onSubmit={(values) => {
            handleSubmitData(values);
            setModalClose();
          }}>
          {({ handleSubmit, handleChange, values, setFieldValue, errors }) => (
            <form onSubmit={handleSubmit}>
              <Box display="flex" alignItems="center" flexDirection="column">
                <TextInput
                  type="text"
                  value={values.notes}
                  name="notes"
                  placeholder="Notes..."
                  onChange={handleChange}
                />
                <Box mTop={12}>
                  <DatePicker
                    selectedDate={new Date(activity.date)}
                    label="Date"
                    variant="secondary"
                    name="date"
                    onChange={setFieldValue}
                  />
                </Box>
              </Box>
              <Box display="flex" justifyContent="center" mTop={12}>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default EditActivityModal;
