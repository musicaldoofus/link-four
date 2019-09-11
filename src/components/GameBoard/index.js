import React, { Component } from 'react';
import Column from '../Column';
import './GameBoard.css';

class GameBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: 'user'
		};
		this.handleUserColSelect = this.handleUserColSelect.bind(this);
		this.getUpdatedColumnList = this.getUpdatedColumnList.bind(this);
		this.isWinner = this.isWinner.bind(this);
		this.handleAdvanceTurn = this.handleAdvanceTurn.bind(this);
		this.setCPUMove = this.setCPUMove.bind(this);
	}
	
	handleUserColSelect(colIndex) {
		if (this.state.currentUser !== 'user' || this.props.isClosed) return;
		const isColOpen = this.props.columns[colIndex].some(el => el === undefined);
		if (!isColOpen) return;
		this.handleAdvanceTurn(this.getUpdatedColumnList(colIndex));
	}
	
	getUpdatedColumnList(colIndex) {
		let openSlot = this.props.factorDepth - 1;
		for (let slotIndex = 0; slotIndex <= openSlot; slotIndex++) {
			if (this.props.columns[colIndex][slotIndex] !== undefined) {
				openSlot = slotIndex - 1;
				break;
			}
		}
		const updatedColumn = this.props.columns[colIndex];
		updatedColumn[openSlot] = this.state.currentUser;
		const updatedColumnList = this.props.columns;
		updatedColumnList[colIndex] = updatedColumn;
		return updatedColumnList;
	}
	
	isWinner() {
		const diagonal = (role) => {
			const equalIndex = (_, colIndex) => this.props.columns[colIndex][colIndex] === role;
			return this.props.columns.every(equalIndex);
		}
		const invertedDiagonal = (role) => {
			const invertedIndex = (_, colIndex) => this.props.columns[colIndex][this.props.factorDepth - 1 - colIndex] === role;
			return this.props.columns.every(invertedIndex);
		};
		const horizontalLine = (role) => {
			let memo = [];
			const toRoleIndex = (s, i) => s === role ? i : null;
			const onlyIndices = (i) => i !== null;
			const onlyInMemo= (i) => memo.length === 0 ? true : memo.indexOf(i) > -1;
			for (let colIndex = 0; colIndex < this.props.factorDepth; colIndex++) {
				const updatedMemo = this.props.columns[colIndex]
					.map(toRoleIndex)
					.filter(onlyIndices);
				if (updatedMemo.length === 0) return false;
				else {
					memo = updatedMemo.filter(onlyInMemo);
					if (memo.length === 0) return false;
				}
			}
			return true;
		}
		const verticalLine = (role) => {
			const isColumnFull = (_, colIndex) => this.props.columns[colIndex].every(slot => slot === role);
			return this.props.columns.some(isColumnFull);
		}
		const winnerTests = [
			diagonal,
			invertedDiagonal,
			horizontalLine,
			verticalLine
		];
		return winnerTests.some(test => test(this.state.currentUser));
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
		const openColumns = this.props.columns
			.map((column, colIndex) => column.some(slot => slot === undefined) ? colIndex : null)
			.filter(c => c !== null);
		const cpuSelectedColumn = openColumns[Math.floor(Math.random() * openColumns.length)];
		window.setTimeout(
			() => this.handleAdvanceTurn(this.getUpdatedColumnList(cpuSelectedColumn))
			, 400);
	}
	
	render() {
		const columns = this.props.columns.map((slotStates, i) => <Column key={i} ind={i} onClick={this.handleUserColSelect} slotStates={slotStates}/>);
		return (
			<div className="columns-container" style={{gridTemplateColumns: `repeat(${this.props.factorDepth}, 64px)`}}>
				{columns}
			</div>
		);
	}
}

export default GameBoard;