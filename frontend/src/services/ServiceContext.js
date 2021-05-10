import React, { Component } from 'react';
import MemberService from './members-service';
import ScheduleServices from './schedule-services';
import GroupService from './group-service';
import TrainingService from './training-service';
import ClubService from './club-service';
import { MessageService } from './messageService';


// Import all services and backendUrl

const backendUrl = 'http://localhost:3001';

// Create instances of services
export const ServiceContext = React.createContext();

class ServiceContextProvider extends Component {
    constructor(props){
        super(props);
        this.messageService = new MessageService(props.onShowMessage);
        this.state.messageService = this.messageService;
        this.state.memberService = new MemberService(backendUrl, this.messageService);
        this.state.scheduleServices = new ScheduleServices(backendUrl, this.messageService);
        this.state.groupService = new GroupService(backendUrl, this.messageService);
        this.state.trainingService = new TrainingService(backendUrl, this.messageService);
        this.state.clubService = new ClubService(backendUrl, this.messageService);
    }
    state = {}
    render() {
        return (
            <ServiceContext.Provider value={{ ...this.state }}>
                {this.props.children}
            </ServiceContext.Provider>
        )
    }
}

export default ServiceContextProvider;