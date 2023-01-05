import React from 'react';
import usePlacesAutocomplete from 'use-places-autocomplete';
import Searchbar from '../../../components/Searchbar';
import { Field } from 'formik';
import useUseLoadScript from '../../../hooks/useUseLoadScript';

const Container = ({ formValues, setFieldValue }: WhereFormProps) => {
  const { isLoaded, loadError } = useUseLoadScript(['places']);

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
