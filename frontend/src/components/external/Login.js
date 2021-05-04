import React from 'react';
import {
    Grid,
    Typography,
    Button, Link
} from '@material-ui/core';


function Login(props) {

    return (
        <Grid className="loginContainer" container>
            <Grid sm={2} item> </Grid>
            <Grid xs={12} sm={8} direction="column" item container>
                <Typography className="loginLogo" variant="h1">Tvoj Klub</Typography>
                <Button 
                    className="btn"
                    variant="outlined" 
                    color="secondary">
                    <Link href="/auth/google" color="secondary">
                        SIGN IN WITH GOOGLE
                    </Link>
                </Button>
                <Button className="btn" variant="outlined" color="primary" onClick={props.login} >SIGN IN WITH FACEBOOK</Button>
            </Grid>
            <Grid sm={2} item> </Grid>
        </Grid>
    )
}

export default Login;
