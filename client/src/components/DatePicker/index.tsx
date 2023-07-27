/**
 * 1. Determine the number of days for the selected month
 * 2. Save the current date, save parts of the date separately (month, day, year)
 * 3. When someone clicks right, increment the month, vice versa with left
 * 4. When someone clicks on a date, set the day
 * 5. When someone clicks outside of the component, assume the date was selected
 *
 * Components:
 * 1. Date input
 * 3. Date calendar
 */
import React, { useEffect, useState } from 'react';
import Input from './DateInput';
import Calendar from './Calendar';
import styled from 'styled-components';

const DatePickerContainer = styled.div`
  position: relative;
`;

const InputLabel = styled.label`
  margin-bottom: 4px;
  display: inline-block;
`;

const CalendarContainer = styled.div`
  position: absolute;
  top: 100%;
`;

// Refactor to render Calendar and Input separately here
const DatePicker = (props: {
  variant?: 'primary' | 'secondary';
  name: string;
  label?: string;
  onChange: any;
  disableDatesBefore?: any;
  styles?: any;
  selectedDate?: Date;
}) => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    props.onChange(props.name, selectedDate);
  }, [selectedDate]);

  return (
    <DatePickerContainer style={props.styles}>
      {calendarOpen && (
        <CalendarContainer>
          <Calendar
            setCalendarOpen={setCalendarOpen}
            onDateChange={setSelectedDate}
            selectedDate={selectedDate}
            disableDatesBefore={props.disableDatesBefore}
          />
        </CalendarContainer>
      )}
      {props.label && <InputLabel htmlFor={props.name}>{props.label}</InputLabel>}
      <Input
        selectedDate={selectedDate}
        setCalendarOpen={setCalendarOpen}
        onDateChange={setSelectedDate}
        name={props.name}
        variant={props.variant || 'primary'}
      />
    </DatePickerContainer>
  );
};

export default DatePicker;
