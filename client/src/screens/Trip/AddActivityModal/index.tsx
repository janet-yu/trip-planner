import React from 'react';
import styled from 'styled-components';
import usePlacesAutocomplete from 'use-places-autocomplete';
import Modal from '../../../components/Modal';
import Searchbar from '../../../components/Searchbar';
import { Field, Formik } from 'formik';
import Button from '../../../components/Button';
import axios from 'axios';

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

const AddActivityModal = ({
  setModalClose,
  setTrip,
  selectedDate,
  tripId
}: {
  setModalClose: any;
  tripId: string;
  setTrip: any;
  selectedDate: Date;
}) => {
  const {
    setValue,
    suggestions: { status, data },
    clearSuggestions
  } = usePlacesAutocomplete();
  const initialState = {
    activity: {
      id: '',
      value: ''
    }
  };

  const transformDataToDropdownItems = data?.map((item) => {
    return {
      title: item.structured_formatting.main_text,
      subtitle: item.structured_formatting.secondary_text,
      value: item.place_id
    };
  });

  const handleSubmitData = async (values: any) => {
    const request = {
      activity: {
        referenceId: values.activity.id,
        date: selectedDate
      }
    };

    const updated = await axios.post(
      `${process.env.REACT_APP_API_URL}/trips/${tripId}/itinerary`,
      request
    );

    setTrip(updated.data.data.trip);
  };

  return (
    <Modal setModalClose={setModalClose}>
      <ModalContent>
        <FormTitle>Add Activity</FormTitle>
        <Formik
          initialValues={initialState}
          onSubmit={(values) => {
            console.log({ values });

            handleSubmitData(values);
            setModalClose();
          }}>
          {({ handleSubmit, setFieldValue, values, errors }) => (
            <form onSubmit={handleSubmit}>
              <Field>
                {(fieldProps: any) => (
                  <Searchbar
                    value={values.activity.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      fieldProps.field.onChange(e);
                      setValue(e.target.value);
                    }}
                    inputName="activity.value"
                    handleItemClick={(item) => {
                      setFieldValue('activity.id', item.value);
                      setFieldValue('activity.value', item.title);
                      clearSuggestions();
                    }}
                    items={transformDataToDropdownItems}
                  />
                )}
              </Field>
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

export default AddActivityModal;
