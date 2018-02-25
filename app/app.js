// Include the Main React Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// Include the main Main Component
import { Router, hashHistory, browserHistory } from 'react-router';
import MainRouter from './components/MainRouter';



// Take this component's geneated HTML and put it on the page (in the DOM)
ReactDOM.render(<MainRouter/>, document.getElementById("root"));

