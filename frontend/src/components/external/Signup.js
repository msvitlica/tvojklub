import React from 'react';
import { useHistory } from 'react-router-dom';

import { 
    Grid,
    Typography,
    Button
} from '@material-ui/core';


function Signup() {
    const [isLogged, setLogginStatus] = React.useState(true);
    const history = useHistory();

    const checkLoginStatus = () => {
        history.push("/")
    }

    return (
        <Grid className="loginContainer" container>
            <Grid xs={0} sm={2} item> </Grid>
            <Grid xs={12} sm={8} direction="column" item container>
                <Typography className="loginLogo" variant="h1">Tvoj Klub</Typography>
                <Button className="btn" variant="outlined" color="secondary" onClick={checkLoginStatus}>SIGN IN WITH GOOGLE</Button>
                <Button className="btn" variant="outlined" color="primary" onClick={checkLoginStatus}>SIGN IN WITH FACEBOOK</Button>
            </Grid>
            <Grid xs={0} sm={2} item> </Grid>
        </Grid>
    )
}

export default Signup;
