import React from 'react';
import { useLoadScript, LoadScriptProps } from '@react-google-maps/api';
import usePlacesAutocomplete from 'use-places-autocomplete';
import styled from 'styled-components';
import Searchbar from '../../../components/Searchbar';
import { Field } from 'formik';

const libraries: LoadScriptProps['libraries'] = ['places'];

const Container = ({ formValues, setFieldValue }: WhereFormProps) => {
  // 1. Load the Google API
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || '', // @todo: figure out how to address dis
    libraries,
  });

  if (isLoaded)
    return <WhereForm formValues={formValues} setFieldValue={setFieldValue} />;
  return <p>None</p>;
};

type WhereFormProps = {
  formValues: any;
  setFieldValue: any;
};

const WhereForm = ({ formValues, setFieldValue }: WhereFormProps) => {
  const {
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const transformDataToDropdownItems = data?.map((item) => {
    return {
      title: item.structured_formatting.main_text,
      subtitle: item.structured_formatting.secondary_text,
      value: item.place_id,
    };
  });

  return (
    <Field>
      {(fieldProps: any) => (
        <Searchbar
          value={formValues.place.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            fieldProps.field.onChange(e);
            setValue(e.target.value);
          }}
          setFieldValue={setFieldValue}
          items={transformDataToDropdownItems}
          clearSuggestions={clearSuggestions}
        />
      )}
    </Field>
  );
};

export default Container;
