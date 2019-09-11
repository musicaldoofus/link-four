import React, { Component } from 'react';
import GameBoard from './components/GameBoard';
import Modal from './components/Modal';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.initFactorDepth = 3;
		this.state = {
			factorDepth: this.initFactorDepth,
			winner: undefined,
			columns: this.getNewColumns()
		};
		this.closeOutTime = 2500;
		this.handleWinner = this.handleWinner.bind(this);
		this.getNewColumns = this.getNewColumns.bind(this);
	}

	getNewColumns() {
		return Array.from({length: this.state ? this.state.factorDepth + 1 : this.initFactorDepth},
			_ => Array.from({length: this.state ? this.state.factorDepth + 1 : this.initFactorDepth}, 
				_ => undefined));
	}
	
	handleWinner(winner) {
		const releaseGameState = () => {
			return window.setTimeout(() => this.setState({
				winner: undefined,
				factorDepth: this.state.factorDepth + 1,
				columns: this.getNewColumns()
			}), this.closeOutTime);
		}
		this.setState({
			winner
		}, releaseGameState);
	}
	
	render() {
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
						columns={this.state.columns}
						handleWinner={this.handleWinner}
					/>
				</div>
			</div>
		);
	}
}

export default App;