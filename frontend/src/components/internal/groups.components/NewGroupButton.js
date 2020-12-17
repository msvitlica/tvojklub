import React from 'react'
import Button from '@material-ui/core/Button';
function NewGroupButton(props) {
    const handleClickOpen = () => {
        props.handleClickOpen();
    };
    return (
        <div>
           <Button variant='outlined' color='primary' onClick={handleClickOpen}>Dodaj Novu Grupu</Button> 
        </div>
    )
}

export default NewGroupButton
