import React, { Component } from 'react';
import MemberService from './members-service';
import ScheduleServices from './schedule-services';

// Import all services and backendUrl

const backendUrl = 'http://localhost:3001';

// Create instances of services
export const ServiceContext = React.createContext();
const memberService = new MemberService(backendUrl);
const scheduleServices = new ScheduleServices(backendUrl);


class ServiceContextProvider extends Component {
    state = {
        memberService,
        scheduleServices
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