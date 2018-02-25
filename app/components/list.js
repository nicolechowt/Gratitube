import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const List = props => (
	<ul className="collection">
		<ReactCSSTransitionGroup 
			transitionName="fade"
			transitionEnterTimeout={300}
			transitionLeaveTimeout={300}> 
			<li className="collection-item">{props.userName}, from {props.location}: "{props.item}"</li>
		</ReactCSSTransitionGroup>
	</ul>
);


export default List;