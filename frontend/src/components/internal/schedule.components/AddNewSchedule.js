import React, { useContext } from 'react';
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
    ListItemText,
    FormHelperText
} from '@material-ui/core';
import {
    calculateDuration
} from '../../../helpers/helpersMethods';
import { ServiceContext } from './../../../services/ServiceContext';


function NewSchedule(props) {
    const services = useContext(ServiceContext);
    const backendUrl = 'http://localhost:3001';
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
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    });

    // Validation errors 
    const [durationError, setDurationError] = React.useState({});
    const [groupError, setGroupError] = React.useState({});
    const [recurranceError, setRecurranceError] = React.useState({});

    // Get all available groups on backend
    const fetchGroup = async () => {
        const res = await fetch(`${backendUrl}/groups`);
        const data = await res.json();
        setGroups(data);
    }

    // Get schedule with specific ID

    const fetchSchedule = async (controller) => { // <= controller unsubscribe fetch request from React DOM tree and prevents updating unmounted component
        const schedule = await services.scheduleServices.getScheduleById(match.params.id, controller);
        setSchedule(schedule);
        setRecurranceDays(schedule.recurrance.recurranceDays);
    }

    // Get groups from the server and sets schedule object 
    React.useEffect(() => {
        const abortController = new AbortController();
        fetchGroup();
        if (match.params.id && !schedule._id) {
            fetchSchedule({ singal: abortController.signal });
        }
        return () => {
            abortController.abort();
        }
    }, []);

    // Calculates training duration when user picks start-end time 
    React.useEffect(() => {
        const duration = calculateDuration(schedule.startTime, schedule.endTime)
        const hours = duration.split(':')[0];
        const minutes = duration.split(':')[1];
        setSchedule({ ...schedule, trainingDuration: `${hours} sat/a ${minutes} min` });
    }, [schedule.startTime, schedule.endTime]);

    // Sets start-end time 
    const onSetTime = (event) => {
        setSchedule({ ...schedule, [event.target.name]: event.target.value, trainingDuration: calculateDuration(schedule.startTime, schedule.endTime) })
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
        setSchedule({ ...schedule, attendedGroups: [...schedule.attendedGroups, { [event.target.name]: event.target.value }] })
        setGroups(groups.filter(group => group.name !== event.target.value));
    }

    // Save schedule to database
    const onSaveSchedule = () => {
        const completeSchedule = { ...schedule, recurrance: { recurranceType, recurranceDays } }
        const err = fieldsValidation();

        if (err) {
            if (schedule._id) {
                fetch(`${backendUrl}/schedule-management/edit/${schedule._id}`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ completeSchedule })
                })
            }
            else {
                fetch(`${backendUrl}/schedule-management/add`, {
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
            }
            setSchedule({
                startTime: '07:00',
                endTime: '07:00',
                trainingDuration: '',
                attendedGroups: [],
                recurrance: {},
                aboutSchedule: ''
            });
            goBack();
            window.location.reload(true);
        }
    }

    // Link to schedule-management page
    const goBack = () => {
        history.push('/schedule-management');
    }

    const fieldsValidation = () => {
        const duration = calculateDuration(schedule.startTime, schedule.endTime)
        const hours = duration.split(':')[0];
        const minutes = duration.split(':')[1];

        const durationError = {};
        const groupError = {};
        const recurranceError = {};
        let isValid = true;

        const daysValues = Object.values(recurranceDays)
        const recurranceValidation = daysValues.filter(el => el);

        if (hours === '00' && minutes === '00') {
            durationError.message = 'Select valid training duration!';
            durationError.notValid = true;
            isValid = false;
        }
        if (schedule.attendedGroups.length === 0) {
            groupError.message = 'Select group from list above!';
            groupError.notValid = true;
            isValid = false;
        }
        if (recurranceValidation.length === 0) {
            recurranceError.message = 'Select at least one day of week!';
            recurranceError.notValid = true;
            isValid = false;
        }
        setDurationError(durationError);
        setGroupError(groupError);
        setRecurranceError(recurranceError);
        setTimeout(() => {
            setDurationError({});
            setGroupError({});
            setRecurranceError({});
        }, 6000)
        return isValid;
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
                                error={durationError.notValid}
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
                                error={durationError.notValid}
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
                                error={durationError.notValid}
                                helperText={durationError.message}
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
                            <FormControl error={groupError.notValid} className="scheduleContainer">
                                <Select
                                    variant="outlined"
                                    className="timePicker"
                                    name="groupId"
                                    defaultValue="Izaberi Grupu"
                                    onChange={onSetAttendedGroup}
                                >
                                    <MenuItem value="Izaberi Grupu" disabled selected>Izaberi Grupu</MenuItem>
                                    {groups.map(group => {
                                        return <MenuItem key={group._id} value={group._id}>{group.name}</MenuItem>
                                    })}
                                </Select>
                                <FormHelperText>{groupError.message}</FormHelperText>
                            </FormControl>
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
                            <FormControl error={recurranceError.notValid}>
                                <Grid item xs={12}>
                                    <FormControlLabel control={<Checkbox color="primary" name="monday" onChange={onCheckboxChange} checked={recurranceDays.monday} />} label="Ponedeljak" />
                                    <FormControlLabel control={<Checkbox color="primary" name="tuesday" onChange={onCheckboxChange} checked={recurranceDays.tuesday} />} label="Utorak" />
                                    <FormControlLabel control={<Checkbox color="primary" name="wednesday" onChange={onCheckboxChange} checked={recurranceDays.wednesday} />} label="Srijeda" />
                                    <FormControlLabel control={<Checkbox color="primary" name="thursday" onChange={onCheckboxChange} checked={recurranceDays.thursday} />} label="Četvrtak" />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel control={<Checkbox color="primary" name="friday" onChange={onCheckboxChange} checked={recurranceDays.friday} />} label="Petak" />
                                    <FormControlLabel control={<Checkbox color="primary" name="saturday" onChange={onCheckboxChange} checked={recurranceDays.saturday} />} label="Subota" />
                                    <FormControlLabel control={<Checkbox color="primary" name="sunday" onChange={onCheckboxChange} checked={recurranceDays.sunday} />} label="Nedelja" />
                                </Grid>
                                <FormHelperText>{recurranceError.message}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid item container className="btnContainer" spacing={2}>
                        <Grid item xs={12} sm={2}>
                            <Button className="scheduleBtn" variant="contained" color="primary" onClick={onSaveSchedule}>Sačuvaj</Button>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button className="scheduleBtn" variant="contained" color="secondary" onClick={goBack}>Nazad</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default NewSchedule;