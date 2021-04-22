import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, InputLabel, Select, MenuItem, FormControl, FormHelperText, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ServiceContext } from '../../../services/ServiceContext';

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
        groupId: '',
        attendance: 'unknown'
    });
    const [firstNameError, setFirstNameError] = useState({});
    const [lastNameError, setLastNameError] = useState({});
    const [birthDateError, setBirthDateError] = useState({});
    const [groupError, setGroupError] = useState({});
    const [groups, setGroupList] = useState([]);
    const { history } = props;
    const { id } = useParams();

    const services = useContext(ServiceContext);

    const fetchGroup = async () => {
        const allGroups = await services.groupService.getAllGroups();
        setGroupList(allGroups);
    }

    const fetchMember = async (id) => {
        const fetchedMember = await services.memberService.getMemberById(id);
        setMember({
            ...fetchedMember,
            dateOfBirth: fetchedMember.dateOfBirth.split('T')[0]
        });
    }

    useEffect(() => {
        fetchGroup();
        if(id) fetchMember(id);
    }, [])

    const handleChange = e => {
        setMember({ ...member, [e.target.name]: e.target.value });
    }

    const validate = () => {
        const firstNameError = {};
        const lastNameError = {};
        const birthDateError = {};
        const groupError = {};
        let isValid = true;
        if (member.firstName.trim().length < 2) {
            firstNameError.shortInput = 'Ime treba da sadrži bar 2 karaktera';
            firstNameError.notValid = true;
            isValid = false;
        }
        if (member.lastName.trim().length < 2) {
            lastNameError.shortInput = 'Prezime treba da sadrži bar 2 karaktera';
            lastNameError.notValid = true;
            isValid = false;
        }
        if (member.dateOfBirth.trim().length === 0) {
            birthDateError.emptyInput = 'Unesite datum rođenja.';
            birthDateError.notValid = true;
            isValid = false;
        }
        if (!member.groupId) {
            groupError.emptyInput = 'Unesite grupu.';
            groupError.notValid = true;
            isValid = false;
        }
        setFirstNameError(firstNameError);
        setLastNameError(lastNameError);
        setBirthDateError(birthDateError);
        setGroupError(groupError);
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
                groupId: member.groupId,
                attendance: 'unknown'
            })
            if(id) return editMember();
            postMember();
        }
    }

    const postMember = async () => {
        await services.memberService.postMember({ member });
        setMember('');
        displayMemberList();
    }

    const editMember = async () => {
        await services.memberService.editMember(member._id, member);
        displayMemberList();
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
                            value={member.firstName || ''}
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
                            value={member.lastName || ''}
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
                            value={member.dateOfBirth || ''}
                            onChange={handleChange}
                            helperText={birthDateError.emptyInput}
                            error={birthDateError.notValid}
                            InputLabelProps={{
                                shrink: true,
                            }} />
                    </div>
                    <div >
                        <FormControl className='dropdown'>
                            <InputLabel className='p-8'>Group</InputLabel>
                            <Select variant="filled"
                                name="groupId"
                                value={member.groupId || ''}
                                onChange={handleChange}
                                error={groupError.notValid}
                            >
                                {groups.map(el => (
                                    <MenuItem key={el._id} value={el}>{el.name}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText className='validationGroup'>{groupError.emptyInput}</FormHelperText>
                        </FormControl>
                    </div>
                    <br></br>
                    <div className='inputButtons'>
                        <Button variant="contained" type="submit" color="primary">
                            Save
                        </Button>
                        <Button variant="contained" onClick={onClickCancel} color="secondary">
                            Cancel
                        </Button>
                    </div>
                </form>
            </Grid>
            <Grid item xs={1} sm={4} ></Grid>
        </Grid>
    )
}



