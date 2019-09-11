import React, { Component } from 'react';
import GameBoard from './components/GameBoard';
import Modal from './components/Modal';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			factorDepth: 4,
			winner: undefined
		};
		this.closeOutTime = 1500;
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
					<p>Winner: {this.state.winner}</p>
					<p>factorDepth: {this.state.factorDepth}</p>
				</div>
				{this.state.winner ? (
					<Modal
						closeOut={this.closeOutTime}
					>
						<p>Winner!</p>
						<p>{this.state.winner}</p>
					</Modal>
				) : (
					<GameBoard
						isClosed={this.state.winner !== undefined}
						factorDepth={this.state.factorDepth}
						handleWinner={this.handleWinner}
					/>
				)
				}
			</div>
		);
	}
}

export default App;