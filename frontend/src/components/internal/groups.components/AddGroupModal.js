import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import GroupSnackbar from './GroupSnackbar';

export default function AddGroupModal(props) {
    const [draftGroupName, setDraftGroupName] = useState(props.group.name);
    const [groupNameError, setGroupNameError] = useState('');
    const [actionDraftMessage, setActionDraftMessage] = useState('');
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setDraftGroupName(props.group.name);
    }, [props.group.name]);

    const handleClose = () => {
        props.handleClose();
    };
    const onInputChange = (e) => {
        setDraftGroupName(e.target.value);
    }
    const openSnackbar = () => {
        setOpen(true);
      };
    const closeSnackbar = ()=> {
        setOpen(false);
    }
    const postGroup = async () => {
        if (props.group._id) {
           fetch('http://localhost:3001/groups/edit/'+props.group._id , {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ _id: props.group._id, name: draftGroupName })
            });
        } else {
            const postedData = await fetch('http://localhost:3001/groups', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: draftGroupName }),
            });
            const res = await postedData.json();
            setActionDraftMessage(res);
        }
        setDraftGroupName('');
        handleClose();
    }
    const validate = () => {
        let isValid = true;
        const groupNameError = {};
        if (draftGroupName.trim().length < 2) {
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
            setDraftGroupName(draftGroupName);
            postGroup();
            openSnackbar();
        }
    }
    return (
        <div>
            <Dialog open={props.open}>
                {/*  <DialogTitle id="form-dialog-title">Unesite Novu Grupu</DialogTitle>     */}
                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        onChange={onInputChange}
                        margin="dense"
                        defaultValue={draftGroupName}
                        label="Naziv Grupe"
                        helperText={groupNameError.emptyInput}
                        error={groupNameError.notValid}
                    />
                </DialogContent>
                <DialogActions /* className='dialogButtons' */ style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={submitGroup} variant='contained' color="primary"> Sačuvaj </Button>
                    <Button onClick={handleClose} variant='contained' color="secondary"> Otkaži </Button>
                </DialogActions>
            </Dialog>
            <div>
                <GroupSnackbar open={open} actionDraftMessage={actionDraftMessage} closeSnackbar={closeSnackbar}></GroupSnackbar>
            </div>
        </div>
    )
}

