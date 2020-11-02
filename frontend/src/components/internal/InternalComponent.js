import React from 'react';
import NavBar from './NavBar';
import Members from './Members';
import TrainingList from './TrainingList';
import Group from './Group';
import TrainingDetails from './TrainingDetails';

// Routing components 

import {
    Switch,
    Route
} from 'react-router-dom';


export default class InternalComponent extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <NavBar logout={this.props.logout} />
                <Switch>
                    <Route exact path="/" component={TrainingList} />
                    <Route path='/trainings/:trainingId' component={TrainingDetails} />
                    <Route path='/trainings' component={TrainingList} />
                    <Route path='/members' component={Members} />
                    <Route path='/groups' component={Group} />
                </Switch>
            </div>
        )
    }
}

