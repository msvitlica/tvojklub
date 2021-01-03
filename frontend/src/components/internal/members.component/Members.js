import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';


export default function Members(props) {
  const APIurl = 'http://localhost:3001/members';
  const [members, setMemberList] = useState([]);
  const fetchMembers = async () => {
    const res = await fetch(APIurl);
    const data = await res.json()
    setMemberList(data.members)
  };
  useEffect(() => {
    fetchMembers()
  }, []);

  const rows = members.map(el => (
      {
        id: el._id,
        firstName: el.firstName,
        lastName: el.lastName,
        dateOfBirth: new Date(el.dateOfBirth).toLocaleDateString(),
        group:el.group
      }
  
  ));
  const columns = [
    { field: 'firstName', title: 'Ime' },
    { field: 'lastName', title: 'Prezime' },
    { field: 'dateOfBirth', title: 'Datum rođenja' },
    { field: 'group', title: 'Grupa' }
  ]
  return (
    <Grid container direction='column'>
      <Grid item xs={1} sm={2}></Grid>
      <Grid item xs={3}>
        <Link to='members/newMember'>
          <Button className='btn' color="primary" variant='text'>Dodaj novog člana</Button>
        </Link>
      </Grid>
      <Grid item xs={12}>
        <MaterialTable 
          data={rows}
          columns={columns}
          options={{
            toolbar:false
          }}
        />
      </Grid>
      <Grid item xs={1} sm={2}></Grid>
    </Grid>
  )

}