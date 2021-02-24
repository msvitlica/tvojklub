import React, { Component } from 'react';
import { MessageService } from './messageService';
import MemberService from './members-service';
import ScheduleService from './schedule-service';
import GroupService from './group-service';
import TrainingService from './training-service';

// backendUrl
const backendUrl = 'http://localhost:3001';

// create context using hook
export const ServiceContext = React.createContext();

class ServiceContextProvider extends Component {
    constructor(props){
        super(props);
        this.messageService = new MessageService(props.onShowMessage);
        this.state.messageService= this.messageService;
        this.state.groupService= new GroupService(backendUrl,this.messageService);
        this.state.memberService= new MemberService(backendUrl,this.messageService);
        this.state.scheduleServices= new ScheduleService(backendUrl,this.messageService);
        this.state.trainingService= new TrainingService(backendUrl,this.messageService);

    }
    state = {
    
    }
    render() {
        return (
            <ServiceContext.Provider value={{ ...this.state }}>
                {this.props.children}
            </ServiceContext.Provider>
        )
    }
}
export default ServiceContextProvider;