import React, { Component } from 'react';
import Token from '../Token';
import './Column.css';

const Slot = ({user}) => (
	<div className="slot">
		{user && <Token user={user}/>}
	</div>
);

const Column = (props) => {
	/*shouldComponentUpdate(prevProps) {
		const condition = prevProps.slotStates.every((slot, i) => slot === this.props.slotStates[i]);
		console.log('Column.props', !condition, prevProps.slotStates, this.props.slotStates);
		return !condition;
	}*/

	const isColumnFull = props.slotStates.every(slot => slot !== undefined);
	const slots = props.slotStates.map((user, i) => <Slot key={i} user={user}/>);
	return (
		<div className={`column ${isColumnFull ? 'closed' : 'open'}`} onClick={() => props.onClick(props.ind)}>
			{slots}
		</div>
	);
}

export default Column;