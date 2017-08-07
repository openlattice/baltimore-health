import React from 'react';
import PropTypes from 'prop-types';
import { EdmApi, DataApi } from 'loom-data';

import FormView from '../components/FormView';

class Form extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			reportInfo: {
				1: '',
				2: '',
				3: null,
				4: '',
				5: '',
				6: '',
				7: '',
				8: '',
				9: null,
				10: '',
				11: ''
			},
			consumerInfo: {
				'13a': '',
				'13b': '',
				'13c': '',
				'14a': null,
				'14b': '',
				'14c': '',
				'14d': '',
				'14e': '',
				'15a': null,
				'15b': '',
				'16a': null,
				'16b': '',
				'17a': null,
				'17b': null,
				18: null,
				'19a': [],
				'19b': '',
				'20a': null,
				'20b': '',
				'21a': null,
				'21b': '',
				'22a': [],
				'22b': '',
				'22c': [],
				'22d': '',
				23: [],
				'24a': [],
				'24b': '',
				'25a': null,
				'25b': [],
				'26a': [],
				'26b': ''
			},
			complainantInfo: {
				'27a': '',
				'27b': '',
				'27c': '',
				'27d': ''
			},
			dispositionInfo: {
				'28a': [],
				'28b': [],
				'28c': '',
				'29a': [],
				'29b': '',
				30: [],
				31: ''
			},
			officerInfo: {
				32: '',
				34: '',
				35: '',
				36: [],
				'37a': '',
				'37b': ''
			}
		};

		this.handleInput = this.handleInput.bind(this);
		this.handleSingleSelection = this.handleSingleSelection.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	// For text input
	handleInput(e) {
		const sectionKey = e.target.dataset.section
		const name = e.target.name;
		const input = e.target.value;
		const sectionState = this.state[sectionKey]; 
		sectionState[name] = input;
		this.setState({ [sectionKey]: sectionState }, () => {console.log('section state:', this.state[sectionKey])});
	}

	// For radio or select input
	handleSingleSelection(e) {
		const sectionKey = e.target.dataset.section;
		const sectionState = this.state[sectionKey];
		sectionState[e.target.name] = e.target.value;
		this.setState({ [sectionKey]: sectionState }, () => {console.log('section state:', this.state[sectionKey])});
	}

	handleCheckboxChange(e) {
		const sectionKey = e.target.dataset.section;
		const sectionState = this.state[sectionKey];
		const idx = sectionState[e.target.name].indexOf(e.target.value);
		console.log('checkbox sectionState before addition', sectionState);
		if (idx === -1) {
			console.log('does not exist');
			sectionState[e.target.name].push(e.target.value);
		} else {
			console.log('does exist, idx:', idx);
			sectionState[e.target.name].splice(idx, 1);
		}
		console.log('checkbox sectionState before saving:', sectionState);
		this.setState({ [sectionKey]: sectionState }, () => {console.log('section state:', this.state[sectionKey])});
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log('SUBMIT:', this.state);
		// TODO: send request
	}

	render() {
		return (
			<FormView
					handleInput={this.handleInput}
					handleSingleSelection={this.handleSingleSelection}
					handleCheckboxChange={this.handleCheckboxChange}
					handleSubmit={this.handleSubmit}
					input={this.state} />
		);
	}
}

export default Form;
