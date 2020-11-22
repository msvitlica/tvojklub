import React from 'react';
import {
    Grid,
    TextField,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Checkbox,
    Paper,
    Select,
    MenuItem,
    Button,
    Divider,
    List,
    ListItem,
    ListItemText
} from '@material-ui/core';
import { calculateDuration } from '../../helpers/helpersMethods';

function NewSchedule() {
    const [startTime, setStartTime] = React.useState('07:00');
    const [endTime, setEndTime] = React.useState('07:00');
    const [trainingDuration, setTrainingDuration] = React.useState('00:00');
    const [groups, setGroups] = React.useState([]);
    const [recurranceType, setRecurranceType] = React.useState('weekly');
    const [recurranceDays, setRecurranceDays] = React.useState({
        monday: false,
        tuesday: false,
        wednsday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    });
    const [aboutSchedule, setAboutSchedule] = React.useState('');
    const [attendedGroups, setAttendedGroups] = React.useState([]);
    const [schedule, setNewSchedule] = React.useState({});

    const fetchGroup = async () => {
        const res = await fetch('http://localhost:3001/groups');
        const data = await res.json();
        setGroups(data)
    }

    // Get groups from the server
    React.useEffect(() => {
        fetchGroup();
    }, []);

    // Calculates training duration when user pick start and end time 
    React.useEffect(() => {
        const duration = calculateDuration(startTime, endTime)
        const hours = duration.split(':')[0];
        const minutes = duration.split(':')[1];
        setTrainingDuration(`${hours} sat/a ${minutes} min`);
    }, [startTime, endTime]);

    // Sets start-end time 
    const onSetTime = event => {
        switch (event.target.name) {
            case 'startTime':
                setStartTime(event.target.value);
                break
            case 'endTime':
                setEndTime(event.target.value);
        }
        setTrainingDuration(calculateDuration(startTime, endTime));
    }

    // Sets recurrance type
    const onRadioValueChange = event => {
        setRecurranceType(event.target.value);
    }

    // Sets recurrance days
    const onCheckboxChange = event => {
        setRecurranceDays({ ...recurranceDays, [event.target.name]: event.target.checked });
    }

    // Sets about text
    const onAboutChange = (event) => {
        setAboutSchedule(event.target.value);
    }

    // Sets attended groups
    const onsetAttendedGroup = (event) => {
        setAttendedGroups([...attendedGroups, { name: event.target.value }])
        setGroups(groups.filter(group => group.name !== event.target.value));
    }
    return (
        <Grid className="scheduleContainer" container>
            <Grid item xs={12}>
                <Paper className="paper">
                    <h4>Vrijeme Treninga</h4>
                    <Grid item container className="scheduleContainer" direction="column" xs={12}>
                        <Grid item xs={12}>
                            <TextField
                                label="Početak"
                                type="time"
                                name="startTime"
                                defaultValue="07:00"
                                variant="outlined"
                                className="timePicker"
                                onChange={onSetTime}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Kraj"
                                type="time"
                                name='endTime'
                                defaultValue="07:00"
                                variant="outlined"
                                className="timePicker"
                                onChange={onSetTime}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Trajanje treninga"
                                variant="outlined"
                                className="timePicker"
                                value={trainingDuration}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                multiline
                                id="aboutTraining"
                                label="Opis"
                                variant="outlined"
                                className="timePicker"
                                rows={10}
                                onChange={onAboutChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Select
                                variant="outlined"
                                className="timePicker"
                                defaultValue="Izaberi Grupu"
                                onChange={onsetAttendedGroup}
                            >
                                {groups.map(group => {
                                    return <MenuItem key={group.id} value={group.name}>{group.name}</MenuItem>
                                })}
                            </Select>
                        </Grid>
                    </Grid>
                    <Divider />
                    <List>
                        {attendedGroups.length != 0 ? attendedGroups.map(group => {
                            return (
                                <ListItem key={group.name}>
                                    <ListItemText primary={group.name} />
                                </ListItem>
                            )
                        }) : <h4>Select groups from list above!</h4>}
                    </List>
                    <Divider />
                    <h4>Ponavljanje Treninga</h4>
                    <Grid className="recurrenceContainer" item xs={12} container>
                        <Grid item xs={12} md={2}>
                            <FormControl>
                                <RadioGroup value={recurranceType} onChange={onRadioValueChange}>
                                    <FormControlLabel value="weekly" control={<Radio color="primary" />} label="Sedmično" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={9} container>
                            <Grid item xs={12}>
                                <FormControlLabel control={<Checkbox color="primary" name="monday" onChange={onCheckboxChange} />} label="Ponedeljak" />
                                <FormControlLabel control={<Checkbox color="primary" name="tuesday" onChange={onCheckboxChange} />} label="Utorak" />
                                <FormControlLabel control={<Checkbox color="primary" name="wednsday" onChange={onCheckboxChange} />} label="Srijeda" />
                                <FormControlLabel control={<Checkbox color="primary" name="thursday" onChange={onCheckboxChange} />} label="Četvrtak" />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel control={<Checkbox color="primary" name="friday" onChange={onCheckboxChange} />} label="Petak" />
                                <FormControlLabel control={<Checkbox color="primary" name="saturday" onChange={onCheckboxChange} />} label="Subota" />
                                <FormControlLabel control={<Checkbox color="primary" name="sunday" onChange={onCheckboxChange} />} label="Nedelja" />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid item xs={12} sm={2}>
                        <Button className="scheduleBtn" variant="contained" color="primary">Sačuvaj</Button>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default NewSchedule;