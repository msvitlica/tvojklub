import React, { useState, useEffect, useContext } from 'react';
import {
  Typography, CardContent, List, ListItem, ListSubheader,
  ListItemText, ListItemSecondaryAction, Card, TextField,
  Divider, Grid, Button
} from '@material-ui/core';
import ProcessedMembersList from './ProcessedMembersList'
import AttendanceOptionButtons from './AttendanceOptionButtons';
import { ServiceContext } from '../../../services/ServiceContext';


export default function TrainingDetails(props) {
  const [trainingInfo, setTrainingInfo] = useState(null);
  const [membersInGroup, setMembersInGroup] = useState([]);
  const [trainingStatus, setTrainingStatus] = useState(true);
  const services = useContext(ServiceContext);
  const { match: { params }, history } = props;
  // Get training by id 
  useEffect(() => {
    fetchTraining();
  }, [trainingStatus]);

  // Change training status
  const changeTrainingStatus = () => {
    setTrainingStatus(false);
    services.trainingService.editTraining({ _id: trainingInfo._id, editedProp: 'trainingStatus', editedPropValue: 'canceled' });
    history.push(`/trainings`);
    }
  // return to TriningList
  const returnToTrainingList = () => {
    history.push('/trainings')
  }

  const fetchTraining = async () => {
    const { match: { params } } = props;
    fetch(`http://localhost:3001/trainings/${params.trainingId}`)
      .then(response => response.json())
      .then(data => {
        setTrainingInfo(data.filteredTraining);
        setMembersInGroup(data.filteredTraining.membersInGroup);
        setTrainingStatus(data.filteredTraining.trainingStatus !== 'canceled' ? true : false)
      });
  }
  const processMember = (id, attendance) => {

    let attendanceStatus = {
      attended: 'Prisutan',
      noAttended: 'Nije Prisutan',
      unknown: 'unknown',
    }

    const newMembersInGroup = [...membersInGroup];

    switch (attendance) {
      case true:
        newMembersInGroup.forEach(member => {
          if (member._id === id) {
            member.attendance = attendanceStatus.attended
          }
        });
        setTrainingInfo({ ...trainingInfo, membersInGroup: newMembersInGroup })
        services.trainingService.editTraining({ _id: trainingInfo._id, editedProp: 'membersInGroup', editedPropValue: trainingInfo.membersInGroup });
        break
      case false:
        newMembersInGroup.forEach(member => {
          if (member._id === id) {
            member.attendance = attendanceStatus.noAttended
          }
        });
        setTrainingInfo({ ...trainingInfo, membersInGroup: newMembersInGroup })
        services.trainingService.editTraining({ _id: trainingInfo._id, editedProp: 'membersInGroup', editedPropValue: trainingInfo.membersInGroup });
        break
      default:
        newMembersInGroup.forEach(member => {
          if (member._id === id) {
            member.attendance = attendanceStatus.unknown
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
              <List subheader={<ListSubheader color='primary' >
                {`${trainingInfo.startTime} - ${trainingInfo.endTime}`} ({trainingInfo.group.name})
      </ListSubheader>}>
              </List>
              {!trainingStatus ? <Typography className='canceledTrainingText'>Status Treninga: Otkazan</Typography>
                : null}
             
              <div className='inputButtons'>

                < Button variant="contained" color='default' onClick={returnToTrainingList} >Nazad</Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={4} className='trainingSearchBar'>
              <TextField id="outlined-basic"
                label="Search" />
              {trainingStatus ? <Button className='trainingCancelBtn' variant="contained" color='secondary' onClick={changeTrainingStatus}>Otkaži Trening</Button> : null}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <List subheader={<ListSubheader color='primary' >
        {trainingInfo.group.name}
      </ListSubheader>}>
        {membersInGroup.filter(el => el.attendance === 'unknown').map((el) => (
          <ListItem key={el._id}>
            <ListItemText primary={`${el.firstName} ${el.lastName}`} />
            <ListItemSecondaryAction>
              {trainingStatus ? <AttendanceOptionButtons member={el} processMember={processMember} /> : null}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Divider />
      <ProcessedMembersList membersInGroup={membersInGroup.filter(el => el.attendance !== 'unknown')} processMember={processMember} trainingStatus={trainingStatus} />
    </React.Fragment >
  )
}
