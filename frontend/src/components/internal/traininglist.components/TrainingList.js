import React, { useState, useEffect, useContext } from 'react';
import { Card, CardActionArea, CardContent,Typography} from '@material-ui/core';
import { ServiceContext }from './../../../services/ServiceContext';
import ScheduleBar from './../main.components/ScheduleBar';
import helperMethods from './../../../helpers/helpersMethods';
import { TrainingContext } from './../training-context/TrainingContext';

export default function TrainingList(props) {
  const [trainings, setTrainings] = useState([]);
  const abortController = new AbortController();
  const service = useContext(ServiceContext);
  const [selectedDate, setSelectedDate] = React.useState(new Date().toLocaleDateString());
  const trainingContext = useContext(TrainingContext);
  console.log(trainingContext)
  
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
    console.log(trainingSchedule)
  }

  const handleClick = (obj) => {
    const { match: { params }, history } = props;
    trainingContext.training.setTraining(obj)
    history.push(`trainings/today`);
  }

  return (
    <div>
      <div>
        <ScheduleBar selectedDate={selectedDate} handleDateChange={handleDateChange} getCurrentDate={getCurrentDate} getTomorrowsDate={getTomorrowsDate} getYesterdaysDate={getYesterdaystDate}></ScheduleBar>
      </div>
      <Card>
        {trainings.map((el, index) => (
          <CardActionArea key={el._id ? el._id : index} onClick={() => handleClick(el)} >
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