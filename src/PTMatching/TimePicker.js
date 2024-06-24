import React, {useState, forwardRef} from 'react';
import {format} from 'date-fns';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import CalendarContainer from "react-datepicker";
import datePickerStyle from "../style/datePicker.module.css";

const TimePicker = ({startDate, setStartDate, setParams}) => {
    
    const timeClick = (date) => {

        const formattedDate = format(date, 'HH:mm:ss');
        setParams(prevParams => {
            return {
                ...prevParams,
                trainingTime: formattedDate
            };
        });
    }

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className={datePickerStyle.timeBtn} onClick={onClick} ref={ref}>
          {value}
        </button>
    ));

    return (
        <div>
            <DatePicker 
            selected={startDate}
            onChange={(date) => {setStartDate(date); timeClick(date)} }
            showTimeSelect={true}
            showTimeSelectOnly={true}
            ariaLabelClose="close"
            timeIntervals={30}
            timeCaption=""
            timeInputLabel="dd"
            dateFormat="h:mm aa"
            placeholderText="전체"
            closeOnScroll={false}
            customInput={<ExampleCustomInput />}
            />
            
        </div>
    );
};

export default TimePicker;