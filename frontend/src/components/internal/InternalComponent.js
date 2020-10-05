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
      value:2,
      trainings: [],
      trainingInfo: []
    };
  }
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  }
  componentDidMount = () => {
    fetch('http://localhost:3001/trainings/2')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ trainingInfo: data.trainingInfo});
      });
  }
 

  render() {
        return (
          <div>
            <NavBar></NavBar>
      <TrainingDetails
      trainingInfo={this.state.trainingInfo}
/>
</div>
        )
    }
  }



