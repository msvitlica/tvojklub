import React, { useEffect, useState } from 'react';
import { CardActionArea, CardContent, Grid, Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

export default function GroupList() {
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
    console.log(groups);
    const rows = groups.map(el => (
        {
            id: el._id,
            name: el.name
        }
    ))

    return (
        <Grid container direction='column'>
            <div style={{ width: '100%', height: 400 }}>
                <DataGrid
                    columns={[
                       {filed: 'id', headerName: 'ID Grupe', width:160},
                       {filed: 'name', headerName: 'Naziv grupe', width:160}
                    
                    ]}
                    rows= {rows}
                    disableSelectionOnClick
                    pageSize={5}
                />
                </div>
            </Grid>
    )
}


