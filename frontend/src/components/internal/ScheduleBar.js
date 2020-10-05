import React from 'react';
import {Paper,Tabs,Tab}from '@material-ui/core'
export  default class ScheduleBar extends React.Component {
    render() {
        const {tabValue}= this.props;
        return (
            <div>
                 <Paper variant="outlined">
                        <Tabs  value= {tabValue.value}indicatorColor="primary"  textColor="primary">
                            <Tab label="Yesterday" />
                            <Tab label="Today" />
                            <Tab label="Costom" />
                        </Tabs>
                    </Paper>
            </div>
        )
    }
}