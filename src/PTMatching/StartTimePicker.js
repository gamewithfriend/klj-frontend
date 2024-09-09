import React, {useState, forwardRef} from 'react';
import {format} from 'date-fns';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import CalendarContainer from "react-datepicker";
import datePickerStyle from "../style/datePicker.module.css";

const StartTimePicker = ({params, setParams}) => {
    
    const startDate = new Date();
    const [hours, minutes, seconds] = params.startTime.split(':').map(Number);
    startDate.setHours(hours, minutes, seconds, 0);

    const startTimeClick = (date) => {

        console.log(startDate)

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        setParams(prevParams => {
            return {
                ...prevParams,
                startTime: `${hours}:${minutes}:${seconds}`
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
            onChange={(date) => {startTimeClick(date)} }
            showTimeSelect={true}
            showTimeSelectOnly={true}
            ariaLabelClose="close"
            timeIntervals={30}
            timeCaption=""
            timeInputLabel="dd"
            dateFormat="h:mm aa"
            placeholderText="전체"
            closeOnScroll={false}
            // customInput={<ExampleCustomInput />}
            />
            
        </div>
    );
};

export default StartTimePicker;