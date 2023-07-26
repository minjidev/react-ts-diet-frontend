import React, { useState, useRef, ChangeEventHandler } from 'react';
import 'react-day-picker/dist/style.css';
import { format, isValid, parse } from 'date-fns';
import { DayPicker, useInput } from 'react-day-picker';
import { ko } from 'date-fns/locale';

function DatePicker() {
  const [selected, setSelected] = useState<Date>();
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
      <input
        size={12}
        type="text"
        value={inputValue}
        placeholder={format(new Date(), 'y-MM-dd')}
        onChange={handleInputChange}
        onClick={handleInputClick}></input>
      {isOpen && <DayPicker mode="single" defaultMonth={selected} selected={selected} onSelect={handleDaySelect} />}
    </>
  );
}

export default DatePicker;
