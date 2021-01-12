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
  }, [])
  const fetchTrainings = async() => {
    const currentDay = new Date().toLocaleDateString();
    const trainingSchedule = await service.trainingService.getAllTrainings(currentDay, { signal: abortController.signal });
    setTrainings(trainingSchedule);

  }


  const handleClick = (id) => {
    const { match: { params }, history } = props;
    history.push(`trainings/${id}`);
  }

  return (
    <div>
      <Card>
        {trainings.map((el) => (
          <CardActionArea key={el.id} onClick={() => handleClick(el.id)} >
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