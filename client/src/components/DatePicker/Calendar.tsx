import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import * as dateHelpers from '../../utils/dateHelpers';
import useDetectOutsideClick from '../../hooks/useDetectOutsideClick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

const sharedTransition = css`
  transition: background 0.2s ease-in-out;
`;

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

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  color: ${(props) => props.theme.colors.primary['300']};
`;

const NavigationButton = styled.button`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.primary['300']};
  border-radius: 50px;
  ${sharedTransition}
  width: 20px;
  height: 20px;
  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.colors.primary['50']};
  }
`;

const CalendarViewContainer = styled.div<{ view: CalendarView }>`
  height: 170px;
  display: flex;
  flex-direction: column;
`;

const CalendarViewGrid = styled.div<{ view: CalendarView }>`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => (props.view === CalendarView.Day ? 7 : 4)},
    1fr
  );
  grid-template-rows: repeat(
    ${(props) => (props.view === CalendarView.Day ? 4 : 3)},
    1fr
  );
  justify-items: center;
  flex: 1;
`;

const DateIndicator = styled.button<{
  weekday?: number;
  selected?: boolean;
  disabled?: boolean;
}>`
  border-radius: 100%;
  padding: 5px;
  background: ${(props) =>
    props.selected ? props.theme.colors.primary['500'] : 'transparent'};
  color: ${(props) => (props.selected ? 'white' : 'black')};
  font-size: 12px;
  &:hover {
    background: #eee;
    cursor: pointer;
  }

  ${(props) =>
    props.disabled &&
    css`
      color: ${(props) => props.theme.colors.grey['300']};
      &:hover {
        background: transparent;
        cursor: auto;
      }
    `}

  ${(props) =>
    props.weekday &&
    css`
      grid-column-start: ${props.weekday + 1};
    `}
`;

const MonthYearButton = styled.button`
  ${sharedTransition}
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem;
  &:hover {
    cursor: pointer;
    background: #eee;
  }
`;

const MonthOption = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  ${sharedTransition}
  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.colors.primary['300']};
    color: #fff;
  }
`;

enum CalendarView {
  Day,
  Month,
}

type CalendarPropsType = {
  selectedDate: Date;
  onDateChange: React.Dispatch<React.SetStateAction<Date>>;
  setCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  disableDatesBefore?: Date;
};

const Calendar = (props: CalendarPropsType) => {
  /**
   * 1. Keep track of selected date
   * 2. Render the current date
   * 3. Need to have month navigation (left and right arrows)
   * 4. Need to show monthly/yearly view for easy date access
   * 5. Keep track of the view selected (year, month, day)
   * 6. Generate appropriate years
   */
  const initialDate = {
    day: props.selectedDate.getDate(),
    month: props.selectedDate.getMonth(),
    year: props.selectedDate.getFullYear(),
  };

  const ref = useRef(null);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [currentView, setCurrentView] = useState(CalendarView.Day);

  useEffect(() => {
    if (initialDate.day !== selectedDate.day) {
      const newDate = dateHelpers.componentsToDate(selectedDate);
      props.onDateChange(newDate);
      props.setCalendarOpen(false);
    }
  }, [selectedDate]);

  const handleOutsideClick = () => {
    props.setCalendarOpen(false);
  };

  useDetectOutsideClick(ref, handleOutsideClick);

  const daysInMonth = dateHelpers.getMonthDays(
    selectedDate.month,
    selectedDate.year
  );
  const firstDayOfMonth = dateHelpers.getFirstDayOfMonth(
    selectedDate.month,
    selectedDate.year
  );

  const renderMonths = () => {
    let months = [];

    for (let i = 0; i < 12; i++) {
      months.push(
        <MonthOption
          onClick={() => handleMonthClick(i)}
          key={dateHelpers.MONTHS[i]}
        >
          {dateHelpers.MONTHS[i].substring(0, 3)}
        </MonthOption>
      );
    }

    return months;
  };

  const renderWeekHeader = () => {
    return dateHelpers.WEEKDAYS.map((day) => (
      <WeekdayText key={day}>{day.substring(0, 3)}</WeekdayText>
    ));
  };

  const renderDates = () => {
    let dates = [];

    for (let i = 0; i < daysInMonth; i++) {
      let disabled = false;
      if (props.disableDatesBefore) {
        const currentDate = new Date(
          `${selectedDate.month + 1}-${i + 1}-${selectedDate.year}`
        );
        disabled =
          currentDate.setHours(0, 0, 0, 0) <
          props.disableDatesBefore.setHours(0, 0, 0, 0);
      }

      dates.push(
        <DateIndicator
          weekday={i === 0 ? firstDayOfMonth : undefined}
          selected={selectedDate.day === i + 1 && !disabled}
          onClick={() => handleDayClick(i + 1)}
          key={i}
          disabled={disabled}
          type="button"
        >
          {i + 1}
        </DateIndicator>
      );
    }

    return dates;
  };

  const renderView = () => {
    switch (currentView) {
      case CalendarView.Day: {
        return (
          <>
            <WeekHeaderWrapper>{renderWeekHeader()}</WeekHeaderWrapper>
            <CalendarViewGrid view={CalendarView.Day}>
              {renderDates()}
            </CalendarViewGrid>
          </>
        );
      }
      case CalendarView.Month:
        return (
          <CalendarViewGrid view={CalendarView.Month}>
            {renderMonths()}
          </CalendarViewGrid>
        );
    }
  };

  const renderHeader = () => {
    switch (currentView) {
      case CalendarView.Day:
        return `${dateHelpers.MONTHS[selectedDate.month]} ${selectedDate.year}`;
      case CalendarView.Month:
        return `${selectedDate.year}`;
    }
  };

  const handleDayClick = (day: number) => {
    setSelectedDate({
      ...selectedDate,
      day,
    });
  };

  const handleMonthClick = (month: number) => {
    setCurrentView(CalendarView.Day);
    setSelectedDate({
      ...selectedDate,
      month,
    });
  };

  const handleNextClick = () => {
    if (currentView === CalendarView.Day) {
      handleNextMonthClick();
    } else if (currentView === CalendarView.Month) {
      const nextYear = selectedDate.year + 1;

      setSelectedDate({
        ...selectedDate,
        year: nextYear,
      });
    }
  };

  const handlePrevClick = () => {
    if (currentView === CalendarView.Day) {
      handlePrevMonthClick();
    } else if (currentView === CalendarView.Month) {
      const nextYear = selectedDate.year - 1;

      setSelectedDate({
        ...selectedDate,
        year: nextYear,
      });
    }
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

  const handleCalendarViewClick = () => {
    switch (currentView) {
      case CalendarView.Day: {
        setCurrentView(CalendarView.Month);
        break;
      }
      case CalendarView.Month:
        setCurrentView(CalendarView.Day);
        break;
    }
  };

  return (
    <CalendarContainer ref={ref}>
      <CalendarHeader>
        <NavigationButton onClick={handlePrevClick} type="button">
          <FontAwesomeIcon icon={faCaretLeft} />
        </NavigationButton>
        <MonthYearButton onClick={handleCalendarViewClick} type="button">
          {renderHeader()}
        </MonthYearButton>
        <NavigationButton onClick={handleNextClick} type="button">
          <FontAwesomeIcon icon={faCaretRight} />
        </NavigationButton>
      </CalendarHeader>
      <CalendarViewContainer view={currentView}>
        {renderView()}
      </CalendarViewContainer>
    </CalendarContainer>
  );
};

export default Calendar;
