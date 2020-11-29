import React from 'react';
import {
    Grid,
    Button,
    IconButton
} from '@material-ui/core/';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { DataGrid } from '@material-ui/data-grid';



class ScheduleManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schedule: []
        }
    }

    fetchData = async () => {
        let response = await fetch('http://localhost:3001/schedule-management');
        let data = await response.json();
        this.setState({
            schedule: data
        })
    }

    componentDidMount = () => {
        this.fetchData();
    }

    onDeleteSchedule = async (id) => {
        let req = await fetch(`http://localhost:3001/schedule-management/delete/${id}`, {
            method: 'DELETE'
        });
        this.setState({
            schedule: this.state.schedule.filter(el => el._id !== id)
        })
    }

    onEditSchedule = async (id) => {
        // let req = await fetch(`http://localhost:3001/schedule-management/edit/${id}`);
        // let data = await req.json();
        this.props.history.push(`/schedule-management/edit/${id}`);
    }

    render() {
        const columns = [
            { field: 'term', headerName: 'Vrijeme Termina', width: 160 },
            { field: 'duration', headerName: 'Dužina Treninga', width: 160 },
            { field: 'description', headerName: 'Opis', width: 160 },
            {
                field: 'groups',
                headerName: 'Grupe',
                description: 'This column has a value getter and is not sortable.',
                sortable: false,
                width: 160,
            },
            {
                field: 'actions',
                headerName: 'Opcije',
                width: 160,
                renderCell: (params) => (
                    <React.Fragment>
                        <IconButton onClick={() => this.onEditSchedule(params.value)} aria-label="modify">
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => this.onDeleteSchedule(params.value)} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </React.Fragment>
                )
            }
        ]
        const rows = this.state.schedule.map((term) => {
            return {
                id: term._id,
                term: `${term.startTime} - ${term.endTime}`,
                duration: term.trainingDuration,
                groups: term.attendedGroups.map(group => group.name),
                description: term.aboutSchedule,
                actions: term._id
            }
        });
        return (
            <Grid container direction="column">
                <Grid item xs={1} sm={2}> </Grid>
                <Grid item xs={12} sm={3}>
                    <Button className="btn" href='/schedule-management/new-schedule' color="primary" variant="outlined">Kreiraj Novi Raspored</Button>
                </Grid>
                <Grid item className="dataGrid">
                    <DataGrid rows={rows} columns={columns} pageSize={5} disableSelectionOnClick></DataGrid>
                </Grid>
                <Grid item xs={1} sm={2}> </Grid>
            </Grid>
        )
    }
}

export default ScheduleManagement;