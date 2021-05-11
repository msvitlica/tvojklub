import React, { useState, useEffect, useContext } from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';

import {
    Button,
    TextField, 
    Dialog, 
    DialogActions, 
    DialogContent
} from '@material-ui/core';

import { ServiceContext } from './../../services/ServiceContext';

export const UserContext = React.createContext();

function PrivateRoute({ component: Component, ...rest }) {

    const services = useContext(ServiceContext);
    const [ currentUser, setCurrentUser ] = useState({});
    const [ fetching, setFetching ] = useState(true);
    const [ openDialog, setOpenDialog ] = useState(!currentUser.club || !currentUser.club.clubName);
    const [ validationError, setValidationError] = useState({});
    const [ clubName, setClubName] = useState('');
    const [ club, setClub ] = useState(currentUser.club || {});
    const [ noUser, setNoUser ] = useState('');

    const fetchUser = async () => {
        try {
            const res = await fetch('/api/current_user');
            if(fetching) {
                const user = await res.json();
                setCurrentUser(user);
                console.log(currentUser);
            }
            setFetching(false);
        } catch {
            setNoUser('nema korisnika');
            console.log('nema korisnika');
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    const handleChange = e => {
        setClubName(e.target.value);
    }

    const closeDialog = () => {
        setOpenDialog(false);
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
            clubName: clubName,
            owner: currentUser._id
        }
        setClub(newClub);
        setOpenDialog(false);        
        await services.clubService.addClub(club);
    }

    const editClub = async () => {
        const newClub = {};
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
    
    return (
        <UserContext.Provider value={{ currentUser }}>
            <div>
                <Route
                    { ...rest } 
                    render={ () => { if (fetching && currentUser === null) return <h1>Fetching...</h1>} }/>
                <Route
                    { ...rest } 
                    render={ () => { if (currentUser && !fetching) return <Component user={currentUser} />} }/>
                <Route
                    { ...rest } 
                    render={ () => { if (!currentUser && !fetching) return <Redirect to="/login" />} }/>
                <Route
                    { ...rest }
                    render={ () => { if(noUser) return <Redirect to='/login' /> }}
                />
            </div>
            <Dialog open={false}>
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
        </UserContext.Provider>
    );
}

export default PrivateRoute;