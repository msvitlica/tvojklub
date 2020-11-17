import React from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';
export default class ScheduleBar extends React.Component {
    getCurrentDate = () => {
        let date = new Date();
        date.setDate(date.getDate());
        let scheduleDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        this.props.getTrainingBydate(scheduleDate);
    }
    getYesterdaysDate = () => {
        let date = new Date();
        date.setDate(date.getDate() - 1);
        let scheduleDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        this.props.getTrainingBydate(scheduleDate);
    }
    getTomorrowsDate = () => {
        let date = new Date();
        date.setDate(date.getDate() + 1);
        let scheduleDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        this.props.getTrainingBydate(scheduleDate);
    }
    render() {
        return (
            <div>
                <Paper variant="outlined">
                    <Tabs value={this.props.tabValue} variant='fullWidth' indicatorColor="primary" textColor="primary">
                        <Tab label="Yesterday" onClick={this.getYesterdaysDate} />
                        <Tab label="Today" onClick={this.getCurrentDate} />
                        <Tab label="Tomorrow" onClick={this.getTomorrowsDate} />
                        {/* <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker inline"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        /> */}
                    </Tabs>
                </Paper>
            </div>
        )
    }
}