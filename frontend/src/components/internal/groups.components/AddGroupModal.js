import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import { Modal, Button, TextField, Grid, Typography } from '@material-ui/core';

export default function AddGroupModal(props) {
    const history = useHistory();
    const [open] = useState(true);
    const [groupName, setGroupName] = useState('');
    const [groupId, setGroupId] = useState('');
    const [groupNameError, setGroupNameError] = useState({});
    const { match } = props;

    const onInputChange = (e) => {
        setGroupName(e.target.value);
    }
    const fetchTargetGroup = async () => {
        const APIurl = `http://localhost:3001/groups/edit/${match.params.id}`;
        const res = await fetch(APIurl);
        const data = await res.json();
        setGroupName(data.name);
        setGroupId(data._id);
    }
    useEffect(() => {
        if (match.params.id) {
            fetchTargetGroup();
        }
    }, []);

    const postGroup = async () => {
        if (groupId) {
            fetch(`http://localhost:3001/groups/edit/${match.params.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: groupId, name: groupName })
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
        closeModal();
    }

    const closeModal = () => {
        history.push('/groups');
        window.location.reload(true);
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
    const body = (
        <div className="modalDialog">
            <Grid container direction="column">
                <Typography className="closeModal" onClick={closeModal}>x</Typography>
                <Grid xs={12} item>
                    <Typography className="modalHeader" variant='h5'>Unos Nove Grupe</Typography>
                </Grid>
                <form onSubmit={submitGroup} noValidate>
                    <Grid xs={12} item container>
                        <Grid className="modalInputTxt" xs={10} item>
                            <TextField onChange={onInputChange}
                                label="Naziv Grupe"
                                name="groupName"
                                variant="outlined"
                                value={groupName}
                                helperText={groupNameError.emptyInput}
                                error={groupNameError.notValid}
                            />
                        </Grid>
                        <Grid xs={12} item>
                            <Grid xs={12} item container className='saveModal'>
                                <Grid xs={12} sm={4} item >
                                    <Button variant='contained' type='submit' color='primary' >Sačuvaj</Button>
                                </Grid>
                                <Grid xs={12} sm={4} item>
                                    <Button variant='contained' color='secondary' onClick={closeModal}>Otkaži</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </div>
    )
    return (
        <Modal open={open}>
            {body}
        </Modal>
    )
}