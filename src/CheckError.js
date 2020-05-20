import React, { Component } from 'react';

class Error extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <h2>Something went wrong! Refresh and try again.</h2>
            );
        }
        return this.props.children;
    }

}

export default Error;