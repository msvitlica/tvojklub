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
    console.log(data.members)
  }
  useEffect(() => {
    fetchData()
  }, [])
  const rows = members.map(el => (
    {
      id: el.id,
      Ime: el.firstName,
      Prezime: el.lastName,
      DatumRođenja: el.dateOfBirth,
      Grupa: el.group
    }
  ));
  return (
    <Grid container direction='column'>
      <Grid item xs={1} sm={2}></Grid>
      <Grid item xs={3}
      >
        <Link to='members/newMember'>
          <Button className='btn' color="primary" variant='text'>Unos novog člana</Button>
        </Link>
      </Grid>
      <div style={{ width: '100%', height: 400 }}>
        <DataGrid
          columns={[
            { field: 'Ime', type: 'string', },
            { field: 'Prezime', type: 'string', },
            { field: 'DatumRođenja', type: 'string', },
            { field: 'Grupa', type: 'string', },
          ]}
          rows={rows}
          checkboxSelection
          pageSize={5}
        />
      </div>
      <Grid item xs={1} sm={2}></Grid>
    </Grid>
  )

}