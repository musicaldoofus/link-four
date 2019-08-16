import React, { Component } from 'react';
import Column from '../Column';
import TURN_STATES from '../../helpers/TURN_STATES';
import './GameBoard.css';

/*
What this component does:
- take gameState prop (latest gameState on stack/list passed from <App>)
- determine winner
- if winner: turnState = closed; pass updated state to <App>
- else: increment turn
- if currPlayer === user: handle user turn
- else generate CPU move
- handle column update
- pass updated game state to <App>
*/

/*
turn state logic:
- (begin)
- ACCEPT_USER_MOVE
- HANDLE_USER_MOVE => determineWinner
- ACCEPT_CPU_MOVE => incrementTurn
- HANDLE_CPU_MOVE => determineWinner
*/

class GameBoard extends Component {
	constructor(props) {
		super(props);
		this.updateGameState = this.updateGameState.bind(this);
		this.determineWinner = this.determineWinner.bind(this);
		this.handleColumnClick = this.handleColumnClick.bind(this);
		this.getCPUMove = this.getCPUMove.bind(this);
		this.getUpdatedColumns = this.getUpdatedColumns.bind(this);
	}

	componentDidUpdate(prevProps) {
		console.log('componentDidUpdate', this.props);
		if (this.props.gameState.turnState === TURN_STATES.ACCEPT_MOVE_USER || this.props.gameState.turnState === TURN_STATES.INACTIVE) return;
		if (this.props.gameState.turnState === TURN_STATES.ACCEPT_MOVE_CPU) this.updateGameState({columnStates: this.getUpdatedColumns(this.getCPUMove())});
		if (this.props.gameState.turnState === TURN_STATES.EVALUATE_MOVE_USER || this.props.gameState.turnState === TURN_STATES.EVALUATE_MOVE_CPU) this.updateGameState({winner: this.isWinner()});
	}
	
	shouldComponentUpdate(prevProps) {
		console.log('prevProps', prevProps, 'this.props', this.props);
		return true; //prevProps.turnIndex !== this.props.turnIndex;
	}
	
	updateGameState(stateObj) {
		const withTurnIncrement = Object.assign(stateObj, {turnState: this.nextTurn});
		// console.log('updateGameState', withTurnIncrement);
		this.props.handleGameStateUpdate(withTurnIncrement);
	}
	
	determineWinner() { //returns 'user' || 'cpu' || false
		//tests
		const horizontalLine = () => false;
		const verticalLine = () => false;
		const positiveDiagonal = () => false;
		const negativeDiagonal = () => false;
		const winner = horizontalLine() ||
			verticalLine() ||
			positiveDiagonal() ||
			negativeDiagonal();
		return winner;
	}
	
	get nextTurn() {
		if (this.props.gameState.winner) return TURN_STATES.INACTIVE;
		const currentPlayerLogic = {
			[TURN_STATES.ACCEPT_USER_MOVE]: TURN_STATES.HANDLE_CPU_MOVE,
			[TURN_STATES.ACCEPT_MOVE_CPU]: TURN_STATES.ACCEPT_CPU_MOVE,
			[TURN_STATES.HANDLE_USER_MOVE]: TURN_STATES.ACCEPT_CPU_MOVE,
			[TURN_STATES.HANDLE_CPU_MOVE]: TURN_STATES.ACCEPT_USER_MOVE,
		};
		return currentPlayerLogic[this.props.gameState.turnState];
	}
	
	handleColumnClick(column) { //conditionally passes user's selection to getUpdatedColumns
		// console.log(column);
		if (this.props.turnState !== TURN_STATES.ACCEPT_USER_MOVE) {
			console.info('Oops! Not your turn yet.');
			return;
		}
		this.updateGameState({columnStates: this.getUpdatedColumns(column, 'user')});
	}
	
	getUpdatedColumns(column, role) { //return new game grid
		let lastIndex;
		for (let ind = 0; ind < this.props.factorDepth; ind++) {
			if (!this.props.gameState.columnStates[column][ind]) lastIndex = ind;
		}
		if (lastIndex === undefined) { //passively avoid user picking "full" column
			console.log('Won\'t fit!');
			return false;
		}
		if (lastIndex === -1) lastIndex = this.props.factorDepth - 1; //empty column
		let updatedColumn = this.props.gameState.columnStates[column];
		updatedColumn[lastIndex] = 'user';
		let columnStates = this.props.gameState.columnStates;
		columnStates[column] = updatedColumn;
		return columnStates;
	}
	
	getCPUMove() {
		let openColumns;
		for (let i = 0; i < this.props.factorDepth; i++) {
			if (this.props.gameState.columnStates[i].some(slot => slot === false)) openColumns.push(i)
		}
		return openColumns[Math.floor(Math.random() * openColumns.length)];
	}
	
	render() {
		const columns = this.props.gameState.columnStates.map((slots, i) => <Column key={i} ind={i} slotStates={slots} onClick={this.handleColumnClick}/>);
		return (
			<div className="columns-container" style={{gridTemplateColumns: `repeat(${this.props.factorDepth}, 64px)`}}>
				{columns}
			</div>
		);
	}
}

export default GameBoard;