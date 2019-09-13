import React, { Component } from 'react';
import HUD from './components/HUD';
import GameBoard from './components/GameBoard';
import Modal from './components/Modal';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.initFactorDepth = 3;
		this.initScores = {
			user: 0,
			cpu: 0
		};
		this.initState = {
			showGameBoard: true,
			factorDepth: this.initFactorDepth,
			scores: this.initScores,
			winner: undefined
		};
		this.state = this.initState;
		this.closeOutTime = 2500;
		this.handleWinner = this.handleWinner.bind(this);
		this.incrementScore = this.incrementScore.bind(this);
		this.handleRefresh = this.handleRefresh.bind(this);
	}

	incrementScore(role, amt) {
		const opponentRole = role === 'user' ? 'cpu' : 'user';
		const scores = {
			[role]: this.state.scores[role] + (amt ? amt : 1),
			[opponentRole]: this.state.scores[opponentRole]
		};
		this.setState({scores});
	}
	
	handleWinner(winner) {
		const successIncrement = this.state.factorDepth * 2;
		const increment = winner === 'tie' ? -successIncrement : 1;
		const user = winner === 'user' ? this.state.scores.user + successIncrement : this.state.scores.user + increment;
		const cpu = winner === 'cpu' ? this.state.scores.cpu + successIncrement : this.state.scores.cpu + increment;
		const scores = {
			user,
			cpu
		};
		this.setState({
			winner,
			scores
		}, () => window.setTimeout(() => this.handleRefresh(winner === 'tie' ? -1 : 1), this.closeOutTime));
	}

	handleRefresh(increment) {
		const factorDepth = increment ? this.state.factorDepth + increment : this.initFactorDepth;
		const scores = increment ? this.state.scores : this.initScores;
		const toggleState = Object.assign({}, this.initState, {
			showGameBoard: false,
			factorDepth,
			scores
		});
		this.setState(toggleState, () => {
			window.setTimeout(() => this.setState({
				showGameBoard: true
			}), increment ? 400 : 10)
		});
	}
	
	render() {
		const boardContainerStyle = {
			width: `${(this.state.factorDepth * 4) + this.state.factorDepth - 1 + 4}em`,
			height: `${(this.state.factorDepth * 4) + this.state.factorDepth + 8}em`
		};
		console.log(boardContainerStyle);
		return (
			<div className="app">
				<div className="board-container" style={boardContainerStyle}>
					<HUD
						scores={this.state.scores}
						handleRefresh={() => this.handleRefresh()}
					/>
					{this.state.showGameBoard && (
						<GameBoard
							isClosed={this.state.winner !== undefined}
							factorDepth={this.state.factorDepth}
							incrementScore={this.incrementScore}
							handleWinner={this.handleWinner}
						/>
					)}
				</div>
				{this.state.winner && (
					<Modal
						closeOutTime={this.closeOutTime}
					>
						<p>{this.state.winner === 'tie' ? 'Tie...' : 'Winner!'}</p>
						<p>{this.state.winner === 'tie' ? ':-(' : this.state.winner}</p>
					</Modal>
				)}
			</div>
		);
	}
}

export default App;