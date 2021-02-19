import React, { useState, useContext, useEffect } from 'react';
import {
    Grid,
    Button,
    IconButton
} from '@material-ui/core/';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { DataGrid } from '@material-ui/data-grid';
import { ServiceContext } from '../../../services/ServiceContext';



function ScheduleManagement(props) {
    const [schedule, setSchedule] = useState([]);
    const service = useContext(ServiceContext);

    const abortController = new AbortController();

    const fetchData = async () => {
        const schedule = await service.scheduleServices.getAllSchedule({ signal: abortController.signal });
        setSchedule(schedule);
    }

    useEffect(() => {
        fetchData();
        return () => {
            abortController.abort();
        }
    }, []);


    const onDeleteSchedule = async (id) => {
        const deleteScheduleRequest = await service.scheduleServices.deleteSchedule(id);
        setSchedule(schedule.filter(sched => sched._id !== id));
        service.messageService.showSuccessMessage(deleteScheduleRequest.msg);
    }

    const onEditSchedule = async (id) => {
        props.history.push(`/schedule-management/edit/${id}`);
    }


    const columns = [
        { field: 'term', headerName: 'Vrijeme Termina', width: 160 },
        { field: 'duration', headerName: 'Dužina Treninga', width: 160 },
        { field: 'description', headerName: 'Opis', width: 160 },
        { field: 'groups', headerName: 'Grupe', width: 160, },
        {
            field: 'actions',
            headerName: 'Opcije',
            sortable: false,
            width: 160,
            renderCell: (params) => (
                <React.Fragment>
                    <IconButton onClick={() => onEditSchedule(params.value)} aria-label="modify">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onDeleteSchedule(params.value)} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </React.Fragment>
            )
        }
    ]
    const rows = schedule.map((term) => {
        return {
            id: term._id,
            term: `${term.startTime} - ${term.endTime}`,
            duration: term.trainingDuration,
            groups: term.attendedGroups.map(group => group.groupId),
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

export default ScheduleManagement;