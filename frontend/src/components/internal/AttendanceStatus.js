import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core'
export default class AttendanceStatus extends React.Component {
    buttonYClicked = () => {
        let attended = this.props.attended;
        let memberId = this.props.member.id;
        this.props.processMember(memberId, attended)
    }
    buttonNClicked = () => {
        let notAttended = this.props.notAttended;
        let memberId = this.props.member.id;
        this.props.processMember(memberId, notAttended)
    }
    render() {
        return (
            <div>
                <ButtonGroup variant="contained" >
                    <Button className='attendanceBtnY' size='large' onClick={this.buttonYClicked}>Da</Button>
                    <Button className='attendanceBtnN' size='large' onClick={this.buttonNClicked}>Ne</Button>
                </ButtonGroup>
            </div>
        )
    }
}

