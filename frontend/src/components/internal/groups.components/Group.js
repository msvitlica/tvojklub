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

export default function Group(props) {
    return (
        <div>
            <div>
                <Link to='/groups/new'>
                    <Button variant="contained">Nova Grupa</Button>
                </Link>
                <GroupList />
                <Route path='/groups/new' component={AddGroupModal} />
                <Route path='/groups/edit/:id' component={AddGroupModal} />
            </div>
        </div>
    )
}


