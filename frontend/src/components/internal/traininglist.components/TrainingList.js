import React, { useState, useEffect, useContext } from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import { ServiceContext } from './../../../services/ServiceContext';
import TrainingListFilter from '../main.components/TrainingListFilter';
import { timeFormatUI } from './../../../helpers/helpersMethods';

export default function TrainingList(props) {
  const [selectedDate, setSelectedDate] = useState(new Date().getTime());
  const [trainings, setTrainings] = useState([]);
  const abortController = new AbortController;
  const service = useContext(ServiceContext);
  const { match: { params }, history } = props;

  // props.history.location.states is object passed from TrainingDetails component
  // it contains chosen date in milliseconds
    console.log(props.history.location.state)
    console.log(selectedDate)

  const handleDateChange = (date) => {
    setSelectedDate(new Date(date).getTime());
  };

  const fetchTrainings = async () => {
    const trainingSchedule = await service.trainingService.getAllTrainings(selectedDate, { signal: abortController.signal });
    setTrainings(trainingSchedule);
  }
  const onSaveTrainig = async (newTraining) => {
    return await service.trainingService.saveTraining(newTraining);
  }

  useEffect(() => {
    fetchTrainings();
  }, [selectedDate]);

  // update selectedDate variable to chosen date
 useEffect((prevState)=>{
   if( props.history.location.state !== prevState){
  setSelectedDate(props.history.location.state.selectedDate)
   }
 },[props.history.location.state])


  const showTrainingDetails = async (training) => {
    if (!training._id) {
      const trainingId = await onSaveTrainig(training);
      history.push(`trainings/${trainingId}`);
    } else {
      history.push(`trainings/${training._id}`);
    }
  }

  return (
    <div>
      <div>
        <TrainingListFilter selectedDate={selectedDate} handleDateChange={handleDateChange}></TrainingListFilter>
      </div>
      <Card>
        {trainings.map((el) => (
          <CardActionArea key={el._id} onClick={() => showTrainingDetails(el)} >
            <CardContent>
              <Typography>
                {`${timeFormatUI(el.startTime)} - ${timeFormatUI(el.endTime)}`}
              </Typography>
              {el.trainingStatus === 'canceled' ? <Typography color='secondary'>Status Treninga: Otkazan</Typography> : null}
              {el.trainingStatus === 'finished' ? <Typography color='primary'> Status Treninga: Zavrsen</Typography> : null}
              <br></br>
              <Typography variant='subtitle1'>
                <b>Grupa:</b>{`\n${el.group.name}`}
              </Typography>
              <Typography variant='subtitle1'>
                <b>Trener: </b>{`\n${el.coach}`}
              </Typography>
            </CardContent>
          </CardActionArea>
        ))}
      </Card>
    </div>
  )
}