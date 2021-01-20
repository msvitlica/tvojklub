import React from 'react';
import { MuiPickersUtilsProvider, DatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export default function TrainingDatePicker(props) {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker className ='date-datePicker'  
                color='primary'
                InputProps={{
                    disableUnderline: true,
                }}
                variant='outlined'
                format="MM/dd/yyyy"
                value={props.selectedDate}
                onChange={props.handleDateChange}
            />
        </MuiPickersUtilsProvider>
    );
}
