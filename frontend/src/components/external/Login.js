import React from 'react';
import { useHistory } from 'react-router-dom';

import {
    Grid,
    Typography,
    Button
} from '@material-ui/core';


function Login(props) {
    const history = useHistory();

    const login = () => props.login(() => {
        history.replace('/');
    });

    return (
        <Grid className="loginContainer" container>
            <Grid sm={2} item> </Grid>
            <Grid xs={12} sm={8} direction="column" item container>
                <Typography className="loginLogo" variant="h1">Tvoj Klub</Typography>
                <Button className="btn" variant="outlined" color="secondary" onClick={login} >SIGN IN WITH GOOGLE</Button>
                <Button className="btn" variant="outlined" color="primary" onClick={login} >SIGN IN WITH FACEBOOK</Button>
            </Grid>
            <Grid sm={2} item> </Grid>
        </Grid>
    )
}

export default Login;
