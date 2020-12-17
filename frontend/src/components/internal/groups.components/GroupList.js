import React, { useEffect, useState } from 'react';
import { IconButton, Grid } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddGroupModal from './AddGroupModal';
import NewGroupButton from './NewGroupButton';

export default function GroupList(props) {
    const [open, setOpen] = useState(false);
    const [groups, setGroups] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [groupId, setGroupId] = useState('');
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
        await fetch(`http://localhost:3001/groups/${id}`, {
            method: 'DELETE',
        });
        let filteredGroups = groups.filter(el => el._id !== id);
        setGroups(filteredGroups);
    }
    const handleClose = () => {
        setOpen(false);
        window.location.reload(true);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const fetchTargetGroup = async (id) => {
        const APIurl = `http://localhost:3001/groups/edit/${id}`;
        const res = await fetch(APIurl);
        const data = await res.json();
        setGroupName(data.name);
        setGroupId(data._id);
    }
    useEffect(() => {
        if (groupId) {
            fetchTargetGroup(groupId);
        }
    }, [])
    const onEditGroup = (id) => {
        fetchTargetGroup(id);
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
            <Grid item>
                <NewGroupButton handleClickOpen={handleClickOpen}></NewGroupButton>
                <AddGroupModal groupId={groupId} groupName={groupName} open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} onEditGroup={onEditGroup}></AddGroupModal>
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

