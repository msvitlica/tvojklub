import React, { useState, useEffect } from 'react';
import { TextField, Button, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';
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
            width: 200,
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
    const handleChange = (e) => {
        setMember({ ...member, [e.target.name]: e.target.value });
    }
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
    const validate = () => {
        const firstNameError = {};
        const lastNameError = {};
        let isValid = true;

        if (member.firstName.trim().length < 2) {
            firstNameError.shortInput = 'Type at least 2 charachters ';
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
        <form className={classes.root} onSubmit={onSubmit} noValidate>
            <TextField
                name="firstName"
                value={member.firstName}
                label="FirstName"
                variant="filled"
                onChange={handleChange}
                helperText={firstNameError.shortInput}
                error={firstNameError.notValid}
            />

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
                <FormControl style={{ width: 220, padding: 13 }}>
                    <InputLabel shrink >Group</InputLabel>
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
            <div>
                <Button variant="contained" type="submit" color="primary">
                    Save
                        </Button>
                <Button variant="contained" onClick={onClickCancel} color="secondary">
                    Cancel
                        </Button>
            </div>
        </form>

    )
}
