import React, { useState, useEffect } from 'react';
import { Paper, Button, IconButton } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import TrainingDatePicker from './TrainingDatePicker';
import helperMethods from '../../../helpers/helpersMethods';

export default function TrainingListFilter(props) {
    const [datePlaceholder, setDatePlaceholder] = useState(new Date().toLocaleDateString());

    const handleCurrentDate = () => {
        setDatePlaceholder(new Date().toLocaleDateString());
    }
    const handleTomorrowsDates = () => {
        setDatePlaceholder(helperMethods.calculateDate(new Date(props.selectedDate), 1));
    };
    const handleYesterdaysDate = () => {
        setDatePlaceholder(helperMethods.calculateDate(new Date(props.selectedDate), -1));
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
