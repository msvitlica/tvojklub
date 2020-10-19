import React, { useState, useEffect } from 'react';
import { TextField, Button, InputLabel, Select, MenuItem } from '@material-ui/core';
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
        },
    },
}));
export default function NewMember(props) {
    const classes = useStyles();
    const [member, setMember] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        group: ''
    });
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
    const onClickSave = () => {
        if (member.firstName === '' || member.lastName === '') {
            alert('Popunite ime i prezime.')
            setMember({
                firstName: member.firstName,
                lastName: member.lastName,
                dateOfBirth: member.dateOfBirth,
                group: member.group,
            })
        } else {
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
        <div className={classes.root}>
            <div>
                <TextField
                    name="firstName"
                    value={member.firstName}
                    label="FirstName"
                    variant="filled"
                    onChange={handleChange}
                />
            </div>
            <div>
                <TextField
                    name="lastName"
                    value={member.lastName}
                    label="LastName"
                    variant="filled"
                    onChange={handleChange}
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
            <div>
                <InputLabel className={classes.textField}>Group</InputLabel>
                <Select
                    name="group"
                    value={member.group}
                    onChange={handleChange}
                >
                    <MenuItem >
                    </MenuItem>
                    {groups.map(el => (
                        <MenuItem key={el.id} value={el.name}>{el.name}</MenuItem>
                    ))}
                </Select>
            </div>
            <br></br>
            <div>
                <Button variant="contained" onClick={onClickSave} color="primary">
                    Save
                        </Button>
                <Button variant="contained" onClick={onClickCancel} color="secondary">
                    Cancel
                        </Button>
            </div>
        </div>

    )
}
