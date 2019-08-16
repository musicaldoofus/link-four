import React, { Component } from 'react';
import GameBoard from './components/GameBoard';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			factorDepth: 4,
			winner: undefined
		};
		this.handleWinner = this.handleWinner.bind(this);
	}
	
	handleWinner(winner) {
		this.setState({winner});
	}
	
	render() {
		return (
			<div className="app">
				<div id="display">
					<p>Winner: {this.state.winner}</p>
				</div>
				{this.state.gameState !== 'winner' &&
					<GameBoard
						isClosed={this.state.winner !== undefined}
						factorDepth={this.state.factorDepth}
						handleWinner={this.handleWinner}
					/>
				}
			</div>
		);
	}
}

export default App;