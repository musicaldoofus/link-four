import React, { Component } from 'react';
import './Column.css';

const Token = ({user}) => (
	<div className={`token ${user}`}></div>
);

const Slot = ({user}) => (
	<div className="slot">
		{user && <Token user={user}/>}
	</div>
);

const Column = ({slotStates, ind, onClick}) => {
	const isColumnFull = slotStates.every(slot => slot !== undefined);
	const slots = slotStates.map((user, i) => <Slot key={i} user={user}/>);
	return (
		<div className={`column ${isColumnFull ? 'closed' : 'open'}`} onClick={() => onClick(ind)}>
			{slots}
		</div>
	);
}

export default Column;