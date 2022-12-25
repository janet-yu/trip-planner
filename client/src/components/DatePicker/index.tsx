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
import React, { useState } from "react";
import Input from "./DateInput";
import Calendar from "./Calendar";
import styled from "styled-components";

const DatePickerContainer = styled.div`
  position: relative;
`;

// Refactor to render Calendar and Input separately here
const DatePicker = (props) => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <DatePickerContainer>
      {calendarOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
          }}
        >
          <Calendar
            setCalendarOpen={setCalendarOpen}
            onDateChange={setSelectedDate}
            selectedDate={selectedDate}
          />
        </div>
      )}
      <Input
        selectedDate={selectedDate}
        setCalendarOpen={setCalendarOpen}
        onDateChange={setSelectedDate}
      />
    </DatePickerContainer>
  );
};

export default DatePicker;
