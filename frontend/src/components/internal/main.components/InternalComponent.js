import React from 'react';
import NavBar from './NavBar';
import Members from '../members.component/Members';
import Dashboard from '../dashboard.component/Dashboard';
import NewMember from '../members.component/NewMember';
import EditMember from '../members.component/EditMember';
import TrainingList from '../traininglist.components/TrainingList';
import GroupList from '../groups.components/GroupList';
import AddGroupDialog from '../groups.components/AddGroupDialog';
import TrainingDetails from '../traininglist.components/TrainingDetails';
import ScheduleManagement from '../schedule.components/ScheduleManagement';
import NewSchedule from '../schedule.components/AddNewSchedule';

// Routing components 

import {
    Switch,
    Route
} from 'react-router-dom';

export default class InternalComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props.user);
        return (
            <div>
                <NavBar logout={this.props.logout} />
                <Switch>
                    <Route 
                        exact 
                        path="/" 
                        render={props => <Dashboard {...props} user={this.props.user} />} 
                        />
                    <Route path='/trainings/:trainingId' component={TrainingDetails} />
                    <Route path='/trainings' component={TrainingList} />
                    <Route exact path='/members' component={Members} />
                    <Route path='/members/newMember' component={NewMember} />
                    <Route path='/members/edit/:id' component={EditMember} />
                    <Route exact path='/groups' component={GroupList} />
                    <Route exact path='/groups/new' component={AddGroupDialog} />
                    <Route path='/groups/edit/:id' component={AddGroupDialog} />
                    <Route path='/processedGroups' component={TrainingDetails} />
                    <Route path='/schedule-management/edit/:id' component={NewSchedule} />
                    <Route path='/schedule-management/new-schedule' component={NewSchedule} />
                    <Route path='/schedule-management' component={ScheduleManagement} />
                </Switch>
            </div>
        )
    }
}
