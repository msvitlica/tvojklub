import React from 'react'
import { List, ListItem, ListItemText, ListSubheader} from '@material-ui/core';
import AttendanceEditButton from './AttendanceEditButton'
export class ProcessedMembersList extends React.Component {
    render() {
        return (
            <div>
                <List subheader={<ListSubheader color='primary'>{'Processed Members'}
                </ListSubheader>}>
                    {this.props.membersInGroup.map((el) => (
                        <ListItem key={el.id}>
                            <ListItemText primary={el.name}
                            />
                           <AttendanceEditButton member={el} processMember={this.props.processMember}/>
                        </ListItem>
                    ))}
                </List>
            </div>
        )
    }
}

export default ProcessedMembersList
