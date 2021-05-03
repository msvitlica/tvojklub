import React, { useState } from 'react';
import {
    format,
    subMonths,
    addMonths,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    addDays,
    isSameMonth,
    isSameDay
} from 'date-fns';

function MemberDetails(props) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const renderHeader = () => {
        const dateFormat = "MMMM yyyy"

        const prevMonth = () => {
            setCurrentMonth(subMonths(currentMonth, 1))
        }
        const nextMonth = () => {
            setCurrentMonth(addMonths(currentMonth, 1))
        }

        return (
            <div className="header row row-middle">
                <div className="co col-start">
                    <div className="icon" onClick={prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                    <span>
                        {format(currentMonth, dateFormat)}
                    </span>
                </div>
                <div className="col col-end" onClick={nextMonth}>
                    <div className="icon">
                        chevron_right
                    </div>
                </div>
            </div>
        )
    }


    const renderDays = () => {
        const dateFormat = "dddd";
        const days = [];

        let startDate = startOfWeek(currentMonth);

        for(let i = 0; i < 7; i++){
            days.push(
                <div className="col col-center" key={i}>
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            );
        }

        return <div className="days row">{days}</div>
    }


    const renderCells = () => {
        const dateFormat = "d";
        const rows = [];

        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for(let i = 0; i < 7; i++){
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div 
                        className={`col cell ${
                            !isSameMonth(day, monthStart)
                              ? "disabled"
                              : isSameDay(day, selectedDate) ? "selected" : ""
                          }`}
                        key={day}
                    >
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }

        return <div className="body">{rows}</div>
    }

    return (
        <div className="calendar">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
        </div>
    )
}

export default MemberDetails;
