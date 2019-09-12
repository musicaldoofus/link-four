import React, { Component } from 'react';
import Token from '../Token';
import './Column.css';

const Slot = ({user}) => (
	<div className="slot">
		{user && <Token user={user}/>}
	</div>
);

class Column extends Component {
	/*shouldComponentUpdate(prevProps) {
		const condition = prevProps.slotStates.every((slot, i) => slot === this.props.slotStates[i]);
		console.log('Column.props', !condition, prevProps.slotStates, this.props.slotStates);
		return !condition;
	}*/

	render() {
		const isColumnFull = this.props.slotStates.every(slot => slot !== undefined);
		const slots = this.props.slotStates.map((user, i) => <Slot key={i} user={user}/>);
		return (
			<div className={`column ${isColumnFull ? 'closed' : 'open'}`} onClick={() => this.props.onClick(this.props.ind)}>
				{slots}
			</div>
		);
	}
} 

export default Column;