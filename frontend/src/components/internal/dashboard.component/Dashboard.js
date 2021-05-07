import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const Dashboard = props => {

  const submitClubName = () => {
    console.log('submitClubName handler', props.user);
  }

  const handleClose = () => {
    console.log('handleClose handler', props.user);
  }
  
  return (
    <div>
      <h1>This is my dashboard</h1>
      <h1>Owner: {props.user.name}</h1>
      <h2>Naziv kluba: {props.user.club || 'moraš unijeti naziv kluba'}</h2>
      <h3>Coaches:</h3>

      <Dialog open={!!props.user.club}>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            // onChange={onInputChange}
            margin="dense"
            defaultValue={'tvojklub'}
            label="Unesite naziv kluba"
            // helperText={'ovo je naziv kluba'}
            error={false}
          />
        </DialogContent>
          <DialogActions /* className='dialogButtons' */ style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={submitClubName} variant='contained' color="primary"> Sačuvaj </Button>
            <Button onClick={handleClose} variant='contained' color="secondary"> Otkaži </Button>
          </DialogActions>
      </Dialog>
    </div>
  )
}

export default Dashboard
