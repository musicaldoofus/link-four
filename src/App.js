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
		/*
		setState (lock GameBoard - set winner)
		show modal
		close modal (timeout for 1500ms)
		setState (unlock GameBoard - set winner = undefined and factorDepth += 1)
		*/
		const releaseGameState = () => {
			return window.setTimeout(() => this.setState({
				winner: undefined,
				factorDepth: this.state.factorDepth + 1
			}), 1500);
		}
		this.setState({
			winner
		}, releaseGameState);
	}
	
	render() {
		return (
			<div className="app">
				<div id="display">
					<p>Winner: {this.state.winner}</p>
					<p>factorDepth: {this.state.factorDepth}</p>
				</div>
				{this.state.winner === undefined &&
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