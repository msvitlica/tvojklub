import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
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
  console.log(rows)
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        columns={[
          { field: 'id', type: 'string', width: 90 },
          { field: 'firstName', type: 'string', width: 140 },
          { field: 'lastName', type: 'string', width: 140 },
          { field: 'dateOfBirth', type: 'date', width: 140, },
          { field: 'group', type: 'string', width: 140, },
        ]}
        rows={rows}
        checkboxSelection
        pageSize={3}
      />
    </div>
  )

}