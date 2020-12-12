import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router";
import { IconButton, Grid } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export default function GroupList(props) {
    const history = useHistory();
    const [groups, setGroups] = useState([]);
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
    const onEditGroup = async (id) => {
        history.push(`/groups/edit/${id}`);
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
            <div style={{ width: '100%', height: 400 }}>
                <DataGrid
                    columns={[
                        { field: 'name', headerName: 'Naziv grupe', width: 160 },
                        { field: 'actions', headerName: 'Opcije', width: 160,
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


