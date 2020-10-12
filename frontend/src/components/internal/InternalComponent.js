import React from 'react';
import NavBar from './NavBar';
import Members from './Members';
import TrainingList from './TrainingList';
import TrainingDetails from './TrainingDetails';

// Routing components 

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';


export default class InternalComponent extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={TrainingList} />
          <Route path='/trainings/list' component={TrainingList} />
          <Route path='/members' component={Members} />
          <Route path='/trainings/:trainingId' component={TrainingDetails} />
        </Switch>

      </div>
    )
  }
}

