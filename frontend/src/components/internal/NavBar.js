import React from 'react';
import { makeStyles } from '@material-ui/core/styles'

// Navbar components

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

// Navbar Icons

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import TrainingListIcon from '@material-ui/icons/FormatListNumbered';
import MembersIcon from '@material-ui/icons/Person';

// Drawer components

import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core'

// Routing Component

import {
    Link,
    useLocation
} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }
}));

export default function NavBar(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        drawerState: false
    });
    const { pathname } = useLocation();
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, drawerState: open });
    }
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={toggleDrawer(true)} edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {pathname === '/trainings/list' ? 'Lista Treninga' : 'Članovi'}
                    </Typography>
                    <Button>
                        <Avatar src="/broken-image.jpg" />
                    </Button>
                </Toolbar>
            </AppBar>

            <Drawer id="nav" open={state.drawerState} onClose={toggleDrawer(false)}>
                <List>
                    <Link to='/trainings/list' onClick={toggleDrawer(false)}>
                        <ListItem button>
                            <ListItemIcon>
                                <TrainingListIcon />
                                <ListItemText primary='Lista Treninga' />
                            </ListItemIcon>
                        </ListItem>
                    </Link>
                    <Link to='/members' onClick={toggleDrawer(false)}>
                        <ListItem button>
                            <ListItemIcon>
                                <MembersIcon />
                                <ListItemText primary='Članovi' />
                            </ListItemIcon>
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
        </div>
    )
}
