import React from 'react';
import './Controls.css';

const Controls = ({factorDepth, handleStartGame, handleDepthUpdate, handleRetry}) => (
	<div className="controls">
		{handleStartGame &&
			<div id="start-control">
					
			</div>
		}
		<div id="depth-control">
			<label htmlFor="depth">Connect {factorDepth}!</label>
			<input name="depth" id="depth" type="number" min="2" onChange={handleDepthUpdate} value={factorDepth}/>
		</div>
		<div id="retry-control">
			<button onClick={handleRetry}>Retry</button>
		</div>
	</div>
);
		
export default Controls;