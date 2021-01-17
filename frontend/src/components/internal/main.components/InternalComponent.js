import React from 'react';
import NavBar from './NavBar';
import Members from '../members.component/Members';
import NewMember from '../members.component/NewMember';
import TrainingList from '../traininglist.components/TrainingList';
import GroupList from '../groups.components/GroupList';
import AddGroupDialog from '../groups.components/AddGroupDialog';
import TrainingDetails from '../traininglist.components/TrainingDetails';
import ScheduleManagement from '../schedule.components/ScheduleManagement';
import NewSchedule from '../schedule.components/AddNewSchedule';
import TrainingContextProvider, { TrainingContext } from './../training-context/TrainingContext';

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
        return (
            <TrainingContextProvider>
                <div>
                    <NavBar logout={this.props.logout} />
                    <Switch>
                        <Route exact path="/" component={TrainingList} />
                        <Route path='/trainings/:trainingId' component={TrainingDetails} />
                        <Route path='/trainings/today' component={TrainingDetails} />
                        <Route path='/trainings' component={TrainingList} />
                        <Route exact path='/members' component={Members} />
                        <Route path='/members/newMember' component={NewMember} />
                        <Route exact path='/groups' component={GroupList} />
                        <Route exact path='/groups/new' component={AddGroupDialog} />
                        <Route path='/groups/edit/:id' component={AddGroupDialog} />
                        <Route path='/processedGroups' component={TrainingDetails} />
                        <Route path='/schedule-management/edit/:id' component={NewSchedule} />
                        <Route path='/schedule-management/new-schedule' component={NewSchedule} />
                        <Route path='/schedule-management' component={ScheduleManagement} />
                    </Switch>
                </div>
            </TrainingContextProvider>
        )
    }
}
