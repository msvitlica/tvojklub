import React, { useEffect, useState, useContext } from 'react';
import { IconButton, Grid, Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddGroupDialog from './AddGroupDialog';
import Snackbar from './../snackbar.components/Snackbar';


// Including Service Context
import { ServiceContext } from './../../../services/ServiceContext';


export default function GroupList(props) {
    const [openDialog, setDialogOpen] = useState(false);
    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState('');  

    const services = useContext(ServiceContext);

    const fetchData = async () => {
        const allGroups = await services.groupService.getAllGroups();
        setGroups(allGroups)
    };
    useEffect(() => {
        fetchData();
    }, []);

    const onDeleteGroup = async (id) => {
        await services.groupService.deleteGroup(id);
        let filteredGroups = groups.filter(el => el._id !== id);
        services.messageService.showSuccessMessage('Grupa uspješno obrisana!')
        setGroups(filteredGroups);
    }

    const handleClose = async () => {
        setDialogOpen(false);
        let millisecondsToWait = 1000;
        setTimeout(() => {
            fetchData();
        }, millisecondsToWait);
    };

    const handleClickOpen = async () => {
        setGroup('')
        setDialogOpen(true);
    }

    const fetchTargetGroup = async (id) => {
        const fetchedGroup = await services.groupService.getGroupById(id);
        setGroup(fetchedGroup);
    }
    useEffect(() => {
        if (group._id) {
            fetchTargetGroup(group._id);
        }
    }, [])
    const onEditGroup = async (id) => {
        await fetchTargetGroup(id);
        setDialogOpen(true);
    }
    const rows = groups.map(el => (
        {
            id: el._id,
            name: el.name,
            actions: el._id
        }
    ))
    return (
        <Grid container direction='column'>
            < Grid item>
                <Grid item>
                    <Button variant='outlined' color='primary' onClick={handleClickOpen}>Dodaj Novu Grupu</Button>
                </Grid>
                <AddGroupDialog group={group} open={openDialog} handleClose={handleClose} onEditGroup={onEditGroup} ></AddGroupDialog>
            </Grid>
            <div style={{ width: '100%', height: 400 }}>
                <DataGrid
                    columns={[
                        { field: 'name', headerName: 'Naziv grupe', width: 160 },
                        {
                            field: 'actions', headerName: 'Opcije', width: 160,
                            renderCell: (params) => (
                                <React.Fragment>
                                    <IconButton onClick={() => onEditGroup(params.value)} aria-label="modify">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => onDeleteGroup(params.value)} aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </React.Fragment>
                            )
                        }
                    ]}
                    rows={rows}
                    disableSelectionOnClick
                    pageSize={5}
                />
            </div>
        </Grid>
    )
}

