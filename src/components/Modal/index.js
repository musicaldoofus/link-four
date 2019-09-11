import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            containerClassNames: ''
        };
        this.transitionTime = 400; //find a way to clean up - duplicate value in stylesheet
    }

    componentDidMount() {
        /*
        fade in modal container by adding a class after 100ms
        declare callback for setState: set class to closed
        */
        const closeModal = () => {
            return window.setTimeout(() => this.setState({
                containerClassNames: 'closed'
            }), this.props.closeOutTime - this.transitionTime)
        }
        window.setTimeout(() => this.setState({
            containerClassNames: 'open'
        }, closeModal)
        , 50);
    }

    render() {
        return (
            <div className={`modal-container${this.state.containerClassNames !== '' ? ' ' + this.state.containerClassNames : ''}`}>
                <div className="modal">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Modal;