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

const AddActivityModal = ({
  setModalClose,
  setTrip,
  tripId,
}: {
  setModalClose: any;
  tripId: string;
  setTrip: any;
}) => {
  const {
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  const initialState = {
    activity: {
      id: '',
      value: '',
    },
  };

  const transformDataToDropdownItems = data?.map((item) => {
    return {
      title: item.structured_formatting.main_text,
      subtitle: item.structured_formatting.secondary_text,
      value: item.place_id,
    };
  });

  const handleSubmitData = async (values: any) => {
    const request = {
      op: 'add',
      field: 'itinerary',
      value: [
        {
          referenceId: values.activity.id,
          date: new Date(),
        },
      ],
    };
    const updated = await axios.patch(
      `${process.env.REACT_APP_API_URL}/trips/${tripId}`,
      request
    );

    setTrip(updated.data);
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
          }}
        >
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
              <Button variant="primary" type="submit">
                Add
              </Button>
            </form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default AddActivityModal;
