import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import Calendar from './Calendar';
import * as dateHelpers from '../../utils/dateHelpers';

const DateInputContainer = styled.div<{ focused?: boolean }>`
  display: flex;
  align-items: center;
  border: 2px solid transparent;
  border-bottom: 2px solid ${(props) => props.theme.colors.primary['800']};
  border-radius: 0.2rem;
  max-width: 200px;
  position: relative;

  ${(props) =>
    props.focused &&
    css`
      border: 2px solid ${(props) => props.theme.colors.primary['800']};
    `}
`;

const CalendarButton = styled.button`
  width: 32px;
  height: 32px;
  color: ${(props) => props.theme.colors.primary['800']};
  border-radius: 100%;
  &:hover {
    background: ${(props) => props.theme.colors.primary['50']};
    cursor: pointer;
  }
`;

const Input = styled.input`
  border: none;
  color: ${(props) => props.theme.colors.primary['800']};
  font-size: 1rem;
  padding: 0.8rem;
  flex: 1;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const DateInput = (props: any) => {
  const [inputFocused, setInputFocused] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [inputValue, setInputValue] = useState(
    dateHelpers.dateToString(selectedDate)
  );
  const [cursor, setCursor] = useState({
    start: 0,
    end: 0,
  });
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (ref?.current) {
      ref.current.setSelectionRange(cursor.start, cursor.end);
    }
  }, [cursor, inputValue, ref]);

  const onInputFocus = () => {
    setInputFocused(true);
  };

  const handleChange = (evt) => {
    const caretStart = evt.target.selectionStart;
    const caretEnd = evt.target.selectionEnd;

    const currentValue = evt.target.value;

    // 1. Remove any non numeric input
    const regex = /[^0-9]+/gi;
    const sanitizedValue = currentValue.replace(regex, '');

    // Move everything to the right every time we input a number
    // Place slashes in the correct place
    let valueSplit = sanitizedValue.split('');

    if (valueSplit.length > 2) {
      valueSplit.splice(2, 0, '/');
    }

    if (valueSplit.length > 4) {
      valueSplit.splice(5, 0, '/');
    }

    const finalValue = valueSplit.join('').substring(0, 10);

    setInputValue(finalValue);
    setCursor({
      start: caretStart,
      end: caretEnd,
    });
  };

  const onInputBlur = () => {
    setInputFocused(false);
  };

  const handleCalendarClick = () => {
    setCalendarOpen(!calendarOpen);
  };

  const handleCalendarDateChange = (dateComponents) => {
    const newDate = dateHelpers.componentsToDate(dateComponents);
    setSelectedDate(newDate);
    setInputValue(dateHelpers.dateComponentsToString(dateComponents));
  };

  return (
    <DateInputContainer focused={inputFocused}>
      {calendarOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
          }}
        >
          <Calendar
            setCalendarOpen={setCalendarOpen}
            onDateChange={handleCalendarDateChange}
            selectedDate={selectedDate}
          />
        </div>
      )}
      <CalendarButton onClick={handleCalendarClick}>
        <FontAwesomeIcon icon={faCalendar} />
      </CalendarButton>
      <Input
        type="tel"
        value={inputValue}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        onChange={handleChange}
        pattern={'[0-9]'}
        ref={ref}
        maxLength={12}
      />
    </DateInputContainer>
  );
};

export default DateInput;
