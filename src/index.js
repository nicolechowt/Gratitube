import React, {Component} from "react";
import ReactDOM from "react-dom";
import YTSearch from "youtube-api-search";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";

const API_KEY = "AIzaSyDZ9It8jaJQXLWHKCBDEtkmw67tcMQ0sd4";


// Create a new component. This component should produce some HTML.
// Everytime the we set the state, it will cause our component to 
// re-render.
class App extends Component {
	constructor(props){
		super(props);

		this.state = { 
			videos: [],
			selectedVideo: null
		};
	this.videoSearch("inspirational talks");		
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
// passing onVideoSelect as a property 
// selectedVideo is a function that just updates app state
// videoList takes the onVideoSelect property
// then gets passes into VideoListItem

// remember anything after the component name is the 
// property and can be accessed through .props

	render() {
		return (
			<div>
				<SearchBar onSearchTermChange={term => this.videoSearch(term)}/>
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