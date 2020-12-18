import React from 'react'
import Button from '@material-ui/core/Button';
function NewGroupButton(props) {
    const handleClickOpen = () => {
        let groupId= props.groupId;
        props.handleClickOpen(groupId);
    };
    return (
        <div>
           <Button variant='outlined' color='primary' onClick={handleClickOpen}>Dodaj Novu Grupu</Button> 
        </div>
    )
}

export default NewGroupButton
