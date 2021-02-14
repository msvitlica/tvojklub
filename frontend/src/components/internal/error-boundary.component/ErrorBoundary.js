import React, { Component } from 'react';
import { ServiceContext } from './../../../services/ServiceContext';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static contextType = ServiceContext;

    componentDidCatch(error, info) {
        const services = this.context;
        console.log(error, info)
        // Display fallback UI
        this.setState({ hasError: true });
        services.messageService.showError('Something went wrong');
    }

    render() {
        const services = this.context
        if (this.state.hasError) {
            return <h1>Došlo je do greške...</h1>
        }
        return this.props.children;
    }
}