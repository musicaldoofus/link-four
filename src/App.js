import React, { Component } from 'react';
import HUD from './components/HUD';
import GameBoard from './components/GameBoard';
import Modal from './components/Modal';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.initFactorDepth = 3;
		this.state = {
			factorDepth: this.initFactorDepth,
			scores: {
				user: 0,
				cpu: 0
			},
			winner: undefined,
			columns: this.getNewColumns()
		};
		this.closeOutTime = 2500;
		this.handleWinner = this.handleWinner.bind(this);
		this.getNewColumns = this.getNewColumns.bind(this);
		this.incrementScore = this.incrementScore.bind(this);
	}

	getNewColumns(depth) {
		const increment = depth ? depth : 1;
		const levelUpFactorDepth = this.state ? this.state.factorDepth + increment : this.initFactorDepth;
		const arrayTemplate = {
			length: levelUpFactorDepth
		};
		return Array.from(arrayTemplate, _ => Array.from(arrayTemplate, _ => undefined));
	}

	incrementScore(role, amt) {
		console.log('incrementScore', role, amt, this.state.scores);
		const opponentRole = role === 'user' ? 'cpu' : 'user';
		const scores = {
			[role]: this.state.scores[role] + (amt ? amt : 1),
			[opponentRole]: this.state.scores[opponentRole]
		};
		console.log('updated scores', scores);
		this.setState({scores});
	}
	
	handleWinner(winner) {
		console.log('handleWinner', winner);
		const successIncrement = this.state.factorDepth * 2;
		const increment = winner === 'tie' ? -successIncrement : 1;
		const user = winner === 'user' ? this.state.scores.user + successIncrement : this.state.scores.user + increment;
		const cpu = winner === 'cpu' ? this.state.scores.cpu + successIncrement : this.state.scores.cpu + increment;
		const scores = {
			user,
			cpu
		};
		const releaseGameState = () => {
			return window.setTimeout(() => this.setState({
				winner: undefined,
				scores,
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
					<HUD
						scores={this.state.scores}
					/>
					<GameBoard
						isClosed={this.state.winner !== undefined}
						factorDepth={this.state.factorDepth}
						columns={this.state.columns}
						incrementScore={this.incrementScore}
						handleWinner={this.handleWinner}
						handleTie={() => this.handleWinner('tie')}
						closeOutTime={this.closeOutTime}
					/>
					{this.state.winner && (
						<Modal
							closeOutTime={this.closeOutTime}
						>
							<p>{this.state.winner === 'tie' ? 'Tie...' : 'Winner!'}</p>
							<p>{this.state.winner === 'tie' ? ':-(' : this.state.winner}</p>
						</Modal>
					)}
				</div>
			</div>
		);
	}
}

export default App;