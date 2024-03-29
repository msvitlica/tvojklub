import React, { useContext, useEffect } from "react";
import {
  Grid,
  Radio,
  TextField,
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
  FormHelperText,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  calculateDuration,
  addHourToStartTime,
  validateSheduleDuration,
} from "../../../helpers/helpersMethods";
import { ServiceContext } from "./../../../services/ServiceContext";

function NewSchedule(props) {
  const services = useContext(ServiceContext);
  const backendUrl = "http://localhost:3001";
  const { history, match } = props;

  let currentTime = new Date();
  const [schedule, setSchedule] = React.useState({
    startTime: currentTime,
    endTime: addHourToStartTime(currentTime),
    trainingDuration: "",
    attendedGroups: [],
    recurrance: {},
    aboutSchedule: "",
  });
  const [groups, setGroups] = React.useState([]);
  const [recurranceType, setRecurranceType] = React.useState("weekly");
  const [recurranceDays, setRecurranceDays] = React.useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
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
  };
  // Get schedule with specific ID
  const fetchSchedule = async (controller) => {
    // <= controller unsubscribe fetch request from React DOM tree and prevents updating unmounted component
    const schedule = await services.scheduleServices.getScheduleById(
      match.params.id,
      controller
    );
    setSchedule(schedule);
    setRecurranceDays(schedule.recurrance.recurranceDays);
  };

  // Get groups from the server and sets schedule object
  React.useEffect(() => {
    const abortController = new AbortController();
    fetchGroup();
    if (match.params.id && !schedule._id) {
      fetchSchedule({ singal: abortController.signal });
    }
    return () => {
      abortController.abort();
    };
  }, []);

  // Calculates training duration when user picks start-end time
  React.useEffect(() => {
    const duration = calculateDuration(schedule.startTime, schedule.endTime);
    const hours = duration.split(":")[0];
    const minutes = duration.split(":")[1];
    setSchedule({
      ...schedule,
      trainingDuration: `${hours} sat/a ${minutes} min`,
    });
  }, [schedule.startTime, schedule.endTime]);
  // set start time
  const setStartTime = (time) => {
    let timeToLocale = new Date(time);
    let endTime = addHourToStartTime(timeToLocale);
    setSchedule({ ...schedule, startTime: timeToLocale, endTime: endTime });
  };
  // set end time
  const setEndTime = (time) => {
    let timeToLocale = new Date(time);
    setSchedule({
      ...schedule,
      startTime: schedule.startTime,
      endTime: timeToLocale,
    });
  };
  // Sets recurrance type
  const onRadioValueChange = (event) => {
    setRecurranceType(event.target.value);
  };
  // Sets recurrance days
  const onCheckboxChange = (event) => {
    setRecurranceDays({
      ...recurranceDays,
      [event.target.name]: event.target.checked,
    });
  };
  // Sets about text
  const onAboutChange = (event) => {
    setSchedule({ ...schedule, aboutSchedule: event.target.value });
  };

  // Sets attended groups
  const onSetAttendedGroup = (event) => {
    setSchedule({
      ...schedule,
      attendedGroups: [{ [event.target.name]: event.target.value }],
    });
    setGroups(groups.filter((group) => group.name !== event.target.value));
  };
  // Save schedule to database
  const onSaveSchedule = async () => {
    const completeSchedule = {
      ...schedule,
      recurrance: { recurranceType, recurranceDays },
    };
    const err = fieldsValidation();

    if (err) {
      if (schedule._id) {
        await services.scheduleServices.editSchedule(completeSchedule);
      } else {
        await services.scheduleServices.addSchedule(completeSchedule);
      }
      setSchedule({
        startTime: "07:00",
        endTime: "08:00",
        trainingDuration: "",
        attendedGroups: [],
        recurrance: {},
        aboutSchedule: "",
      });
      goBack();
    }
  };
  // Link to schedule-management page
  const goBack = () => {
    history.push("/schedule-management");
  };

  const fieldsValidation = () => {
    const duration = calculateDuration(schedule.startTime, schedule.endTime);
    const hoursDuration = validateSheduleDuration(duration);

    const durationError = {};
    const groupError = {};
    const recurranceError = {};
    let isValid = true;

    const daysValues = Object.values(recurranceDays);
    const recurranceValidation = daysValues.filter((el) => el);

    if (hoursDuration === 0 || hoursDuration >= 5) {
      durationError.message = `Nepravilan unos kraja treninga`;
      setSchedule({ ...schedule, trainingDuration: "" });
      durationError.notValid = true;
      isValid = false;
    }
    if (schedule.attendedGroups.length === 0) {
      groupError.message = "Izaberite grupu iz liste!";
      groupError.notValid = true;
      isValid = false;
    }
    if (recurranceValidation.length === 0) {
      recurranceError.message = "Izaberite jedan ili više dana u sedmici!";
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
    }, 6000);
    return isValid;
  };
  console.log(schedule)
  return (
    <Grid className="scheduleContainer" container>
      <Grid item xs={12}>
        <Paper className="paper">
          <h4>Vrijeme Treninga</h4>
          <Grid
            item
            container
            className="scheduleContainer"
            direction="column"
            xs={12}
          >
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  inputVariant="outlined"
                  label="Početak"
                  ampm={false}
                  name="startTime"
                  error={durationError.notValid}
                  value={schedule.startTime}
                  variant="outlined"
                  className="timePicker"
                  onChange={setStartTime}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  inputVariant="outlined"
                  label="Kraj Treninga"
                  ampm={false}
                  name="endTime"
                  error={durationError.notValid}
                  helperText={durationError.message}
                  value={schedule.endTime}
                  variant="outlined"
                  className="timePicker"
                  onChange={setEndTime}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Trajanje treninga"
                variant="outlined"
                className="timePicker"
                error={durationError.notValid}
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
              <FormControl
                error={groupError.notValid}
                className="scheduleContainer"
              >
                <Select
                  variant="outlined"
                  className="timePicker"
                  name="groupId"
                  defaultValue="Izaberi Grupu"
                  value={schedule._id ? schedule.attendedGroups[0]._id : ''}
                  onChange={onSetAttendedGroup}
                >
                  <MenuItem value="Izaberi Grupu" disabled selected>
                    Izaberi Grupu
                  </MenuItem>
                  {groups.map((group) => {
                    return (
                      <MenuItem key={group._id} value={group._id}>
                        {group.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>{groupError.message}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Divider />
          <List>
              <h4>Select groups from list above!</h4>
          </List>
          <Divider />
          <h4>Ponavljanje Treninga</h4>
          <Grid className="recurrenceContainer" item xs={12} container>
            <Grid item xs={12} md={2}>
              <FormControl>
                <RadioGroup
                  value={recurranceType}
                  onChange={onRadioValueChange}
                >
                  <FormControlLabel
                    value="weekly"
                    control={<Radio color="primary" />}
                    label="Sedmično"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={9} container>
              <FormControl error={recurranceError.notValid}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        name="monday"
                        onChange={onCheckboxChange}
                        checked={recurranceDays.monday}
                      />
                    }
                    label="Ponedeljak"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        name="tuesday"
                        onChange={onCheckboxChange}
                        checked={recurranceDays.tuesday}
                      />
                    }
                    label="Utorak"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        name="wednesday"
                        onChange={onCheckboxChange}
                        checked={recurranceDays.wednesday}
                      />
                    }
                    label="Srijeda"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        name="thursday"
                        onChange={onCheckboxChange}
                        checked={recurranceDays.thursday}
                      />
                    }
                    label="Četvrtak"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        name="friday"
                        onChange={onCheckboxChange}
                        checked={recurranceDays.friday}
                      />
                    }
                    label="Petak"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        name="saturday"
                        onChange={onCheckboxChange}
                        checked={recurranceDays.saturday}
                      />
                    }
                    label="Subota"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        name="sunday"
                        onChange={onCheckboxChange}
                        checked={recurranceDays.sunday}
                      />
                    }
                    label="Nedelja"
                  />
                </Grid>
                <FormHelperText>{recurranceError.message}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Divider />
          <Grid item container className="btnContainer" spacing={2}>
            <Grid item xs={12} sm={2}>
              <Button
                className="scheduleBtn"
                variant="contained"
                color="primary"
                onClick={onSaveSchedule}
              >
                Sačuvaj
              </Button>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                className="scheduleBtn"
                variant="contained"
                color="secondary"
                onClick={goBack}
              >
                Nazad
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default NewSchedule;
