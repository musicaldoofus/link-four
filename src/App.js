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
		this.handleIncrementScore = this.handleIncrementScore.bind(this);
		this.handleWinner = this.handleWinner.bind(this);
		this.handleRefresh = this.handleRefresh.bind(this);
		this.handleWindowHeightCheck = this.handleWindowHeightCheck.bind(this);
	}

	handleIncrementScore(role, amt) {
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
			this.handleWindowHeightCheck();
			window.setTimeout(() => this.setState({
				showGameBoard: true
			}), increment ? 400 : 10)
		});
	}

	handleWindowHeightCheck() {
		const heightEm = ((window.innerHeight * 3)/4)/12;
		const showFooter = heightEm > (8 + (this.state.factorDepth * 4) + this.state.factorDepth + 8);
		this.setState({showFooter});
	}

	componentDidMount() {
		this.handleWindowHeightCheck();
		window.addEventListener('resize', this.handleWindowHeightCheck)
	}
	
	render() {
		const gridSpaces = (this.state.factorDepth - 1) * 0.5;
		const tokens = this.state.factorDepth * 4;
		const gameBoardPadding = 2;
		const padding = 3.5;
		const hud = 6;
		const width = `${gridSpaces + tokens + padding + hud}em`;
		const boardContainerStyle = {
			width,
			height: `${(this.state.factorDepth * 4) + this.state.factorDepth + 3}em`,
			gridTemplateColumns: `${gridSpaces + tokens + gameBoardPadding}em 6em`
		};
		return (
			<div className="app">
				<main className="board-container" style={boardContainerStyle}>
					{this.state.showGameBoard ? (
						<GameBoard
							factorDepth={this.state.factorDepth}
							handleIncrementScore={this.handleIncrementScore}
							handleWinner={this.handleWinner}
						/>
					) : (
						<div className="empty-game-board"></div>
					)}
					<HUD
						scores={this.state.scores}
						handleRefresh={() => this.handleRefresh()}
					/>
				</main>
				{this.state.winner && (
					<Modal
						closeOutTime={this.closeOutTime}
					>
						<p>{this.state.winner === 'tie' ? 'Tie...' : 'Winner!'}</p>
						<p>{this.state.winner === 'tie' ? ':-(' : this.state.winner}</p>
					</Modal>
				)}
				<footer className={this.state.showFooter ? 'showing' : 'hidden'} role="contentinfo">
					<div>
						<p>
							Made with <img id="react-logo" src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" title="React"/> and hosted with <span title="love">&#9829;</span> by GitHub
						</p>
					</div>
				</footer>
			</div>
		);
	}
}

export default App;