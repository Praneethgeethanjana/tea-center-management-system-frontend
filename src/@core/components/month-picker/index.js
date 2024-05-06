import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MonthPicker = ({date,setDate,updateHandler}) => {

    const handleChange = (date) => {
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        setDate(firstDayOfMonth);
        updateHandler(null,null,firstDayOfMonth);
    };


    return (
        <div className="month-picker">
            <DatePicker
                selected={date}
                onChange={handleChange}
                dateFormat="yyyy/MM"
                showMonthYearPicker
            />
        </div>
    );
};

export default MonthPicker;