import React, { Component } from 'react';
import GameBoard from './components/GameBoard';
import Modal from './components/Modal';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			factorDepth: 3,
			winner: undefined
		};
		this.closeOutTime = 2500;
		this.handleWinner = this.handleWinner.bind(this);
	}
	
	handleWinner(winner) {
		const releaseGameState = () => {
			return window.setTimeout(() => this.setState({
				winner: undefined,
				factorDepth: this.state.factorDepth + 1
			}), this.closeOutTime);
		}
		this.setState({
			winner
		}, releaseGameState);
	}
	
	render() {
		const columns = Array.from({length: this.state.factorDepth},
			_ => Array.from({length: this.state.factorDepth}, 
				_ => undefined));
		return (
			<div className="app">
				<div id="display">
					{this.state.winner && (
						<Modal
							closeOutTime={this.closeOutTime}
						>
							<p>Winner!</p>
							<p>{this.state.winner}</p>
						</Modal>
					)}
					<GameBoard
						isClosed={this.state.winner !== undefined}
						factorDepth={this.state.factorDepth}
						columns={columns}
						handleWinner={this.handleWinner}
					/>
				</div>
			</div>
		);
	}
}

export default App;