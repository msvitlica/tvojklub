import React, { useState, useEffect, useContext } from 'react';
import { Card, CardActionArea, CardContent,Typography} from '@material-ui/core';
import { ServiceContext }from './../../../services/ServiceContext';
import ScheduleBar from './../main.components/ScheduleBar';
import helperMethods from './../../../helpers/helpersMethods';

export default function TrainingList(props) {
  const [trainings, setTrainings] = useState([]);
  const abortController = new AbortController();
  const service = useContext(ServiceContext);
  const [selectedDate, setSelectedDate] = React.useState(new Date().toLocaleDateString());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const getTomorrowsDate= (currentDate)=>{
    setSelectedDate(helperMethods.calculateDate(new Date(currentDate),1) );
    fetchTrainings();
    };
    const getCurrentDate= ()=>{
      setSelectedDate(new Date().toLocaleDateString());
      fetchTrainings();
    }
    const getYesterdaystDate= (currentDate)=>{
      setSelectedDate(helperMethods.calculateDate(new Date(currentDate),-1));
      fetchTrainings();
    }
  useEffect(() => {
    fetchTrainings();

   /*  return () => {
      abortController.abort();
  } */
  }, [selectedDate])
  const fetchTrainings = async() => {
    const trainingSchedule = await service.trainingService.getAllTrainings(selectedDate/* , { signal: abortController.signal } */);
    setTrainings(trainingSchedule);
  }

  const handleClick = (id) => {
    const { match: { params }, history } = props;
    history.push(`trainings/${id}`);
  }

  return (
    <div>
      <div>
        <ScheduleBar selectedDate={selectedDate} handleDateChange={handleDateChange} getCurrentDate={getCurrentDate} getTomorrowsDate={getTomorrowsDate} getYesterdaysDate={getYesterdaystDate}></ScheduleBar>
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