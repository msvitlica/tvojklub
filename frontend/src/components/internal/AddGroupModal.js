import React from 'react';
import {
    Modal,
    Button,
    TextField,
    Grid,
    Typography
} from '@material-ui/core';

function AddGroupModal(props) {
    const [open] = React.useState(true);
    const [groupName, setGroupName] = React.useState('');
    const [statusMessage, setStatusMessage] = React.useState('');
    const { history } = props;

    const onInputChange = (e) => {
        setGroupName(e.target.value);
    }

    const onSaveGroup = () => {
        fetch('http://localhost:3001/groups', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: groupName }),
        })
            .then(response => {
                if (!response.ok) {
                    if (groupName.trim()) {
                        setStatusMessage('Grupa pod tim imenom postoji. Molimo izaberite drugo ime!');
                        onModalMessageChange();
                    }
                    else {
                        setStatusMessage('Unesite ispravno ime!');
                        onModalMessageChange();
                    }
                }
                else {
                    setGroupName('');
                    closeModal();
                }
            })
            .catch((error) => {
                alert(error.msg);
            });
    }

    const closeModal = () => {
        history.push('/groups');
        window.location.reload(true);
    }
    const onModalMessageChange = () => {
        let message = document.querySelector('div.MuiGrid-item p.MuiTypography-root.modalMessage');
        message.style.display = 'block';
        setTimeout(() => {
            message.style.display = 'none';
        }, 5000)

    }

    const body = (
        <div className="modalDialog">
            <Grid container direction="column">
                <Typography className="closeModal" onClick={closeModal}>x</Typography>
                <Grid xs={12} item>
                    <Typography className="modalHeader" variant="h3">Unos Nove Grupe</Typography>
                </Grid>
                <Grid className="groupInfo" xs={12} item container>
                    <Grid className="modalInputTxt" xs={12} item>
                        <TextField onChange={onInputChange} label="Naziv Grupe" name="groupName" variant="outlined" />
                    </Grid>
                    <Grid xs={12} item>
                        <Grid xs={12} item container>
                            <Grid xs={12} sm={3} item>
                                <Button className="saveModal modalBtn" variant='contained' onClick={onSaveGroup}>Sačuvaj</Button>
                            </Grid>
                        </Grid>
                        <Grid xs={12} item>
                            <Typography className="modalMessage">{statusMessage}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
    return (
        <Modal open={open}>
            {body}
        </Modal>
    )
}

export default AddGroupModal;