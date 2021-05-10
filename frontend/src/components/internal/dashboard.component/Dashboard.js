import React, { useState, useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { UserContext } from '../../external/PrivateRoute';
import { ServiceContext } from './../../../services/ServiceContext';


const Dashboard = props => {
  const services = useContext(ServiceContext);
  const { currentUser, fetchUser } = useContext(UserContext);
  const [ clubName, setClubName] = useState(currentUser.club ? currentUser.club.clubName : '');
  const [ openDialog, setOpenDialog ] = useState(!!currentUser.club);
  const [ validationError, setValidationError] = useState({});
  const [ club, setClub ] = useState(currentUser.club || {});
  const [ clubCoaches, setClubCoaches ] = useState(club.coaches || []);
  const [ newClubCoaches, setNewClubCoaches ] = useState(club.newCoaches || []);

  useEffect(() => {
    if(!currentUser.club) return;
    fetchClub();
  }, []);

  const handleCoachesChanges = e => {
    const changedCoach = e.target.name;
    const newCoachesList = newClubCoaches.filter(coach => {
      return;
    })
  }

  const fetchClub = async () => {
    const currentClub = await services.clubService.fetchClub(currentUser.club.clubId);
    setClub(currentClub);
  }

  const handleChange = e => {
    setClubName(e.target.value);
  }

  const validation = () => {
    let isValidClubName = true;
    const error = {}
      if (!clubName || clubName.trim().length < 2) {
        error.text = 'Naziv kluba mora da sadrži najmanje 2 karaktera.';
        error.notValid = true;
        isValidClubName = false;
      }
      setValidationError(error);
      return isValidClubName;
  }

  const addClub = async () => {
    const newClub = {
      owner: currentUser,
      coaches: [currentUser],
      newCoaches: []
    }
    await services.clubService.addClub(newClub);
    setOpenDialog(false);
  }

  const editClub = async () => {
    const newClub = {};
    const listOfCoachesIds = [];

    if(club.coaches) {
      listOfCoachesIds = [...club.coaches.map(item => item._id)];
    }
    
    if(listOfCoachesIds.includes(currentUser._id)) {
      newClub = { ...club, clubName: clubName }
    }
    await services.clubService.editClub(newClub);
    setOpenDialog(false);
  }

  const addOrEditClub = async () => {
    if(club.clubId) return editClub();
    addClub();
  }

  const submitClub = e => {
    e.preventDefault();
    const noError = validation();
    if(!noError) return;
    addOrEditClub();
  }

  const closeDialog = () => {
    setOpenDialog(false);
  }
  
  return (
    <div>
      <h1>This is my dashboard</h1>
      <h1>Owner: {props.user.name}</h1>
      <h2>Naziv kluba: {clubName}</h2>
      <h3>Coaches:</h3>

      <Dialog open={openDialog}>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            onChange={handleChange}
            margin="dense"
            defaultValue={clubName}
            label="Unesite naziv kluba"
            helperText={validationError.text}
            error={false}
          />
        </DialogContent>
          <DialogActions /* className='dialogButtons' */ style={{ display: 'flex', justifyContent: 'center' }}>
            <Button 
              onClick={submitClub} 
              variant='contained' 
              color="primary"> Sačuvaj </Button>
            <Button 
              onClick={closeDialog} 
              variant='contained' 
              color="secondary"> Otkaži </Button>
          </DialogActions>
      </Dialog>
    </div>
  )
}

export default Dashboard
