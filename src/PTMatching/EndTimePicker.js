import React from 'react';
import datePickerStyle from "../style/datePicker.module.css";

const EndTimePicker = ({ params, setParams }) => {
    const endTimepick = (e) => {
        const { name, value } = e.target;
        const time = params.endTime.split(":"); // ["00", "00", "00"]

        // AM/PM 처리
        if (name === "amOrPm") {
            if (value === "pm" && parseInt(time[0], 10) < 12) {
                time[0] = (parseInt(time[0], 10) + 12).toString().padStart(2, '0');
            } else if (value === "am" && parseInt(time[0], 10) >= 12) {
                time[0] = (parseInt(time[0], 10) - 12).toString().padStart(2, '0');
            }
        }

        // 시간 처리
        if (name === "hour") {
            let hour = parseInt(value, 10);
            if (parseInt(time[0], 10) >= 12) {
                hour = (hour === 12) ? 12 : hour + 12;  // PM일 경우 12를 더함
            }
            time[0] = hour.toString().padStart(2, '0');
        }

        if (name === "minute") {
            time[1] = value.padStart(2, '0');
        }

        setParams((prevState) => ({
            ...prevState,
            endTime: `${time[0]}:${time[1]}:00`, 
        }));
    };

    return (
        <div className={datePickerStyle.timeContainer}>
            <select className={datePickerStyle.amOrPm} name="amOrPm" onChange={endTimepick}>
                <option value="am">오전</option>
                <option value="pm">오후</option>
            </select>

            <select name="hour" onChange={endTimepick}>
                {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={i + 1}>
                        {i + 1}
                    </option>
                ))}
            </select>

            <select name="minute" onChange={endTimepick}>
                <option value="00">00</option>
                <option value="30">30</option>
            </select>
        </div>
    );
};

export default EndTimePicker;
