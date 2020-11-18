import React from 'react';
import { Paper, Tabs, Tab, TextField } from '@material-ui/core';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
export default function ScheduleBar(props) {
    const [value, setValue] = React.useState(1);
    const getCurrentDate = () => {
        let date = new Date();
        date.setDate(date.getDate());
        let scheduleDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        props.getTrainingBydate(scheduleDate);
    }
    const getYesterdaysDate = () => {
        let date = new Date();
        date.setDate(date.getDate() - 1);
        let scheduleDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        props.getTrainingBydate(scheduleDate);
    }
    const getTomorrowsDate = () => {
        let date = new Date();
        date.setDate(date.getDate() + 1);
        let scheduleDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        props.getTrainingBydate(scheduleDate);
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const onSelectTab = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    return (
        <div>
            <Paper variant="outlined">
                <Tabs value={value} onChange={handleChange} variant='fullWidth' indicatorColor="primary" textColor="primary">
                    <Tab label="Juče" onClick={getYesterdaysDate} {...onSelectTab(0)} />
                    <Tab label="Danas" onClick={getCurrentDate} {...onSelectTab(1)} />
                    <Tab label="Sutra" onClick={getTomorrowsDate} {...onSelectTab(2)} />
                    <Tab icon={<EventNoteOutlinedIcon />} {...onSelectTab(3)}/>
                </Tabs>
            </Paper>
        </div>
    )
}