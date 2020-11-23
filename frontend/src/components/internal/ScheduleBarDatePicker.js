import 'date-fns';
import React from 'react';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
export default function MaterialUIPickers(props) {
    const getCurrentDate = () => {
        let date = new Date();
       date.setDate(date.getDate());
        const formattedDate = format(date, "yyy-MM-dd");
        return formattedDate;
    }
    const [selectedDate, setSelectedDate] = React.useState(getCurrentDate());
    const handleDateChange = (date) => {
        const formattedDate = format(date, "yyy-MM-dd");
        setSelectedDate(formattedDate);
        props.getTrainingBydate(formattedDate);
        props.setPickerState(false);
    };
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="yyyy-MM-dd"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>
    );
}

