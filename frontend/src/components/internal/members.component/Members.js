import React, { useState, useEffect, useContext } from 'react';
import MaterialTable from 'material-table';
import { Link } from 'react-router-dom';
import { IconButton, Button, Grid } from '@material-ui/core';
//SLAVEN
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
//SLAVEN

// Including Service Context
import { ServiceContext } from './../../../services/ServiceContext';

export default function Members(props) {
  const [members, setMemberList] = useState([]);
  const services = useContext(ServiceContext);
  
  // Get data from backend
  const fetchMembers = async () => {
    const allMembers = await services.memberService.getAllMembers();
    setMemberList(allMembers);
    console.log(allMembers);
  }

  //DELETE MEMBER
  const onDeleteMember = async (id) => {
    await services.memberService.deleteMember(id);
    let filteredMembers = members.filter(el => el._id !== id);
    services.messageService.showSuccessMessage('Član uspješno obrisan!')
    setMemberList(filteredMembers);
}

  useEffect(() => {
    fetchMembers()
  }, []);

  const editDeleteBtnContainer = (elId) => (
    <React.Fragment>
      <Link to={`/members/edit/${elId}`}>
        <IconButton
          aria-label='modify member'>
          <EditIcon />
        </IconButton>
      </Link>
      <IconButton
        onClick={() => onDeleteMember(elId)} 
        aria-label='delete member'>
        <DeleteIcon />
      </IconButton>
    </React.Fragment>
  )

  const rows = members.map(el => (
    {
      id: el._id,
      firstName: el.firstName,
      lastName: el.lastName,
      dateOfBirth: new Date(el.dateOfBirth).toLocaleDateString(),
      group: el.group,
      options: editDeleteBtnContainer(el._id)
    }
  ));

  const columns = [
    { field: 'firstName', title: 'Ime' },
    { field: 'lastName', title: 'Prezime' },
    { field: 'dateOfBirth', title: 'Datum rođenja' },
    { field: 'group', title: 'Grupa' },
    { field: 'options', title: 'Opcije'}
  ]
  return (
    <Grid container direction='column'>
      <Grid item xs={1} sm={2}></Grid>
      <Grid item xs={3}>
        <Link to='members/newMember'>
          <Button className='btn' color="primary" variant='outlined'>Dodaj novog člana</Button>
        </Link>
      </Grid>   

      <Grid item xs={12}>
        <MaterialTable 
          data={rows}
          columns={columns}
          options={{
            toolbar: false
          }}
        />
      </Grid>
      <Grid item xs={1} sm={2}></Grid>
    </Grid>
  )
}