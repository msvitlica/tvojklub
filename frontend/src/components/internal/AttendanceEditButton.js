import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import { Button, Typography } from '@material-ui/core'
import AttendanceOptionButtons from './AttendanceOptionButtons'
export default class AttendanceEditButton extends React.Component {
constructor(props){
    super(props);
    this.state={
        editButton:false,
    }
}
edit=()=>{
    this.setState({
        editButton:true,
    })
}

    render() { 
        return (
            <div>
                <Typography>{this.props.member.attendance} <Button color='primary' onClick={this.edit}>
            <EditIcon></EditIcon>
                </Button></Typography>
                {this.state.editButton ?
                <AttendanceOptionButtons ></AttendanceOptionButtons>: 
                <div></div>
            }
            </div>
        )
        }
    }
