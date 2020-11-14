import React from 'react';
import NavBar from './NavBar';
import Members from './Members';
import NewMember from './NewMember';
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
                    <Route exact path='/members' component={Members} />
                    <Route path='/members/newMember' component={NewMember} />
                    <Route path='/groups' component={Group} />
                    <Route path='/processedGroups' component={TrainingDetails}/>
                </Switch>
            </div>
        )
    }
}
