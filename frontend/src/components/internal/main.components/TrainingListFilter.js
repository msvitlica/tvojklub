import React, { useState, useEffect } from 'react';
import { Paper, Button, IconButton } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import TrainingDatePicker from './TrainingDatePicker';
import { dateFormat, calculateDate } from '../../../helpers/helpersMethods';

export default function TrainingListFilter(props) {
    const date = new Date(dateFormat(new Date().getTime()));
    const [datePlaceholder, setDatePlaceholder] = useState(props.selectedDate);

    const handleCurrentDate = () => {
        setDatePlaceholder(new Date(date));
    }
    const handleTomorrowsDates = () => {
        setDatePlaceholder(calculateDate(new Date(props.selectedDate), 1));
    };
    const handleYesterdaysDate = () => {
        setDatePlaceholder(calculateDate(new Date(props.selectedDate), -1));
    };

    useEffect(() => {
        props.handleDateChange(datePlaceholder)
    }, [datePlaceholder]);

    return (
        <div>
            <Paper variant="outlined" >
                <div className='training-filter-bar'>
                    <Button className='today-btn' variant='outlined' color='primary' onClick={handleCurrentDate}>Danas</Button>
                    <IconButton onClick={handleYesterdaysDate}><ChevronLeftIcon color='primary' /></IconButton>
                    <IconButton onClick={handleTomorrowsDates} > <ChevronRightIcon color='primary' /> </IconButton>
                    <TrainingDatePicker selectedDate={props.selectedDate} handleDateChange={props.handleDateChange} />
                </div>
            </Paper>
        </div>
    )
}
