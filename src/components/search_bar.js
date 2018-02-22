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
				onChange={event => this.onInputChange(event.target.value)} 
				placeholder="I want more! Try searching for ... Uplifting Ted Talks"/>
			</div>
		);
	}

	onInputChange(term){
		this.setState({term});
		this.props.onSearchTermChange(term);
	}
}

export default SearchBar;