// Include the Main React Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// Include the main Main Component
import { Router, hashHistory, browserHistory } from 'react-router';
import MainRouter from './components/MainRouter';

const app = document.createElement('div');
document.body.appendChild(app);
document.body.style.margin = 0;

var meta = document.createElement('meta');
meta.setAttribute('http-equiv', 'X-UA-Compatible');
meta.setAttribute('content', 'IE=Edge');
document.getElementsByTagName('head')[0].appendChild(meta);

var meta2 = document.createElement('meta');
meta2.setAttribute('name', 'viewport');
meta2.setAttribute('content', 'width=device-width, initial-scale=1');
document.getElementsByTagName('head')[0].appendChild(meta2);


// Take this component's geneated HTML and put it on the page (in the DOM)
ReactDOM.render(<MainRouter/>, document.getElementById("root"));

