import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core'
export default class AttendanceOptionButtons extends React.Component {
    buttonYClicked = () => {        
        let memberId = this.props.member.id;
        this.props.processMember(memberId, true)
    }
    buttonNClicked = () => {        
        let memberId = this.props.member.id;
        this.props.processMember(memberId, false)
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

