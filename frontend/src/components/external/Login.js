import React from 'react';
import {
    Grid,
    Typography,
    Button, Link
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    googleLink: {
        width: '100%',
        height: '100%',
        '&:hover': {
            textDecoration: 'none'
        }
    },
    facebookLink: {
        width: '100%',
        height: '100%',
        '&:hover': {
            textDecoration: 'none'
        }
    },
    btnContainer: {
        padding: '0px',
        height: '2.3rem'
    }
});

function Login(props) {

    const classes = useStyles();

    return (
        <Grid className="loginContainer" container>
            <Grid sm={2} item> </Grid>
            <Grid xs={12} sm={8} direction="column" item container>
                <Typography className="loginLogo" variant="h1">Tvoj Klub</Typography>
                <Button 
                    className={`btn ${classes.btnContainer}`}
                    variant="outlined" 
                    color="secondary">
                    <Link 
                        href="/auth/google" 
                        className={classes.googleLink} 
                        color="secondary">
                        SIGN IN WITH GOOGLE
                    </Link>
                </Button>
                <Button 
                    className="btn" 
                    variant="outlined" 
                    color="primary">
                    <Link 
                        href="http://localhost:3001/auth/facebook" 
                        className={classes.facebookLink} 
                        color="primary">
                        SIGN IN WITH FACEBOOK
                    </Link>
                </Button>
            </Grid>
            <Grid sm={2} item> </Grid>
        </Grid>
    )
}

export default Login;
