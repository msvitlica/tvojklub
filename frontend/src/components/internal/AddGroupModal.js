import React from 'react';
import {
    Modal,
    Button,
    TextField
} from '@material-ui/core';

function AddGroupModal(props) {
    const [open] = React.useState(true);
    const [groupName, setGroupName] = React.useState();
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
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        setGroupName('');
        closeModal()
    }

    const closeModal = () => {
        history.push('/groups');
    }

    const body = (
        <div className="modalDialog">
            <TextField onChange={onInputChange} label="Naziv Grupe" name="groupName" variant="outlined" />
            <Button variant='contained' onClick={onSaveGroup}>Sačuvaj</Button>
            <Button variant='contained' onClick={closeModal}>Odbaci</Button>
        </div>
    )
    return (
        <Modal open={open}>
            {body}
        </Modal>
    )
}

export default AddGroupModal;