import React, { useState, useEffect,useContext} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import GroupSnackbar from './GroupSnackbar';
import  {ServiceContext} from './../../../services/ServiceContext'

export default function AddGroupDialog(props) {
    const [draftGroupName, setDraftGroupName] = useState(props.group.name);
    const [groupNameError, setGroupNameError] = useState('');
    const [actionPostMessage, setActionPostMessage] = useState('');
    const [actionPutMessage, setActionPutMessage] = useState('');
    const [open, setOpen] = useState(false);
    const services=useContext(ServiceContext);
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

    const add_edit_Group = async () => {
        if (props.group._id) {
            const editedData = await services.groupService.editGroup(props.group._id,draftGroupName);
            setActionPutMessage(editedData);
            handleClose();
            setDraftGroupName(draftGroupName);
        } else {
            const postedData = await services.groupService.addGroup(draftGroupName)
            setActionPostMessage(postedData);
            handleClose();
            setDraftGroupName('');
        }
    }
    const validate = () => {
        let isValid = true;
        const groupNameError = {};
        if (draftGroupName.trim().length < 2) {
            groupNameError.emptyInput ='Naziv grupe treba da sadrzi bar 2 karaktera.';
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
            add_edit_Group();
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
                <GroupSnackbar open={open} actionMessage={props.group._id ? actionPutMessage  : actionPostMessage}  closeSnackbar={closeSnackbar}></GroupSnackbar>
            </div>
        </div>
    )
}