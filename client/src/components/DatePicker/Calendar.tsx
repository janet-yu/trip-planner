import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import * as dateHelpers from '../../utils/dateHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

const CalendarContainer = styled.div`
  background: white;
  box-shadow: 0px 10px 20px #eee;
  border-radius: 5px;
  width: 280px;
  text-align: center;
  padding: 1em;
`;

const WeekHeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const WeekdayText = styled.p`
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary['500']};
  padding: 3px;
  font-size: 0.8rem;
`;

const MonthHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  color: ${(props) => props.theme.colors.primary['500']};
`;

const ChangeMonthButton = styled.button`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.primary['500']};
  border-radius: 50px;
  transition: background 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.colors.primary['50']};
  }
`;

const MonthDaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(4, 1fr);
  justify-items: center;
`;

const DateIndicator = styled.span<{ weekday?: number; selected?: boolean }>`
  border-radius: 100%;
  padding: 5px;
  width: 2ch;
  height: 2ch;
  background: ${(props) =>
    props.selected ? props.theme.colors.primary['500'] : 'transparent'};
  color: ${(props) => (props.selected ? 'white' : 'black')};
  font-size: 12px;

  &:hover {
    background: #eee;
    cursor: pointer;
  }

  ${(props) =>
    props.weekday &&
    css`
      grid-column-start: ${props.weekday + 1};
    `}
`;

const Calendar = (props: any) => {
  /**
   * 1. Keep track of selected date
   * 2. Render the current date
   * 3. Need to have month navigation (left and right arrows)
   * 4. Need to show monthly/yearly view for easy date access
   */
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState({
    day: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
  });

  const daysInMonth = dateHelpers.getMonthDays(
    selectedDate.month,
    selectedDate.year
  );
  const firstDayOfMonth = dateHelpers.getFirstDayOfMonth(
    selectedDate.month,
    selectedDate.year
  );

  const renderDates = () => {
    let dates = [];

    for (let i = 0; i < daysInMonth; i++) {
      dates.push(
        <DateIndicator
          weekday={i === 0 ? firstDayOfMonth : undefined}
          selected={selectedDate.day === i + 1}
          onClick={() => handleDayClick(i + 1)}
        >
          {i + 1}
        </DateIndicator>
      );
    }

    return dates;
  };

  const renderWeekHeader = () => {
    return dateHelpers.WEEKDAYS.map((day) => (
      <WeekdayText>{day.substring(0, 3)}</WeekdayText>
    ));
  };

  const handleDayClick = (day: number) => {
    setSelectedDate({
      ...selectedDate,
      day,
    });
  };

  const handleNextMonthClick = () => {
    const nextMonth = selectedDate.month >= 11 ? 0 : selectedDate.month + 1;
    const year =
      selectedDate.month >= 11 ? selectedDate.year + 1 : selectedDate.year;

    setSelectedDate({
      ...selectedDate,
      month: nextMonth,
      year,
    });
  };

  const handlePrevMonthClick = () => {
    const prevMonth = selectedDate.month <= 0 ? 11 : selectedDate.month - 1;
    const year =
      selectedDate.month <= 0 ? selectedDate.year - 1 : selectedDate.year;

    setSelectedDate({
      ...selectedDate,
      month: prevMonth,
      year,
    });
  };

  console.log({ daysInMonth, firstDayOfMonth, selectedDate });

  return (
    <CalendarContainer>
      <MonthHeader>
        <ChangeMonthButton onClick={handlePrevMonthClick}>
          <FontAwesomeIcon icon={faCaretLeft} />
        </ChangeMonthButton>
        <p>
          {dateHelpers.MONTHS[selectedDate.month]} {selectedDate.year}
        </p>
        <ChangeMonthButton onClick={handleNextMonthClick}>
          <FontAwesomeIcon icon={faCaretRight} />
        </ChangeMonthButton>
      </MonthHeader>
      <WeekHeaderWrapper>{renderWeekHeader()}</WeekHeaderWrapper>
      <MonthDaysContainer>{renderDates()}</MonthDaysContainer>
    </CalendarContainer>
  );
};

export default Calendar;
