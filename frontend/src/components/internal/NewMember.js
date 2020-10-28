import React, { useState, useEffect } from 'react';
import { TextField, Button, InputLabel, Select, MenuItem, FormControl, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(3),
            width: '25ch',
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3),
            width: 220,
        }
    }
}));
export default function NewMember(props) {
    const classes = useStyles();
    const [member, setMember] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        group: '',
    });
    const [firstNameError, setFirstNameError] = useState({});
    const [lastNameError, setLastNameError] = useState({});
    const [groups, setGroupList] = useState([]);
    const { history } = props;
    const APIurl = 'http://localhost:3001/groups';
    const fetchGroup = async () => {
        const res = await fetch(APIurl);
        const data = await res.json();
        setGroupList(data.groups)
        console.log(data.groups);
    }
    useEffect(() => {
        fetchGroup()
    }, [])
    const handleChange = (e) => {
        setMember({ ...member, [e.target.name]: e.target.value });
    }
    const validate = () => {
        const firstNameError = {};
        const lastNameError = {};
        let isValid = true;
        if (member.firstName.trim().length < 2) {
            firstNameError.shortInput = 'Type at least 2 charachters';
            firstNameError.notValid = true;
            isValid = false;
        }
        if (member.lastName.trim().length < 2) {
            lastNameError.shortInput = 'Type at least 2 charachters ';
            lastNameError.notValid = true;
            isValid = false;
        }
        setFirstNameError(firstNameError);
        setLastNameError(lastNameError);
        return isValid;
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const err = validate()
        if (err) {
            setMember({
                firstName: member.firstName,
                lastName: member.lastName,
                dateOfBirth: member.dateOfBirth,
                group: member.group,
            })
            postMember();
        }
    }
    const postMember = async () => {
        fetch('http://localhost:3001/members/newMember', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ member: member }),
        });
        setMember('');
        displayMemberList()
    }
    const onClickCancel = () => {
        displayMemberList();
    }
    const displayMemberList = () => {
        history.push('/members');
    }
    return (
        <Grid container>
            <Grid item xs={1} sm={4}></Grid>
            <Grid item container xs={10} sm={4} >
                <form className={classes.root} onSubmit={onSubmit} noValidate>
                    <div>
                        <TextField
                            name="firstName"
                            value={member.firstName}
                            label="FirstName"
                            variant="filled"
                            onChange={handleChange}
                            helperText={firstNameError.shortInput}
                            error={firstNameError.notValid}
                        />
                    </div>
                    <div>
                        <TextField
                            name="lastName"
                            value={member.lastName}
                            label="LastName"
                            variant="filled"
                            onChange={handleChange}
                            helperText={lastNameError.shortInput}
                            error={lastNameError.notValid}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Birthday"
                            type="date"
                            name='dateOfBirth'
                            value={member.dateOfBirth}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }} />
                    </div>
                    <div >
                        <FormControl style={{ width: 220, margin: 17 }}>
                            <InputLabel style={{ padding: 8 }} >Group</InputLabel>
                            <Select variant="filled"
                                name="group"
                                value={member.group}
                                onChange={handleChange}
                            >
                                {groups.map(el => (
                                    <MenuItem key={el.id} value={el.name}>{el.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <br></br>
                    <div className='inputButtons'>
                        <Button variant="contained" type="submit" className='btn' color="primary">
                            Save
                        </Button>
                        <Button variant="contained" onClick={onClickCancel} className='cancelBtn' color="secondary">
                            Cancel
                        </Button>
                    </div>
                </form>
            </Grid>
            <Grid item xs={1} sm={4} ></Grid>
        </Grid>
    )
}



