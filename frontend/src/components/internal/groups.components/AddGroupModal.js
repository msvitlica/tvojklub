import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import GroupSnackbar from './GroupSnackbar';

export default function AddGroupModal(props) {
    const [draftGroupName, setDraftGroupName] = useState(props.group.name);
    const [groupNameError, setGroupNameError] = useState('');
    const [actionPostMessage, setActionPostMessage] = useState('');
    const [actionPutMessage, setActionPutMessage] = useState('');
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
    const closeSnackbar = () => {
        setOpen(false);
    }

    const postGroup = async () => {
        if (props.group._id) {
            const editedData = await fetch('http://localhost:3001/groups/edit/' + props.group._id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ _id: props.group._id, name: draftGroupName })
            });
            const res = await editedData.json();
            setActionPutMessage(res);
            handleClose();
            setDraftGroupName(draftGroupName);
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
            setActionPostMessage(res);
            handleClose();
            setDraftGroupName('');
        }
    }
    const validate = () => {
        let isValid = true;
        const groupNameError = {};
        if (draftGroupName.trim().length < 2) {
            groupNameError.emptyInput = /* 'Popunite prazno polje.' */ 'Naziv grupe treba da sadrzi bar 2 karaktera.';
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
            console.log(draftGroupName);
        }
    }
    return (
        <div>
            <Dialog open={props.open}>
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
                <GroupSnackbar open={open} actionMessage={props.group._id ? actionPutMessage : actionPostMessage} closeSnackbar={closeSnackbar}></GroupSnackbar>
            </div>
        </div>
    )
}

