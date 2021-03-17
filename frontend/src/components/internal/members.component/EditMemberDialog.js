import React, { useState, useEffect, useContext } from 'react';
import { TextField, Button, InputLabel, Select, MenuItem, FormControl, FormHelperText } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { ServiceContext } from './../../../services/ServiceContext';

const EditMemberDialog = (props) => {

  // const [allGroups, setAllGroups] = useState([])
  const groups = [
    {_id: 1, name: 'takmičari'},
    {_id: 2, name: 'rekreativci '},
    {_id: 3, name: 'ljenčuge'}
  ]

  // const [member, setMember] = useState(props.member);
  const [member, setMember] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    groupId: '',
    attendance: 'unknown'
  });
  
  const services = useContext(ServiceContext);

  const submitEditedMember = e => {
    e.preventDefault();
    console.log('Slavenov submit')
  }

  const handleChange = e => {
    setMember({ ...member, [e.target.name]: e.target.value })
    console.log(member[e.target.name]);
  }
    return (
        <div>
            <Dialog open={props.open}>
                <DialogContent>
                  <TextField
                      name="firstName"
                      value={member.firstName}
                      label="FirstName"
                      variant="filled"
                      margin="normal"
                      onChange={handleChange}
                      helperText=""
                      // error={firstNameError.notValid}
                  />
                  <TextField
                      margin="normal"
                      name="lastName"
                      value={member.lastName}
                      label="LastName"
                      variant="filled"
                      onChange={handleChange}
                      helperText=""
                      // error="error"
                  />
                  <TextField
                      margin="normal"
                      label="Birthday"
                      type="date"
                      name='dateOfBirth'
                      value={member.dateOfBirth}
                      onChange={handleChange}
                      helperText=""
                      // error="error"
                      InputLabelProps={{
                          shrink: true,
                      }} />
                  <FormControl className='dropdown'>
                      <InputLabel className='p-8'>Group</InputLabel>
                      <Select variant="filled"
                          name="groupId"
                          value={member.groupId}
                          onChange={handleChange}
                          // error="group error"
                      >
                          {groups.map(el => (
                              <MenuItem key={el._id} value={el._id}>{el.name}</MenuItem>
                          ))}
                      </Select>
                      <FormHelperText className='validationGroup'>Nema grupe</FormHelperText>
                  </FormControl>
                </DialogContent>
                <DialogActions /* className='dialogButtons' */ style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={submitEditedMember} variant='contained' color="primary"> Sačuvaj </Button>
                    <Button onClick={props.handleClose} variant='contained' color="secondary"> Otkaži </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditMemberDialog