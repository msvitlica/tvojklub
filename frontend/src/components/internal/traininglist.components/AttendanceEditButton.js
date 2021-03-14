import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import { Button, Typography, ButtonGroup } from '@material-ui/core'

export default class AttendanceEditButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editButton: false,
        }
    }
    edit = () => {
        this.setState({
            editButton: true
        })
    }
    buttonYClicked = () => {
        let memberId = this.props.member._id;
        this.props.processMember(memberId, true);
        this.setState({
            editButton: false
        })
    }
    buttonNClicked = () => {
        let memberId = this.props.member._id;
        this.props.processMember(memberId, false);
        this.setState({
            editButton: false
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.props.trainingStatus ?
            <div>
                {this.state.editButton ?
                    <div>
                        <ButtonGroup variant="contained" >
                            <Button className='attendanceBtnY' size='large' onClick={this.buttonYClicked}>Da</Button>
                            <Button className='attendanceBtnN' size='large' onClick={this.buttonNClicked}>Ne</Button>
                        </ButtonGroup>
                        <div> </div>
                    </div>
                    :
                    <Typography>{this.props.member.attendance} <Button color='primary' onClick={this.edit}>
                        <EditIcon></EditIcon>
                    </Button></Typography>
                }
            </div>
            : 
            null
    }
            </React.Fragment>
        )
    }
}
