import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClosed: false
        }
    }

    componentDidMount() {
        window.setTimeout(() => this.setState({
            isClosed: true
        }), this.props.closeOutTime);
    }

    render() {
        return (
            <div className="modal">
                {this.props.children}
            </div>
        )
    }
}

export default Modal;