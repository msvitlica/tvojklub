import React from 'react'
import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import AttendanceEditButton from './AttendanceEditButton'
export class ProcessedMembersList extends React.Component {
    render() {
        return (
            <div>
                <List subheader={<ListSubheader color='primary'>{'Prisustvo:'}
                </ListSubheader>}>
                    {this.props.membersInGroup.map((el) => (
                        <ListItem key={el._id}>
                            <ListItemText primary={`${el.firstName} ${el.lastName}`}
                            />
                            <AttendanceEditButton member={el} processMember={this.props.processMember} cancelBtnStatus={this.props.cancelBtnStatus} />
                        </ListItem>
                    ))}
                </List>
            </div>
        )
    }
}

export default ProcessedMembersList
