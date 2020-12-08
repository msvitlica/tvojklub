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
import { calculateDuration } from '../../../helpers/helpersMethods';

function NewSchedule(props) {
    const { history, match } = props;
    const [schedule, setSchedule] = React.useState({
        startTime: '07:00',
        endTime: '07:00',
        trainingDuration: '',
        attendedGroups: [],
        recurrance: {},
        aboutSchedule: ''
    });
    const [groups, setGroups] = React.useState([]);
    const [recurranceType, setRecurranceType] = React.useState('weekly');
    const [recurranceDays, setRecurranceDays] = React.useState({
        monday: schedule.recurrance.recurranceDays ? schedule.recurrance.recurranceDays : false,
        tuesday: false,
        wednsday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    });
    console.log(recurranceDays)

    const fetchGroup = async () => {
        const res = await fetch('http://localhost:3001/groups');
        const data = await res.json();
        setGroups(data)
    }
    const fetchSchedule = async () => {
        let req = await fetch(`http://localhost:3001/schedule-management/edit/${match.params.id}`);
        let data = await req.json();
        setSchedule(data);
        console.log(data);
    }

    // Get groups from the server and sets schedule object 
    React.useEffect(() => {
        fetchGroup();
        if (match.params.id) {
            fetchSchedule();
        }
    }, []);

    // Calculates training duration when user pick start and end time 
    React.useEffect(() => {
        const duration = calculateDuration(schedule.startTime, schedule.endTime)
        const hours = duration.split(':')[0];
        const minutes = duration.split(':')[1];
        setSchedule({ ...schedule, trainingDuration: `${hours} sat/a ${minutes} min` });
    }, [schedule.startTime, schedule.endTime]);

    // Sets start-end time 
    const onSetTime = event => {
        switch (event.target.name) {
            case 'startTime':
                setSchedule({ ...schedule, [event.target.name]: event.target.value });
                break
            case 'endTime':
                setSchedule({ ...schedule, [event.target.name]: event.target.value });
        }
        setSchedule({ ...schedule, trainingDuration: calculateDuration(schedule.startTime, schedule.endTime) });
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
        setSchedule({ ...schedule, aboutSchedule: event.target.value });
    }

    // Sets attended groups
    const onSetAttendedGroup = (event) => {
        setSchedule({ ...schedule, attendedGroups: [...schedule.attendedGroups, { name: event.target.value }] })
        setGroups(groups.filter(group => group.name !== event.target.value));
    }

    // Save schedule to database
    const onSaveSchedule = () => {
        const completeSchedule = { ...schedule, recurrance: { recurranceType, recurranceDays } }

        fetch('http://localhost:3001/schedule-management/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completeSchedule })
        })
            .catch((error) => {
                alert(error.msg)
            });
        setSchedule({
            startTime: '07:00',
            endTime: '07:00',
            trainingDuration: '',
            attendedGroups: [],
            recurrance: {},
            aboutSchedule: ''
        })
        history.push('/schedule-management');
        window.location.reload(true);
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
                                value={schedule.startTime}
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
                                value={schedule.endTime}
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
                                value={schedule.trainingDuration}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                multiline
                                id="aboutTraining"
                                label="Opis"
                                variant="outlined"
                                className="timePicker"
                                value={schedule.aboutSchedule}
                                rows={10}
                                onChange={onAboutChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Select
                                variant="outlined"
                                className="timePicker"
                                defaultValue="Izaberi Grupu"
                                onChange={onSetAttendedGroup}
                            >
                                <MenuItem value="Izaberi Grupu" disabled selected>Izaberi Grupu</MenuItem>
                                {groups.map(group => {
                                    return <MenuItem key={group._id} value={group.name}>{group.name}</MenuItem>
                                })}
                            </Select>
                        </Grid>
                    </Grid>
                    <Divider />
                    <List>
                        {schedule.attendedGroups.length !== 0 ? schedule.attendedGroups.map(group => {
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
                        <Button className="scheduleBtn" variant="contained" color="primary" onClick={onSaveSchedule}>Sačuvaj</Button>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default NewSchedule;