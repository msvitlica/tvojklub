import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';


export default function Members(props) {
  const APIurl = 'http://localhost:3001/members';
  const [members, setMemberList] = useState([]);
  const fetchData = async () => {
    const res = await fetch(APIurl);
    const data = await res.json()
    setMemberList(data.members)
  }
  useEffect(() => {
    fetchData()
  }, [])
  const rows = members.map(el => (
    {
      id: el._id,
      firstName: el.firstName,
      lastName: el.lastName,
      dateOfBirth: el.dateOfBirth,
      group: el.group
    }
  ));
  return (
    <Grid container direction='column'>
      <Grid item xs={1} sm={2}></Grid>
      <Grid item xs={3}>
        <Link to='members/newMember'>
          <Button className='btn' color="primary" variant='text'>New Member</Button>
        </Link>
      </Grid>
      <div style={{ width: '100%', height: 400 }}>
        <DataGrid
          columns={[
            { field: 'firstName', headerName: 'Ime', width: 160 },
            { field: 'lastName', headerName: 'Prezime', width: 160 },
            { field: 'dateOfBirth', headerName: 'Datum rođenja', width: 160 },
            { field: 'group', headerName: 'Grupa', width: 160 },
          ]}
          rows={rows}
          disableSelectionOnClick
          pageSize={5}
        />
      </div>
      <Grid item xs={1} sm={2}></Grid>
    </Grid>
  )

}