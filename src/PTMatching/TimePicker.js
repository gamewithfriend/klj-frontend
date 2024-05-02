import React, {useState, forwardRef} from 'react';
import DatePicker from "react-datepicker";
import CalendarContainer from "react-datepicker";
import datePickerStyle from "../style/datePicker.module.css";

const TimePicker = ({startDate, setStartDate}) => {

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className={datePickerStyle.timeBtn} onClick={onClick} ref={ref}>
          {value}
        </button>
    ));

    return (
        <div>
            <DatePicker className={datePickerStyle.time}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="h:mm aa"
            placeholderText="전체"
            closeOnScroll={false}
            customInput={<ExampleCustomInput />}
            />
        </div>
    );
};

export default TimePicker;