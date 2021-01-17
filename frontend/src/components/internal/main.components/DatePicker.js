import React from 'react';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { TextField } from '@material-ui/core';

export default function TrainingsDatePicker(props) {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div>
                <DatePicker
                    InputProps={{
                        disableUnderline: true,
                    }}
                    format="MM/dd/yyyy"
                    value={props.selectedDate}
                    onChange={props.handleDateChange}
                />
            </div>
        </MuiPickersUtilsProvider>
    );
}
