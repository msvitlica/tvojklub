import React, { useState, useEffect } from 'react';
import {
  Typography, CardContent, List, ListItem, ListSubheader,
  ListItemText, ListItemSecondaryAction, Card, TextField,
  Divider, Grid
} from '@material-ui/core';
import ProcessedMembersList from './ProcessedMembersList'
import AttendanceOptionButtons from './AttendanceOptionButtons';


export default function TrainingDetails(props) {
  const [trainingInfo, setTrainingInfo] = useState(null);
  const [membersInGroup, setMembersInGroup] = useState([]);

  // Get training by id 
  useEffect(() => {
    fetchTraining();
  }, []);
  
  const fetchTraining = async () => {
    const { match: { params } } = props;
    fetch(`http://localhost:3001/trainings/${params.trainingId}`)
      .then(response => response.json())
      .then(data => {
        setTrainingInfo(data.filteredTraining);
        setMembersInGroup(data.filteredTraining.membersInGroup);
      });
  }

  const processMember = (id, attendance) => {

    let attendanceStatus = {
      attended: 'attended',
      noAttended: 'noAttended',
      unknown: 'unknown',
    }

    const newMembersInGroup = [...membersInGroup];
    
    if (attendance) {
      newMembersInGroup.forEach(member => {
        if (member._id === id) {
          member.attendance = attendanceStatus.attended
        }
      });
    }
    else {
      newMembersInGroup.forEach(member => {
        if (member._id === id) {
          member.attendance = attendanceStatus.noAttended
        }
      });
    }
    setMembersInGroup(newMembersInGroup);
  }

  if (!trainingInfo) {
    return null;
  }
  return (
    <React.Fragment>
      <Card >
        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={8}>
              <Typography color="textPrimary" variant='h6'>
                {trainingInfo.term}({trainingInfo.group.name})</Typography>
            </Grid>
            <Grid item xs={12} sm={4} className='trainingSearchBar'>
              <TextField id="outlined-basic"
                label="Search" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <List subheader={<ListSubheader color='primary' >
        {trainingInfo.group.name}
      </ListSubheader>}>
        {membersInGroup.filter(el => !el.attendance).map((el) => (
          <ListItem key={el._id}>
            <ListItemText primary={`${el.firstName} ${el.lastName}`} />
            <ListItemSecondaryAction>
              <AttendanceOptionButtons member={el} processMember={processMember} />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Divider />
      <ProcessedMembersList membersInGroup={membersInGroup.filter(el => el.attendance)} processMember={processMember} />
    </React.Fragment >
  )
}
