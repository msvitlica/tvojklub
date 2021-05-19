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
import GroupIcon from '@material-ui/icons/Group';
import TrainingListIcon from '@material-ui/icons/FormatListNumbered';
import MembersIcon from '@material-ui/icons/Person';
import ScheduleIcon from '@material-ui/icons/Schedule';
import LogoutIcon from '@material-ui/icons/Launch';

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
    Link
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
    },
    iconContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    linkIcon: {
        marginRight: '5px'
    },
    linkText: {
        textDecoration: 'none'
    },
    sideMenu: {
        width: '150px'
    }
}));

export default function NavBar(props) {

    console.log('renderujem navbar');

    const classes = useStyles();
    const [state, setState] = React.useState({
        drawerState: false,
        sideMenuState: false
    });

    const [title, setTitle] = React.useState('Lista Treninga');

    // Toggle Drawer 
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, drawerState: open });
        setTitle(event.target.innerText);
    }

    // toggle side menu
    const toggleSideMenu = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, sideMenuState: open });
    }
    
    return (
        <div>
            <AppBar className='navbar' position="static">
                <Toolbar>
                    <IconButton onClick={toggleDrawer(true)} edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    <Button onClick={toggleSideMenu(true)}>
                        <Avatar src="/broken-image.jpg" />
                    </Button>
                </Toolbar>
            </AppBar>

            <Drawer 
                id="side-menu"
                open={state.sideMenuState} 
                anchor="right"
                onClose={toggleSideMenu(false)} >
                <List className={classes.sideMenu}>
                    <a href="/api/logout">
                        <ListItem button>
                            <ListItemIcon className={classes.iconContainer}>
                                <LogoutIcon className={classes.linkIcon} />
                                <ListItemText 
                                    className={classes.linkText}
                                    primary='logout' />
                                
                            </ListItemIcon>
                        </ListItem>
                    </a>
                </List>
            </Drawer>

            <Drawer id="nav" open={state.drawerState} onClose={toggleDrawer(false)}>
                <List>
                    <Link to='/trainings' onClick={toggleDrawer(false)}>
                        <ListItem button>
                            <ListItemIcon className={classes.iconContainer}>
                                <TrainingListIcon className={classes.linkIcon} />
                                <ListItemText primary='Lista Treninga' />
                            </ListItemIcon>
                        </ListItem>
                    </Link>
                    <Link to='/members' onClick={toggleDrawer(false)}>
                        <ListItem button>
                            <ListItemIcon className={classes.iconContainer}>
                                <MembersIcon className={classes.linkIcon} />
                                <ListItemText primary='Članovi' />
                            </ListItemIcon>
                        </ListItem>
                    </Link>
                    <Link to='/groups' onClick={toggleDrawer(false)}>
                        <ListItem button>
                            <ListItemIcon className={classes.iconContainer}>
                                <GroupIcon className={classes.linkIcon} />
                                <ListItemText primary='Grupe' />
                            </ListItemIcon>
                        </ListItem>
                    </Link>
                    <Link to='/schedule-management' onClick={toggleDrawer(false)}>
                        <ListItem button>
                            <ListItemIcon className={classes.iconContainer}>
                                <ScheduleIcon className={classes.linkIcon} />
                                <ListItemText primary='Raspored' />
                            </ListItemIcon>
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
        </div>
    )
}