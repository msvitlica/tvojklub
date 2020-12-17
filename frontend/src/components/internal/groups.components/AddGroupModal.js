import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddGroupModal(props) {
  
    const [groupName, setGroupName] = useState('');
    const [groupNameError, setGroupNameError] = useState('');
    const handleClose = () => {
        props.handleClose();
    };
    const onInputChange = (e) =>{
        setGroupName(e.target.value);
    }
    const postGroup = async () => {
        if (props.groupId) {
            fetch('http://localhost:3001/groups/edit/' + props.groupId, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: props.groupId, name: groupName })
            })
        } else {
            fetch('http://localhost:3001/groups', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: groupName }),
            })
        }
        setGroupName('');
        handleClose();
    }
    const validate = () => {
        let isValid = true;
        const groupNameError = {};
        if (groupName.trim().length < 2) {
            groupNameError.emptyInput = 'Naziv grupe treba da sadrzi najmanje dva karaktera.';
            groupNameError.notValid = true;
            isValid = false;
        }
        setGroupNameError(groupNameError);
        return isValid;
    }
    const submitGroup = (e) => {
        e.preventDefault();
        const err = validate();
        if (err) {
            setGroupName(groupName);
            postGroup();
        }
    }
    return (
        <div>
            <Dialog open={props.open}>
                <DialogTitle id="form-dialog-title">Unesite Novu Grupu</DialogTitle>
                <form onSubmit={submitGroup} >
                    <DialogContent>
                        <TextField
                            autoFocus
                            fullWidth
                            onChange={onInputChange}
                            margin="dense"
                            name="groupName"
                            value={groupName}
                            label="Naziv Grupe"
                            helperText={groupNameError.emptyInput}
                            error={groupNameError.notValid}
                        />
                    </DialogContent>
                    <DialogActions /* className='dialogButtons' */ style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type='submit' variant='contained' color="primary"> Sačuvaj </Button>
                        <Button onClick={handleClose} variant='contained' color="secondary"> Otkaži </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}

