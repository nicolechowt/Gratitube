import React, { Component } from "react";

//every class must have a render function
class SearchBar extends Component {
	constructor(props){
		super(props);

		this.state = { term: "" };
	}
// everytime we update or setState is called, the render method gets run as well,
// whatever is in render will be pushed to the DOM
	render() {
		return (
			<div className="search-bar center-align">
				<input 
				value={this.state.term}
				onChange={event => this.onInputChange(event.target.value)} 
				placeholder="Search for inspiring talks."/>
			</div>
		);
	}

	onInputChange(term){
		this.setState({term});
		this.props.onSearchTermChange(term);
	}
}

export default SearchBar;