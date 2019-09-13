import React, { Component } from 'react';
import Column from '../Column';
import winnerTests from '../../helpers/winnerTests';
import getOpenColumns from '../../helpers/getOpenColumns';
import getUpdatedColumnList from '../../helpers/getUpdatedColumnList';
import './GameBoard.css';

class GameBoard extends Component {
	constructor(props) {
		super(props);
		const arrayLength = {
			length: this.props.factorDepth
		};
		const initColumns = Array.from(arrayLength, _ => Array.from(arrayLength, _ => undefined));
		this.state = {
			currentUser: 'user',
			columns: initColumns
		};
		this.cpuMoveTime = 400;
		this.handleUserColSelect = this.handleUserColSelect.bind(this);
		this.isWinner = this.isWinner.bind(this);
		this.handleAdvanceTurn = this.handleAdvanceTurn.bind(this);
		this.handleCPUMove = this.handleCPUMove.bind(this);
	}

	handleUserColSelect(colIndex) {
		if (this.state.currentUser !== 'user' || this.isWinner()) return;
		const isColOpen = this.state.columns[colIndex].some(el => el === undefined);
		if (!isColOpen) return;
		this.handleAdvanceTurn(getUpdatedColumnList(this.state, colIndex));
	}

	handleAdvanceTurn(updatedColumnList) {
		this.props.handleIncrementScore(this.state.currentUser, 1);
		const isWinner = this.isWinner();
		if (isWinner) {
			this.setState({
				columns: updatedColumnList
			}, () => this.props.handleWinner(isWinner === 'tie' ? 'tie' : this.state.currentUser));
		}
		else {
			const updatedUser = this.state.currentUser === 'user' ? 'cpu' : 'user';
			this.setState({
				currentUser: updatedUser,
				columns: updatedColumnList
			}, () => {
				if (this.state.currentUser === 'cpu') this.handleCPUMove();
			});
		}
	}
	
	handleCPUMove() {
		const openColumns = getOpenColumns(this.state.columns);
		const cpuRandIndex = Math.floor(Math.random() * openColumns.length);
		const cpuSelectedColumn = openColumns[cpuRandIndex];
		window.setTimeout(
			() => this.handleAdvanceTurn(getUpdatedColumnList(this.state, cpuSelectedColumn))
			, this.cpuMoveTime);
	}

	isWinner() {
		const isTie = () => {
			const openColumns = getOpenColumns(this.state.columns);
			return openColumns.length === 0 ? 'tie' : false;
		}
		return winnerTests.some(test => test(this.state.currentUser, this.state.columns)) || isTie();
	}
	
	render() {
		const columns = this.state.columns.map((slotStates, i) => (
			<Column
				key={i}
				ind={i}
				onClick={this.handleUserColSelect}
				slotStates={slotStates}
			/>
		));
		return (
			<div className="game-board" style={{gridTemplateColumns: `repeat(${this.props.factorDepth}, 4em)`}}>
				{columns}
			</div>
		);
	}
}

export default GameBoard;