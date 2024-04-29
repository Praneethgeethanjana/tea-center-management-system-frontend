import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MonthPicker = ({date,setDate,updateHandler}) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const initialDate = `${currentYear}/${currentMonth.toString().padStart(2, '0')}`;
    const handleChange = (date) => {
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        setDate(firstDayOfMonth);
        updateHandler(null,null,firstDayOfMonth);
    };

    // Custom input component to show only year and month
    const CustomInput = ({ value, onClick }) => (
        <button className="custom-input" onClick={onClick}>
            {value ? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short' }).format(value) : 'Select Month'}
        </button>
    );

    return (
        <div className="month-picker">
            <DatePicker
                selected={date}
                onChange={handleChange}
                dateFormat="yyyy/MM"
                showMonthYearPicker
                // customInput={<CustomInput />}
            />
        </div>
    );
};

export default MonthPicker;