import React from 'react';
import datePickerStyle from "../style/datePicker.module.css";

const StartTimePicker = ({ params, setParams }) => {
    const startTimepick = (e) => {
        const { name, value } = e.target;
        const time = params.startTime.split(":"); // ["00", "00", "00"]
        
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

        // 분 처리
        if (name === "minute") {
            time[1] = value.padStart(2, '0');
        }

        // 업데이트된 startTime 설정
        setParams((prevState) => ({
            ...prevState,
            startTime: `${time[0]}:${time[1]}:00`, // 오직 startTime만 변경
        }));
    };

    return (
        <div className={datePickerStyle.timeContainer}>
            <select className={datePickerStyle.amOrPm} name="amOrPm" onChange={startTimepick}>
                <option value="am">오전</option>
                <option value="pm">오후</option>
            </select>

            <select name="hour" onChange={startTimepick}>
                {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={i + 1}>
                        {i + 1}
                    </option>
                ))}
            </select>

            <select name="minute" onChange={startTimepick}>
                <option value="00">00</option>
                <option value="30">30</option>
            </select>
        </div>
    );
};

export default StartTimePicker;
