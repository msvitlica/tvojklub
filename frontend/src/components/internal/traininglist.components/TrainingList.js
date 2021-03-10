import React, { useState, useEffect, useContext } from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import { ServiceContext } from './../../../services/ServiceContext';
import TrainingListFilter from '../main.components/TrainingListFilter';

export default function TrainingList(props) {
  const [selectedDate, setSelectedDate] = React.useState(new Date().getTime());
  const [trainings, setTrainings] = useState([]);
  const abortController = new AbortController;
  const service = useContext(ServiceContext);

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

  const showTrainingDetails = async (training) => {
    const { match: { params }, history } = props;
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
                {`${el.startTime} - ${el.endTime}`}
              </Typography>
              {el.trainingStatus === 'canceled' ? <Typography>Status Treninga: Otkazan</Typography> : null}
              <br></br>
              <Typography > {el.group.name}
              </Typography>
              <Typography>
                {el.coach}
              </Typography>
            </CardContent>
          </CardActionArea>
        ))}
      </Card>
    </div>
  )
}