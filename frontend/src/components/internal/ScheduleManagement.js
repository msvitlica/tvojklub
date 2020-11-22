import React from 'react';
import {
    Grid,
    Button
} from '@material-ui/core/';
import { DataGrid } from '@material-ui/data-grid';



class ScheduleManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schedule: []
        }
    }

    componentDidMount = () => {
        fetch('http://localhost:3001/schedule-management')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    schedule: data.schedule
                })
            });
    }

    render() {
        const columns = [
            { field: 'term', headerName: 'Vrijeme Termina', width: 160 },
            { field: 'duration', headerName: 'Dužina Treninga', width: 160 },
            {
                field: 'description',
                headerName: 'Grupe',
                description: 'This column has a value getter and is not sortable.',
                sortable: false,
                width: 160,
            }
        ]
        const rows = this.state.schedule.map((term, index) => {
            return {
                id: index,
                term: `${term.startTime} - ${term.endTime}`,
                duration: term.duration,
                description: term.groups
            }
        });
        return (
            <Grid container direction="column">
                <Grid item xs={1} sm={2}> </Grid>
                <Grid item xs={3}>
                    <Button className="btn" href='/schedule-management/new-schedule' color="primary" variant="outlined">Kreiraj Novi Raspored</Button>
                </Grid>
                <Grid className="dataGrid">
                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection></DataGrid>
                </Grid>
                <Grid item xs={1} sm={2}> </Grid>
            </Grid>
        )
    }
}

export default ScheduleManagement;