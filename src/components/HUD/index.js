import React from 'react';
import './HUD.css';

const HUD = ({scores, handleRefresh}) => {
    return (
        <div className="heads-up-display">
            <div id="user-score">
                <div>{scores.user}</div>
                <div>User</div>
            </div>
            <div id="cpu-score">
                <div>{scores.cpu}</div>
                <div>CPU</div>
            </div>
            <div id="controls">
                <button onClick={handleRefresh}>Restart</button>
            </div>
        </div>
    )
}

export default HUD;