import React, { useState, useEffect, useContext } from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import { ServiceContext }from './../../../services/ServiceContext';

export default function TrainingList(props) {
  const [trainings, setTrainings] = useState([]);
  const abortController = new AbortController();
  const service = useContext(ServiceContext);
  useEffect(() => {
    fetchTrainings();

    return () => {
      abortController.abort();
  }
  }, []);
  console.log(trainings);
  const fetchTrainings = async() => {
    const currentDay = new Date().getTime();
    const trainingSchedule = await service.trainingService.getAllTrainings(currentDay, { signal: abortController.signal });
    setTrainings(trainingSchedule);
  }
  const onSaveTrainig = async (newTraining) => {
    return await service.trainingService.saveTraining(newTraining);
  }


  const showTrainingDetails = async (training) => {
    const { match: { params }, history } = props;
    console.log(training)
    if(!training._id) {
      const trainingId = await onSaveTrainig(training);
      history.push(`trainings/${trainingId}`);
    } else {
      history.push(`trainings/${training._id}`);
    }
  }

  return (
    <div>
      <Card>
        {trainings.map((el) => (
          <CardActionArea key={el._id} onClick={() => showTrainingDetails(el)} >
            <CardContent>
              <Typography> {el.term}
              </Typography>
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