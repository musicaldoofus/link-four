import React, { Component } from 'react';
import './HUD.css';

class HUD extends Component {
    render() {
        console.log('HUD render', this.props);
        return (
            <div className="heads-up-display">
                <div id="user-score">
                    <div>{this.props.scores.user}</div>
                </div>
                <div id="cpu-score">
                    <div>{this.props.scores.cpu}</div>
                </div>
            </div>
        )
    }
}

export default HUD;