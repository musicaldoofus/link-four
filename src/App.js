import React, { Component } from 'react';
import Controls from './components/Controls';
import GameBoard from './components/GameBoard';
import TURN_STATES from './helpers/TURN_STATES';
import './App.css';

class App extends Component {
	constructor() {
		super();
		const initFactorDepth = 4;
		const initColumnsState = Array.from({length: initFactorDepth}, (_ => Array.from({length: initFactorDepth}, _ => false)));
		this.initState = {
			columnStates: initColumnsState,
			turnState: TURN_STATES.USER_MOVE,
			winner: undefined
		};
		this.state = {
			factorDepth: initFactorDepth,
			gameStates: []
		};
		this.handleStartGame = this.handleStartGame.bind(this);
		this.handleGameStateUpdate = this.handleGameStateUpdate.bind(this);
		this.handleDepthUpdate = this.handleDepthUpdate.bind(this);
		this.handleRetry = this.handleRetry.bind(this);
	}
	
	handleStartGame() {
		this.setState({gameStates: this.state.gameStates.concat(this.initState)});
	}
	
	handleGameStateUpdate(state) {
		this.setState({gameStates: this.state.gameStates.concat(state)});
	}
	
	handleDepthUpdate(factorDepth) {
		if (this.state.gameStates[this.state.gameStates.length - 1].turnState === TURN_STATES.INACTIVE) this.setState({factorDepth});
	}
	
	handleRetry() {
		this.handleGameStateUpdate(this.initState);
	}
	
	render() {
		const currentGameState = this.state.gameStates[this.state.gameStates.length - 1];
		return (
			<div className="app">
				<div id="display">
					<p>{currentGameState && currentGameState.turnState}</p>
				</div>
				<Controls
					factorDepth={this.state.factorDepth}
					handleDepthUpdate={this.handleDepthUpdate}
					handleRetry={this.handleRetry}
					handleStartGame={currentGameState === undefined ? this.handleStartGame : undefined}
				/>
				<GameBoard
					handleGameStateUpdate={this.handleGameStateUpdate}
					factorDepth={this.state.factorDepth}
					gameState={currentGameState}
					turnIndex={this.state.gameStates.length - 1}
				/>
			</div>
		);
	}
}

export default App;