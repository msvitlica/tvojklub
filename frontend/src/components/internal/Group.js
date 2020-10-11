import React from 'react';
import { 
    Link, 
    Route 
} from 'react-router-dom';
import AddGroupModal from './AddGroupModal';
import GroupList from './GroupList';

// MUI components 

import {
    Button
} from '@material-ui/core';


class Group extends React.Component {
    render() {
        return (
            <div>
                <GroupList />
                <Link to='/groups/new'>
                    <Button variant="contained">Nova Grupa</Button>
                </Link>
                <Route path='/groups/new' component={AddGroupModal} />
            </div>
        )
    }
}

export default Group;