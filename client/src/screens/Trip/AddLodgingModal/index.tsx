import React, { useEffect } from 'react';
import styled from 'styled-components';
import usePlacesAutocomplete from 'use-places-autocomplete';
import Modal from '../../../components/Modal';
import Searchbar from '../../../components/Searchbar';
import { Field, Formik } from 'formik';
import Button from '../../../components/Button';
import DatePicker from '../../../components/DatePicker';
import axios from 'axios';

const ModalContent = styled.div``;

const DatesContainer = styled.div`
  display: flex;
  margin: 24px 0;
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
`;

const AddLodgingModal = ({
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
    lodging: {
      id: '',
      value: '',
    },
    checkinDate: null,
    checkoutDate: null,
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
      field: 'lodging',
      value: [
        {
          referenceId: values.lodging.id,
          checkinDate: values.checkinDate,
          checkoutDate: values.checkoutDate,
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
        <FormTitle>Add Lodging</FormTitle>
        <Formik
          initialValues={initialState}
          onSubmit={(values) => {
            handleSubmitData(values);
            setModalClose();
          }}
        >
          {({ handleSubmit, setFieldValue, values, errors }) => (
            <form onSubmit={handleSubmit}>
              <Field>
                {(fieldProps: any) => (
                  <Searchbar
                    value={values.lodging.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      fieldProps.field.onChange(e);
                      setValue(e.target.value);
                    }}
                    inputName="lodging.value"
                    handleItemClick={(item) => {
                      setFieldValue('lodging.id', item.value);
                      setFieldValue('lodging.value', item.title);
                      clearSuggestions();
                    }}
                    items={transformDataToDropdownItems}
                  />
                )}
              </Field>
              <DatesContainer>
                <DatePicker
                  name="checkinDate"
                  onChange={setFieldValue}
                  label="Check-in"
                  variant="secondary"
                />
                <DatePicker
                  name="checkoutDate"
                  onChange={setFieldValue}
                  label="Check-out"
                  styles={{
                    marginLeft: '10px',
                  }}
                  variant="secondary"
                  disableDatesBefore={values.checkinDate}
                />
              </DatesContainer>
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

export default AddLodgingModal;
