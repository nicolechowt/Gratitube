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
			<div className="search-bar">
				<input 
				value={this.state.term}
				onChange={event => this.setState({ term: event.target.value })} />
			</div>
		);
	}
}

export default SearchBar;