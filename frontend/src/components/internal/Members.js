import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Link } from 'react-router-dom';
import { Button,Grid, Table } from '@material-ui/core';
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
      firstName: el.firstName,
      lastName: el.lastName,
      dateOfBirth: el.dateOfBirth,
      group: el.group
    }
  ));
  return (
    <div style={{ height: 400, width: '100%' }}>
      <Link to='members/newMember'>
        <Button variant="contained">New Member</Button>
      </Link>
      <DataGrid
        columns={[
          { field: 'firstName', type: 'string', },
          { field: 'lastName', type: 'string',  },
          { field: 'dateOfBirth', type: 'string',},
          { field: 'group', type: 'string',  },
        ]}
        rows={rows}
        checkboxSelection
        pageSize={5}
      />
    </div>
  )

}