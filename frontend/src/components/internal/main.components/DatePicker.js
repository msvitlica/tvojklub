import React from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export default function DatePicker(props) {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker className ='date-datePicker'  
                color='primary'
                InputProps={{
                    disableUnderline: true,
                }}
                variant='outlined'
                format="MM/dd/yyyy"
                value={props.selectedDate}
                onChange={props.handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>
    );
}
