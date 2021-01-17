import React, { useState, useEffect, useContext } from 'react';
import {
  Typography, CardContent, List, ListItem, ListSubheader,
  ListItemText, ListItemSecondaryAction, Card, TextField,
  Divider, Grid
} from '@material-ui/core';
import ProcessedMembersList from './ProcessedMembersList'
import AttendanceOptionButtons from './AttendanceOptionButtons';
import { TrainingContext } from '../training-context/TrainingContext';
export default function TrainingDetails(props) {
  const [trainingInfo, setTrainingInfo] = useState({});
  const [membersInGroup, setMembersInGroup] = useState([]);
  const trainingContext = useContext(TrainingContext);
  console.log(trainingContext);

  useEffect(() => {
    setTrainingInfo(trainingContext.getTraining())
  })
  // componentDidMount = () => {
  //   const { match: { params } } = this.props;
  //   fetch(`http://localhost:3001/trainings/${params.trainingId}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       this.setState({
  //         trainingInfo: data.trainingId,
  //         membersInGroup: data.trainingId.membersInGroup,
  //       })
  //       console.log(this.state.membersInGroup)
  //     });
  // }
  // const processMember = (id, attendance) => {

  //   let attendanceStatus = {
  //     attended: 'attended',
  //     noAttended: 'noAttended',
  //     unknown: 'unknown',
  //   }

  //   const newMembersInGroup = [...this.state.membersInGroup];

  //   if (attendance) {
  //     newMembersInGroup.forEach(member => {
  //       if (member.id === id) {
  //         member.attendance = attendanceStatus.attended
  //       }
  //     });
  //   }
  //   else {
  //     newMembersInGroup.forEach(member => {
  //       if (member.id === id) {
  //         member.attendance = attendanceStatus.noAttended
  //       }
  //     });
  //   }
  //   this.setState({
  //     /* trainingInfo: this.state.trainingInfo, */
  //     membersInGroup: newMembersInGroup,
  //   },
  //     () => { console.log(this.state.membersInGroup) });
  // }
  //   const attended = true;
  //   const notAttended = false;
  //   if (!this.state.trainingInfo) {
  //     return null;
  //   }
  return (
    <React.Fragment>
      <Card >
        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={8}>
              <Typography color="textPrimary" variant='h6'>
                {trainingInfo.term}({trainingInfo.group})</Typography>
            </Grid>
            <Grid item xs={12} sm={4} className='trainingSearchBar'>
              <TextField id="outlined-basic"
                label="Search" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <List subheader={<ListSubheader color='primary' >{trainingInfo.group}
      </ListSubheader>}>
        {trainingInfo.membersInGroup.filter(el => el.attendance === 'unknown').map((el) => (
          <ListItem key={el.id}>
            <ListItemText primary={el.name} />
            <ListItemSecondaryAction>
              <AttendanceOptionButtons member={el} processMember={this.processMember} />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Divider />
      <ProcessedMembersList membersInGroup={this.state.membersInGroup.filter(el => el.attendance !== 'unknown')} processMember={this.processMember} />
    </React.Fragment >
  )
}
