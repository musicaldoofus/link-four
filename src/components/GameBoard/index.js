import React, { Component } from 'react';
import Column from '../Column';
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
		this.getUpdatedColumnList = this.getUpdatedColumnList.bind(this);
		this.isWinner = this.isWinner.bind(this);
		this.handleAdvanceTurn = this.handleAdvanceTurn.bind(this);
		this.setCPUMove = this.setCPUMove.bind(this);
		this.getOpenColumns = this.getOpenColumns.bind(this);
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
		const updatedColumnList = this.state.columns.slice();
		const updatedColumn = updatedColumnList[colIndex];
		updatedColumn[openSlot] = this.state.currentUser;
		updatedColumnList[colIndex] = updatedColumn;
		return updatedColumnList;
	}

	getOpenColumns() {
		return this.state.columns
			.map((column, colIndex) => column.some(slot => slot === undefined) ? colIndex : null)
			.filter(c => c !== null);
	}
	
	isWinner() {
		const isTie = () => {
			const openColumns = this.getOpenColumns();
			return openColumns.length === 0 ? 'tie' : false;
		}
		const diagonal = (role) => {
			const equalIndex = (col, colIndex) => this.state.columns[colIndex][colIndex] === role;
			return this.state.columns.every(equalIndex);
		}
		const invertedDiagonal = (role) => {
			const invertedIndex = (_, colIndex) => this.state.columns[colIndex][this.props.factorDepth - 1 - colIndex] === role;
			return this.state.columns.every(invertedIndex);
		};
		const horizontalLine = (role) => {
			let memo = [];
			const toRoleIndex = (s, i) => s === role ? i : null;
			const onlyIndices = (i) => i !== null;
			const onlyInMemo= (i) => memo.length === 0 ? true : memo.indexOf(i) > -1;
			for (let colIndex = 0; colIndex < this.props.factorDepth; colIndex++) {
				const updatedMemo = this.state.columns[colIndex]
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
			const isColumnFull = (col) => col.every(slot => slot === role);
			return this.state.columns.some(isColumnFull);
		}
		const winnerTests = [
			diagonal,
			invertedDiagonal,
			horizontalLine,
			verticalLine
		].some(test => test(this.state.currentUser));
		return winnerTests || isTie();
	}

	handleAdvanceTurn(updatedColumnList) {
		this.props.incrementScore(this.state.currentUser, 1);
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
				if (this.state.currentUser === 'cpu') this.setCPUMove();
			});
		}
	}
	
	setCPUMove() {
		const openColumns = this.getOpenColumns();
		const cpuRandIndex = Math.floor(Math.random() * openColumns.length);
		const cpuSelectedColumn = openColumns[cpuRandIndex];
		window.setTimeout(
			() => this.handleAdvanceTurn(this.getUpdatedColumnList(cpuSelectedColumn))
			, this.cpuMoveTime);
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
			<div className="columns-container" style={{gridTemplateColumns: `repeat(${this.props.factorDepth}, 64px)`}}>
				{columns}
			</div>
		);
	}
}

export default GameBoard;