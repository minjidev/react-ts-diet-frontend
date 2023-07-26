import React, { useState, useRef, ChangeEventHandler } from 'react';
import { styled } from 'styled-components';
import 'react-day-picker/dist/style.css';
import '../../styles/calendar.css';
import { format, isValid, parse } from 'date-fns';
import { DayPicker, useInput } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import { BsCalendarPlus } from 'react-icons/bs';

interface DatePickerProps {
  selected: Date | undefined;
  setSelected: (newDate: Date | undefined) => void;
}

function DatePicker({ selected, setSelected }: DatePickerProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const closePicker = () => {
    setIsOpen(false);
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    setInputValue(e.currentTarget.value);
    const date = parse(e.currentTarget.value, 'y-MM-dd', new Date());

    if (isValid(date)) {
      setSelected(date);
    } else {
      setSelected(undefined);
    }
  };

  const handleInputClick = () => {
    setIsOpen(true);
  };

  const handleDaySelect = (date: Date | undefined) => {
    setSelected(date);
    if (date) {
      setInputValue(format(date, 'y-MM-dd'));
      closePicker();
    } else {
      setInputValue('');
    }
  };

  return (
    <>
      <InputGroup>
        <DateInput
          type="text"
          name="text"
          autoComplete="off"
          value={inputValue}
          placeholder={format(new Date(), 'y-MM-dd')}
          onChange={handleInputChange}
          onClick={handleInputClick}
        />
        <CalendarIcon role="image" aria-label="recipe book" />
        <DayPickerContainer>
          {isOpen && <DayPicker mode="single" defaultMonth={selected} selected={selected} onSelect={handleDaySelect} />}
        </DayPickerContainer>
      </InputGroup>
    </>
  );
}

const InputGroup = styled.div`
  position: relative;
  margin: 1rem 0;
  width: 100%;
`;

const DateInput = styled.input`
  width: 100%;
  border: solid 1.5px #9e9e9e;
  border-radius: 1rem;
  background: transparent;
  padding: 1rem 1rem 1rem 3rem;
  font-size: 1.2rem;
  font-weight: 600;

  cursor: pointer;
`;

const CalendarIcon = styled(BsCalendarPlus)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 1rem;
  width: 1.4rem;
`;

const DayPickerContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
`;

export default DatePicker;
