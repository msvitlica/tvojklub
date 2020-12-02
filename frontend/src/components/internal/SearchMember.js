import React from 'react'
import {List,ListItem,ListItemText,ListSubheader,} from '@material-ui/core';
import AttendanceEditButton from './AttendanceEditButton';
export default function SearchMember (props) {
        return (
            <div>
                <List subheader={<ListSubheader color='primary'>{'Rezultat pretrage'}
                </ListSubheader>}>
                    {props.searchResult.map((el) => (
                        <ListItem key={el.id}>
                            <ListItemText primary={el.name}
                            />
                            <AttendanceEditButton member={el} processMember={props.processMember}/>
                        </ListItem>
                    ))}
                </List>
            </div>
        )
    }
