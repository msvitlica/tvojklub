import React from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';
import ScheduleBarDatePicker from './ScheduleBarDatePicker';
import {
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { format } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
export default function ScheduleBar(props) {
    const [value, setValue] = React.useState(1);
    const [pickerState, setPickerState] = React.useState(false);
    const getCurrentDate = () => {
        let date = new Date();
        date.setDate(date.getDate());
        const formattedDate = format(date, "yyyy-MM-dd");
        console.log(formattedDate);
        /*  let scheduleDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(); */
        props.getTrainingBydate(formattedDate);
    }
    const getYesterdaysDate = () => {
        let date = new Date();
        date.setDate(date.getDate() - 1);
        /* let scheduleDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(); */
        const formattedDate = format(date, "yyyy-MM-dd");
        console.log(formattedDate);
        props.getTrainingBydate(formattedDate);
    }
    const getTomorrowsDate = () => {
        let date = new Date();
        date.setDate(date.getDate() + 1);
        /* let scheduleDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(); */
        const formattedDate = format(date, "yyyy-MM-dd");
        console.log(formattedDate);
        props.getTrainingBydate(formattedDate);
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const openPicker = () => {
        setPickerState(true);
    }
    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Paper square >
                <Tabs value={value}
                    onChange={handleChange}
                    variant='fullWidth'
                    indicatorColor="primary"
                    textColor="primary">
                    <Tab label="Juče" onClick={getYesterdaysDate} />
                    <Tab label="Danas" onClick={getCurrentDate} />
                    <Tab label="Sutra" onClick={getTomorrowsDate} />
                    {pickerState ?
                        <ScheduleBarDatePicker getTrainingBydate={props.getTrainingBydate} setPickerState={setPickerState} /> :
                        <Tab label='Kalendar Termina' onClick={openPicker}>
                        </Tab>
                    }
                </Tabs>
            </Paper>
            </MuiPickersUtilsProvider>
        </div>
    )
}