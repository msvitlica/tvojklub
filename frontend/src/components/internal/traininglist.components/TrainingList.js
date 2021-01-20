import React, { useState, useEffect, useContext } from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import { ServiceContext } from './../../../services/ServiceContext';
import TrainingListFilter from '../main.components/TrainingListFilter';

export default function TrainingList(props) {

  const [trainings, setTrainings] = useState([]);
  const service = useContext(ServiceContext);
  const [selectedDate, setSelectedDate] = React.useState(new Date().toLocaleDateString());

  const handleDateChange = (date) => {
    setSelectedDate(new Date(date).toLocaleDateString());
  };

  const fetchTrainingByDate = (date) => {
    setSelectedDate(date);
    fetchTrainings();
  }

  const fetchTrainings = async () => {
    const trainingSchedule = await service.trainingService.getAllTrainings(selectedDate);
    setTrainings(trainingSchedule);
  }
  useEffect(() => {
    fetchTrainings();
  }, [selectedDate]);

  const handleClick = (id) => {
    const { match: { params }, history } = props;
    history.push(`trainings/${id}`);
  }

  return (
    <div>
      <div>
        <TrainingListFilter selectedDate={selectedDate} handleDateChange={handleDateChange} fetchTrainingByDate={fetchTrainingByDate}></TrainingListFilter>
      </div>
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