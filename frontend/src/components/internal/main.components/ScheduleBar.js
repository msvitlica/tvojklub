import React from 'react';
import { Paper, Button, IconButton } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DatePicker from './DatePicker'
export default function ScheduleBar(props) {

    const handleCurrentDate = () => {
        props.getCurrentDate();
    }
    const handleTomorrowsDates = () => {
        props.getTomorrowsDate(props.selectedDate)
    }
    const handleYesterdaysDate = () => {
        props.getYesterdaysDate(props.selectedDate)
    }
    return (
        <div>
            <Paper variant="outlined" >
                <div className='scheduleBar'>
                    <Button className='today-btn' variant='outlined' color='primary' onClick={handleCurrentDate}>Danas</Button>
                    <IconButton onClick={handleYesterdaysDate}><ChevronLeftIcon color='primary' /></IconButton>
                    <IconButton onClick={handleTomorrowsDates} > <ChevronRightIcon color='primary' /> </IconButton>
                    <DatePicker selectedDate={props.selectedDate} handleDateChange={props.handleDateChange} />

                </div>
            </Paper>
        </div>
    )
}
