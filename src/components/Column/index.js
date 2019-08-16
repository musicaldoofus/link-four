import React, { Component } from 'react';
import './Column.css';

class Slot extends Component {
	constructor(props) {
		super(props);
		this.state = {
			poised: false
		};
	}
	
	componentDidUpdate(prevProps, prevState) {
		if (prevProps == this.props) {
			console.log('short circuit');
			return;
		}
		if (this.props.active) {
			this.setState({
					poised: true
				}, () => window.setTimeout(this.setState({
					poised: false
				}), 100));
		}
	}
	
	// componentDidMount() {
		// console.log('mounted <Slot>', this.props, this.state);
	// }
	
	render() {
		return <div className={`slot ${this.props.role ? 'active' : 'inactive'}${this.props.role ? ' ' + this.props.role : ''}${this.state.poised ? ' poised' : ''}`}></div>;
	}
}

const Column = ({slotStates, ind, onClick}) => {
	console.log('<Column>!!');
	const slots = slotStates.map((role, i) => <Slot key={i} role={role}/>);
	const isOpen = slotStates.some(slot => !slot);
	return (
		<div className={`column ${isOpen ? 'open' : 'closed'}`} onClick={() => onClick(ind)}>
			{slots}
		</div>
	);
}

export default Column;