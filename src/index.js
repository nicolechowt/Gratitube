import _ from "lodash";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import YTSearch from "youtube-api-search";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
import WebFont from "webfontloader";
import "./index.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";


const API_KEY = "AIzaSyDZ9It8jaJQXLWHKCBDEtkmw67tcMQ0sd4";

const styles ={
	transition: "all 1s ease-out"
};

WebFont.load({
  google: {
    families: ['Julius Sans One', 'Oswald']
  }
});

// Create a new component. This component should produce some HTML.
// Everytime the we set the state, it will cause our component to 
// re-render.
class App extends Component {
	constructor(props){
		super(props);

		this.state = { 
			videos: [],
			selectedVideo: null,
			opacity: 1,
			height: "auto",
			term: '',
			items: [],
		};
	
		this.videoSearch("inspirational talks");		
	}

	onChange = (event) => {
		this.setState({
			term: event.target.value
		});
	}

	onAddItem(){
		event.preventDefault()
		this.setState({
			term: '',
			items: [...this.state.items,this.state.term]
		});
	}

	onDeleteItem(id){
		const newItems = this.state.items.slice();
		newItems.splice(id,1);
		this.setState({
			items: newItems
		});
	}

	onHide(){
		this.setState({
			opacity: 0,
			height: 0
		});
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({ 
				videos: videos,
				selectedVideo: videos[0]
			});
			// this.setState({videos: videos:})
		});	
	}

	componentWillMount(){
    	document.body.style.backgroundColor = "#ffe600";
    	// document.body.style.backgroundImage = "linearGradient(-90deg, #B8C39D, #AEEFEE)";
	}
	componentWillUnmount(){
    	document.body.style.backgroundColor = null;
	}
// passing onVideoSelect as a property 
// selectedVideo is a function that just updates app state
// videoList takes the onVideoSelect property
// then gets passes into VideoListItem

// remember anything after the component name is the 
// property and can be accessed through .props

	render() {

		const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

		return (
			<div className="application">
				<div className="title">
					<h1>NicoleTube</h1>
					<p>A place of inspiring videos</p>
				</div>



				<div className="row">
                    <div className="s8 offset-s2 center-align">
                        <div className="card white z-depth-2"
                             style={{...styles, opacity: this.state.opacity, height: this.state.height}}>
                            <div className="card-content grey-text">
                                <span className="card-title">Quote of The Day</span>
                                <p>Only I can change my life. No one can do it for me.</p>
                            </div>

                            <div className="card-action">
                                <a onClick={this.onHide.bind(this)} style={{cursor: 'pointer', color: 'black'}}>HIDE</a>
                            </div>

                        </div>
                    </div>
                </div>


				<div className="row">
                    <div className="s8 offset-s2 center-align">
                    	<form className="form">
                    		<input value={this.state.term} onChange={this.onChange} placeholder="List 3 things you are grateful for today."/>
                    		<a className="waves-effect waves-light btn" onClick={this.onAddItem.bind(this)}>Add Item</a>
                    	</form>
                    	<p>Click Item to Delete</p>
                    	<ul className="collection">
                    		<ReactCSSTransitionGroup 
                    			transitionName="fade"
                    			transitionEnterTimeout={300}
                    			transitionLeaveTimeout={300}>                   			
                    		{this.state.items.map((item,i) => {
                    			return (
                    				<li key={item} className="collection-item" onClick={this.onDeleteItem.bind(this,i)} style={{cursor: 'pointer'}}>{item}</li>
                    			);
                    		})}
                    		</ReactCSSTransitionGroup>
                    	</ul>
                    </div>
                </div>



						<SearchBar onSearchTermChange={videoSearch}/>
						<VideoDetail video={this.state.selectedVideo}/>
						<VideoList 
						onVideoSelect={selectedVideo => this.setState({selectedVideo})}
						videos={this.state.videos} />
			</div>
		);
	}	
};

// Take this component's geneated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector(".container"));