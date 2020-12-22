import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function GroupSnackbar(props) {
 
  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
   props.closeSnackbar();
  };

  return (
    <div>
   {/*    <Button onClick={handleClick}>Open simple snackbar</Button> */}
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={props.open}
        autoHideDuration={6000}
        onClose={handleClose}
        message= {props.actionDraftMessage.msg}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}