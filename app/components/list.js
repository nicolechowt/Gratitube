import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const List = props => (
	<ul className="collection">
		<ReactCSSTransitionGroup 
			transitionName="fade"
			transitionEnterTimeout={300}
			transitionLeaveTimeout={300}>                   			
		{
			props.items.map((item,i) => <li key={item} className="collection-item" style={{cursor: 'pointer'}}>{item}</li>)
		}
		</ReactCSSTransitionGroup>
	</ul>
);

export default List;