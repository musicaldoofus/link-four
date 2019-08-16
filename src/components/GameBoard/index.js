import React, { Component } from 'react';
import Column from '../Column';
import './GameBoard.css';

class GameBoard extends Component {
	constructor(props) {
		super(props);
		const columns = Array.from({length: this.props.factorDepth},
			_ => Array.from({length: this.props.factorDepth}, 
				_ => undefined));
		this.state = {
			currentUser: 'user',
			columns
		};
		this.handleUserColSelect = this.handleUserColSelect.bind(this);
		this.getUpdatedColumnList = this.getUpdatedColumnList.bind(this);
		this.isWinner = this.isWinner.bind(this);
		this.handleAdvanceTurn = this.handleAdvanceTurn.bind(this);
		this.setCPUMove = this.setCPUMove.bind(this);
	}
	
	handleUserColSelect(colIndex) {
		if (this.state.currentUser !== 'user' || this.props.isClosed) return;
		const isColOpen = this.state.columns[colIndex].some(el => el === undefined);
		if (!isColOpen) return;
		this.handleAdvanceTurn(this.getUpdatedColumnList(colIndex));
	}
	
	getUpdatedColumnList(colIndex) {
		let openSlot = this.props.factorDepth - 1;
		for (let slotIndex = 0; slotIndex <= openSlot; slotIndex++) {
			if (this.state.columns[colIndex][slotIndex] !== undefined) {
				openSlot = slotIndex - 1;
				break;
			}
		}
		const updatedColumn = this.state.columns[colIndex];
		updatedColumn[openSlot] = this.state.currentUser;
		const updatedColumnList = this.state.columns;
		updatedColumnList[colIndex] = updatedColumn;
		return updatedColumnList;
	}
	
	isWinner() {
		const diagonal = (role) => {
			const equalIndex = (_, colIndex) => this.state.columns[colIndex][colIndex] === role;
			return this.state.columns.every(equalIndex);
		}
		const invertedDiagonal = (role) => {
			const invertedIndex = (_, colIndex) => this.state.columns[colIndex][this.props.factorDepth - 1 - colIndex] === role;
			return this.state.columns.every(invertedIndex);
		};
		const horizontalLine = (role) => {
			let memo = [];
			const toRoleIndex = (s, i) => s === role ? i : null;
			const onlyIndices = (i) => i !== null && memo.indexOf(i) > -1;
			for (let colIndex = 0; colIndex < this.props.factorDepth; colIndex++) {
				// if (colIndex === 0) memo = slotIndices;
				memo = this.state.columns[colIndex]
					.map(toRoleIndex)
					.filter(onlyIndices);
			}
			if (memo.length === 0) return false;
			return true;
		}
		const verticalLine = (role) => {
			const isColumnFull = (_, colIndex) => this.state.columns[colIndex].every(slot => slot === role);
			return this.state.columns.some(isColumnFull);
		}
		// const winnerTests = [
			// diagonal,
			// invertedDiagonal,
			// horizontalLine,
			// verticalLine
		// ];
		// console.log('tests for:', this.state.currentUser);
		// winnerTests.forEach(test => console.log(test(this.state.currentUser)));
		return diagonal(this.state.currentUser) ||
			invertedDiagonal(this.state.currentUser) ||
			horizontalLine(this.state.currentUser) ||
			verticalLine(this.state.currentUser);
	}

	handleAdvanceTurn(updatedColumnList) {
		if (this.isWinner()) {
			this.setState({
				columns: updatedColumnList
			}, () => this.props.handleWinner(this.state.currentUser)
			);
		}
		else {
			const updatedUser = this.state.currentUser === 'user' ? 'cpu' : 'user';
			this.setState({
				currentUser: updatedUser,
				columns: updatedColumnList
			}, () => {
				if (this.state.currentUser === 'cpu') this.setCPUMove();
			});
		}
	}
	
	setCPUMove() {
		const openColumns = this.state.columns
			.map((column, colIndex) => column.some(slot => slot === undefined) ? colIndex : null)
			.filter(c => c !== null);
		const cpuSelectedColumn = openColumns[Math.floor(Math.random() * openColumns.length)];
		this.handleAdvanceTurn(this.getUpdatedColumnList(cpuSelectedColumn));
	}
	
	render() {
		const columns = this.state.columns.map((slotStates, i) => <Column key={i} ind={i} onClick={this.handleUserColSelect} slotStates={slotStates}/>);
		return (
			<div className="columns-container" style={{gridTemplateColumns: `repeat(${this.props.factorDepth}, 64px)`}}>
				{columns}
			</div>
		);
	}
}

export default GameBoard;