import React from 'react';
import TrainingDetails from './TrainingDetails';
import NavBar from './NavBar';
import TrainngList from './TrainingList';
import ScheduleBar from './ScheduleBar';
export default class InternalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      value: 2,
      trainings: [],
      trainingId: 'ima li id-ja?'
    };
  }
  componentDidMount = () => {
    fetch('http://localhost:3001/trainings/list')
      .then(response => response.json())
      .then(data => {
        console.log(data.trainings)
        this.setState({ trainings: data.trainings });
      });
  }
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  }
  previousStep = () => {
    const { step } = this.state;
    this.setState({
      step: step -1,
    });
  }
  fetchTrainingById = (id) => {
    this.setState({ trainingId: id },()=>{
      console.log(this.state.trainingId)
    })
   
  }
  render() {
    const { step } = this.state;
    const { value } = this.state;
    const tabValue = { value };
    switch (step) {
      default:
      case 1:
        return (
          <div>
            <NavBar />
            <ScheduleBar
              tabValue={tabValue}
            />
            <TrainngList
              onChildClick={this.fetchTrainingById}
              nextStep={this.nextStep}
              trainings={this.state.trainings}
            />
          </div>
        )
      case 2:
        return (
          <div>
            <NavBar previousStep={this.previousStep}/>
            <TrainingDetails
              trainingId={this.state.trainingId}
            />
          </div>
        )
    }
  }
}

