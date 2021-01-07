import React, { useEffect, useState } from 'react';
import { IconButton, Grid, Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddGroupModal from './AddGroupModal';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

export default function GroupList(props) {
    const [open, setOpen] = useState(false);
    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState('');
    const [actionDeleteMessage, setActionDeleteMessage] = useState('');
    const [snackOpen, setSnackOpen] = useState(false);

    const fetchData = async () => {
        let APIurl = 'http://localhost:3001/groups';
        const res = await fetch(APIurl)
        const data = await res.json();
        setGroups(data)
    };
    useEffect(() => {
        fetchData();
    }, []);

    const onDeleteGroup = async (id) => {
        const fetchedGroup = await fetch(`http://localhost:3001/groups/${id}`, {
            method: 'DELETE',
        });
        const res = await fetchedGroup.json();
        setActionDeleteMessage(res);
        setSnackOpen(true);
        let filteredGroups = groups.filter(el => el._id !== id);
        setGroups(filteredGroups);
    }
    const closeSnackBar = () => {
        setSnackOpen(false);
    }
    const handleClose = async () => {
        setOpen(false);
        let millisecondsToWait = 1000;
        setTimeout(() => {
            fetchData();
        }, millisecondsToWait);
    };

    const handleClickOpen = async () => {
        setGroup('')
        setOpen(true);
    }

    const fetchTargetGroup = async (id) => {
        const APIurl = 'http://localhost:3001/groups/edit/' + id;
        const res = await fetch(APIurl);
        const data = await res.json();
        setGroup(data);
        console.log(data)
    }
    useEffect(() => {
        if (group._id) {
            fetchTargetGroup(group._id);
        }
    }, [])
    const onEditGroup = async (id) => {
        await fetchTargetGroup(id);
        setOpen(true);
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
                <AddGroupModal group={group} open={open} handleClose={handleClose} onEditGroup={onEditGroup} ></AddGroupModal>
                <div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={snackOpen}
                        autoHideDuration={6000}
                        onClose={closeSnackBar}
                        message={actionDeleteMessage.msg}
                        action={
                            <React.Fragment>
                                <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnackBar}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </React.Fragment>
                        }
                    />
                </div>
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