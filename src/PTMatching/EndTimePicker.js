import React, { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import datePickerStyle from '../style/datePicker.module.css';

const EndTimePicker = ({ params, setParams }) => {
    // 상태 초기화
    const [endDate, setEndDate] = useState(() => {
        const [hours, minutes, seconds] = params.endTime.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, seconds, 0);
        return date;
    });

    // 시간 선택 핸들러
    const handleChange = (date) => {
        setEndDate(date);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        setParams(prevParams => ({
            ...prevParams,
            endTime: `${hours}:${minutes}:${seconds}`
        }));
    };

    return (
        <div>
            <DatePicker
                selected={endDate}
                onChange={handleChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                dateFormat="h:mm aa"
                placeholderText="End Time"
                closeOnScroll={false}
            />
        </div>
    );
};

export default EndTimePicker;
