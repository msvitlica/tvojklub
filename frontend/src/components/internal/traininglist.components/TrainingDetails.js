import React, { useState, useEffect, useContext } from 'react';
import {
  Typography, CardContent, List, ListItem, ListSubheader,
  ListItemText, ListItemSecondaryAction, Card, TextField,
  Divider, Grid, Button
} from '@material-ui/core';
import ProcessedMembersList from './ProcessedMembersList'
import AttendanceOptionButtons from './AttendanceOptionButtons';
import { ServiceContext } from '../../../services/ServiceContext';
import { timeFormatUI } from '../../../helpers/helpersMethods'

export default function TrainingDetails(props) {
  const [trainingInfo, setTrainingInfo] = useState(null);
  const [membersInGroup, setMembersInGroup] = useState([]);
  const [trainingCancelStatus, setTrainingCancelStatus] = useState(true);
  const [trainingFinishStatus, setTrainingFinishStatus] = useState(true);
  const [cancelBtnStatus, setCancelBtnStatus] = useState(true);
  const [finishedBtnStatus, setFinishedBtnStatus] = useState(true);
  const services = useContext(ServiceContext);
  const { match: { params }, history } = props;
  // Get training by id 
  useEffect(() => {
    fetchTraining();
  }, []);

  // Change training status

  const changeTrainingStatus = () => {
    setCancelBtnStatus(false);
    setTrainingCancelStatus(false);
    setFinishedBtnStatus(true);
    services.trainingService.editTraining({ _id: trainingInfo._id, editedProp: 'trainingStatus', editedPropValue: 'canceled' });
  }
  // return to TriningList
  const returnToTrainingList = () => {
    history.push('/trainings')
  }

  // save processed members to database
  const finishTraining = () => {
    setFinishedBtnStatus(true);
    setTrainingFinishStatus(false)
    setCancelBtnStatus(false);
    services.trainingService.editTraining({ _id: trainingInfo._id, editedProp: 'trainingStatus', editedPropValue: 'finished' });
  }
  const fetchTraining = async () => {
    const { match: { params } } = props;
    fetch(`http://localhost:3001/trainings/${params.trainingId}`)
      .then(response => response.json())
      .then(data => {
        setTrainingInfo(data.filteredTraining);
        setMembersInGroup(data.filteredTraining.membersInGroup);
        if (data.filteredTraining.trainingStatus == 'finished') {
          setFinishedBtnStatus(true);
          setTrainingFinishStatus(false)
          setCancelBtnStatus(false);
        }
        if (data.filteredTraining.trainingStatus === 'canceled') {
          setCancelBtnStatus(false);
          setTrainingCancelStatus(false);
          setFinishedBtnStatus(true);
        }
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
            if (membersInGroup.filter(el => el.attendance == 'unknown').length === 0) {
              setFinishedBtnStatus(false);
            } else {
              setFinishedBtnStatus(true);
            }
          }
        });
        setTrainingInfo({ ...trainingInfo, membersInGroup: newMembersInGroup })
        services.trainingService.editTraining({ _id: trainingInfo._id, editedProp: 'membersInGroup', editedPropValue: trainingInfo.membersInGroup });
        break
      case false:
        newMembersInGroup.forEach(member => {
          if (member._id === id) {
            member.attendance = attendanceStatus.noAttended
            if (membersInGroup.filter(el => el.attendance == 'unknown').length === 0) {
              setFinishedBtnStatus(false);
            } else {
              setFinishedBtnStatus(true);
            }
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
              <Typography variant='h6'>
                Termin:{`\n ${timeFormatUI(trainingInfo.startTime)} - ${timeFormatUI(trainingInfo.endTime)}`} </Typography>
              <Typography variant='subtitle1'>
                Grupa: {`\n${trainingInfo.group.name}`}
              </Typography>

              {!trainingCancelStatus ? <Typography color='secondary'>Status Treninga: Otkazan</Typography>
                : null}
              {!trainingFinishStatus ? <Typography color='primary'> Status Treninga: Zavrsen</Typography>
                : null}
              <div className='inputButtons'>
                {finishedBtnStatus ? null :
                  <Button variant='contained' color='primary' onClick={finishTraining}>Zavrsi Trening</Button>
                }
                < Button variant="contained" color='default' onClick={returnToTrainingList} >Nazad</Button>
              </div>

            </Grid>
            <Grid item xs={12} sm={4} className='trainingSearchBar'>
              {/* <TextField id="outlined-basic"
                label="Search" /> */}
              {cancelBtnStatus ? <Button className='trainingCancelBtn' variant="contained" color='secondary' onClick={changeTrainingStatus}>Otkaži Trening</Button> : null}
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
              {cancelBtnStatus ? <AttendanceOptionButtons member={el} processMember={processMember} /> : null}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Divider />
      <ProcessedMembersList membersInGroup={membersInGroup.filter(el => el.attendance !== 'unknown')} processMember={processMember} cancelBtnStatus={cancelBtnStatus} />
    </React.Fragment >
  )
}
