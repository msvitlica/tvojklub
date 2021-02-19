import React, { useState, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

export default function Snackbars(props) {
    return (
        <div>
            <Snackbar open={props.open} autoHideDuration={5000} onClose={props.onClose} >
                <Alert onClose={props.onClose} variant="filled" severity={props.severity}>{props.message}</Alert>
            </Snackbar>
        </div>
    )
}