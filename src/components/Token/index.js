import React from 'react';
import './Token.css';

const Token = ({user}) => (
	<div className={`token ${user}`}></div>
);

export default Token;