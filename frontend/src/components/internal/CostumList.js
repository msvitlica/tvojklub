import React from 'react'
import { List, Link, ListItem, ListItemText, ListSubheader, Typography, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AttendanceStatus from './AttendanceStatus';
export class CostumList extends React.Component {
    render() {
        return (
            <div>
                <List subheader={<ListSubheader color='primary'>{'Processed Members'}
                </ListSubheader>}>
                    {this.props.membersInGroup.map((el) => (
                        <ListItem key={el.id}>
                            <ListItemText primary={el.name}
                            />
                            <Typography>{el.attendance}</Typography>
                            <Link >
                                <Button color='primary'>
                                    <EditIcon></EditIcon>
                                </Button>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </div>
        )
    }
}

export default CostumList
