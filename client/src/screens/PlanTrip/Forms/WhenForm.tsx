import React from 'react';
import styled from 'styled-components';
import Datepicker from '../../../components/DatePicker';

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToText = styled.p`
  font-size: 1.5rem;
  margin: 0 2rem;
`;

const WhenForm = (props: any) => {
  const { formValues } = props;

  return (
    <FormContainer>
      <Datepicker name="startDate" onChange={props.setFieldValue} />
      <ToText>to</ToText>
      <Datepicker
        name="endDate"
        onChange={props.setFieldValue}
        disableDatesBefore={formValues.startDate}
      />
    </FormContainer>
  );
};

export default WhenForm;
