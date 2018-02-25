import _ from "lodash";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import YTSearch from "youtube-api-search";
import SearchBar from "./search_bar";
import VideoList from "./video_list";
import VideoDetail from "./video_detail";
import WebFont from "webfontloader";
import List from "./list";
import "./main.css";
import axios from "axios";


const API_KEY = "AIzaSyDZ9It8jaJQXLWHKCBDEtkmw67tcMQ0sd4";

const styles ={
	transition: "all 1s ease-out"
};

WebFont.load({
  google: {
    families: ['Julius Sans One', 'Oswald']
  }
});

var itemList=[];
export default class Main extends React.Component {
	constructor(props){
		super(props);
		this.state = { 

			videos: [],
			selectedVideo: null,
			opacity: 1,
			height: "auto",
			term: '',
			items: []
		};

		this.itemSearch();
		this.videoSearch("inspirational talks");	
	}


	onChange = (event) => {
		this.setState({
			term: event.target.value
		});
	}

	itemSearch(){
		const here = this;
		axios.get("/api/gratitudeItems/")
			.then(function (res){
				const dataInArr = res.data;
				dataInArr.map(obj => {								
					itemList.push(obj.name);
				})
			})
			.then(function() {
				here.setState({
					items: itemList
				});
			});
	}



	showList(){
		console.log(this.state.items);
		if (this.state.items.length>0){
			return <List items={this.state.items} />;
		}
	}

	onAddItem(){
		event.preventDefault()
		const inputObj={
			"name": this.state.term
		}
		this.setState({
			term: '',
			items: [...this.state.items,this.state.term]
		});
		axios.post('api/gratitudeItems',inputObj)
			.then(res =>
				console.log("res is " + JSON.stringify(res))
			)
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

	render(){
		const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);
		return(
			<div className="application">
				<div className="title">
					<h1>HappyPlace</h1>
					<p>A place of reflections.</p>
				</div>

 				<div className="row">                    
                         <div className="col s6 offset-s3 card white z-depth-2 center-align"
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

				<div className="row">
	                    <div className="col s4 offset-s2">
	                     	<form className="form">
	                    		<input value={this.state.term} onChange={this.onChange} placeholder="What are you grateful for?"/>
	                    		<a className="waves-effect waves-light btn" onClick={this.onAddItem.bind(this)}>Add</a>
	                    	</form>
	                    </div>

	                     <div className="col s4">
	                    	{this.showList()}
	                    </div>
                </div>



                <div className="row">
                	<div className="col s8 offset-s2 center-align">
						<SearchBar onSearchTermChange={videoSearch}/>
						<VideoDetail video={this.state.selectedVideo}/>
						<VideoList 
						onVideoSelect={selectedVideo => this.setState({selectedVideo})}
						videos={this.state.videos} />
					</div>
				</div>
			</div>
		);
	}
}


