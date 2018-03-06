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
import { Fullpage, HorizontalSlider, Slide } from '../../lib/index';
const { changeFullpageSlide, changeHorizontalSlide } = Fullpage;

require('./normalize.css');
require('./skeleton.css');
require('./exampleStyles.styl');

const fullPageOptions = {
  // for mouse/wheel events
  // represents the level of force required to generate a slide change on non-mobile, 0 is default
  scrollSensitivity: 7,

  // for touchStart/touchEnd/mobile scrolling
  // represents the level of force required to generate a slide change on mobile, 0 is default
  touchSensitivity: 7,
  scrollSpeed: 500,
  resetSlides: true,
  hideScrollBars: true,
  enableArrowKeys: true,

  // optional, set the initial vertical slide
  activeSlide: 0
};

const topNavStyle = {
  textAlign: 'center',
  position: 'fixed',
  width: '100%',
  cursor: 'pointer',
  zIndex: 10,
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  top: '0px'
};

const horizontalNavStyle = {
  position: 'absolute',
  width: '100%',
  top: '50%',
  zIndex: 10
};

const horizontalSliderProps = {
  name: 'horizontalSlider1',
  infinite: true
};

const API_KEY = "AIzaSyDZ9It8jaJQXLWHKCBDEtkmw67tcMQ0sd4";

const styles ={
	transition: "all 1s ease-out"
};

WebFont.load({
  google: {
    families: ['Playfair Display', 'Open Sans']
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
			thankfulItem: '',
			items: [],
			name: '', //user name
			location: '',
			active: {
		        Fullpage: 0,
		        horizontalSlider1: 0
		    }
		};

		this.itemSearch();
		this.videoSearch("inspirational talks");
		this.onSlideChangeStart = this.onSlideChangeStart.bind(this);
	    this.onSlideChangeEnd = this.onSlideChangeEnd.bind(this);	
	}


	onSlideChangeStart(name, props, state, newState) {
		if (!this.horizontalNav) {
		  this.horizontalNav = document.getElementById('horizontal-nav');
		}

		if (name === 'horizontalSlider1') {
		  scrollNavStart(this.horizontalNav);
		}
	}

	onSlideChangeEnd(name, props, state, newState) {
		if (name === 'horizontalSlider1') {
		  scrollNavEnd(this.horizontalNav);
		}

		const oldActive = this.state.active;
		const sliderState = {
		  [name]: newState.activeSlide
		};

		const updatedState = Object.assign(oldActive, sliderState);
		this.setState(updatedState);
	}

	onChangeName = (event) => {
		this.setState({
			name: event.target.value
		});
	}

	onChangeLocation = (event) => {
		this.setState({
			location: event.target.value
		});
	}	

	onChangeTerm = (event) => {
		this.setState({
			thankfulItem: event.target.value
		});
	}


	itemSearch(){
		const here = this;
		axios.get("/api/gratitudeItems/")
			.then(function (res){
				const dataInArr = res.data;
				dataInArr.map(obj => {	
					var itemObj={};	
					itemObj.userName=obj.userName;					
					itemObj.name=obj.name;
					itemObj.location=obj.location;
					itemList.push(itemObj);
				})
				console.log("******");
				console.log("data " + JSON.stringify(res.data));
				
			})
			.then(function(){
				console.log("item list before " + JSON.stringify(itemList))
				here.setState({
					items: itemList
				})			
			})
	}

	onAddItem(){
		event.preventDefault()
		const inputObj={
			"name": this.state.thankfulItem,
			"location": this.state.location,
			"userName": this.state.name
		}
		this.setState({
			thankfulItem: '',
			items: [...this.state.items, inputObj]
		});
		axios.post('api/gratitudeItems',inputObj)
			.then(res =>
				console.log("res is " + JSON.stringify(res))
			)
	}

	showList(){

    	if(this.state.items.length>5){
    		this.state.items.splice(0,1);
    	}

		if(this.state.items.length>0){
			return (
				<div>
					{this.state.items.map((item,i)=>{
						return <List userName={item.userName} location={item.location} item={item.name} key={i}/>
					})}
				</div>
				);
		}
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
	    const { active } = this.state;

	    const currentActive = active.Fullpage;
	    const prevSlide = changeFullpageSlide.bind(null, currentActive - 1);
	    const nextSlide = changeFullpageSlide.bind(null, currentActive + 1);
	    const goToTop = changeFullpageSlide.bind(null, 0);

	    const horizontalSliderName = horizontalSliderProps.name;
	    const horizontalActive = this.state.active[horizontalSliderName];

	    const prevHorizontalSlide = changeHorizontalSlide.bind(null, horizontalSliderName, horizontalActive - 1);
	    const nextHorizontalSlide = changeHorizontalSlide.bind(null, horizontalSliderName, horizontalActive + 1);	

		const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

		const topNav = (
		      <div style={topNavStyle}>
		        <span onClick={prevSlide}>
		          <button>Previous Slide</button>
		        </span>
		        <span onClick={goToTop}>
		          <button>Back to Top</button>
		        </span>
		        <span onClick={nextSlide}>
		          <button>Next Slide</button>
		        </span>
		      </div>
		    );

	    const horizontalNav = (
	      <div id='horizontal-nav' style={horizontalNavStyle}>
	        <span onClick={prevHorizontalSlide}><a className="cyan lighten-4 btn">PREV</a></span>
	        <span style={{position: 'absolute', right: '0px'}} onClick={nextHorizontalSlide}><a className="cyan lighten-4 btn">Next</a></span>
	      </div>
	    );

	    const horizontalSlides = [
	      <Slide style={{backgroundColor: '#FFE164'}}>
	      	<div className="container">
				<div className="row">                    
                     <div className="col s10 offset-s1 card white z-depth-2 center-align"
                         style={{...styles, opacity: this.state.opacity, height: this.state.height}}>
                        <div className="card-content grey-text">
                            <span className="card-title">Weekly Challenge</span>
                            <p>Vow to not complain, criticize, or gossip for a week.<br> 
                            </br>
                            <br>If you slip, rally your willpower and keep going. 
                            </br> Notice how much energy you were spending on <br></br>negative thoughts.</p>
                        </div>
            		</div>
                </div>
                <div className="row">
                	<div className="col s10 offset-s1 center-align">
	                    <h1>Need some inspiration?</h1>
	                    <h3>Click next to see how the community is doing!<br></br><i className="fa fa-angle-double-right"></i></h3>
                    </div>
                </div> 
            </div>    
	      </Slide>,

	      <Slide style={{backgroundColor: '#FFE164'}}>

	      		<div className="row">
                    <h1>*Place Holder*</h1>
                    <br></br>
                    <p>-Amy</p>
                </div>

	      </Slide>
	    ];
	    horizontalSliderProps.slides = horizontalSlides;

	    const horizontalSlider = <HorizontalSlider id='horizontal-slider-1' {...horizontalSliderProps}>{horizontalNav}</HorizontalSlider>;

	    const verticalSlides = [
	      <Slide style={{backgroundColor: '#FFE164' }}>
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
                    		<input value={this.state.name} onChange={this.onChangeName} placeholder="Name"/>	 
							<input value={this.state.location} onChange={this.onChangeLocation} placeholder="Where are you from?"/>	                    		                    	
                    		<input value={this.state.thankfulItem} onChange={this.onChangeTerm} placeholder="What are you grateful for?"/>
                    		<a className="cyan lighten-4 btn" onClick={this.onAddItem.bind(this)}>Add</a>
                    	</form>
                    </div>

                    <div className="col s4">
                     	<h2>What are people grateful for?</h2>
                		{this.showList()}
                    </div>
                </div>

	      </Slide>,
	      <Slide style={{backgroundColor: '#F0F0EB'}}>    
                <div className="row">
                	<div className="col s10 offset-s1 center-align">
						<SearchBar onSearchTermChange={videoSearch}/>
						<VideoDetail video={this.state.selectedVideo}/>
						<VideoList 
						onVideoSelect={selectedVideo => this.setState({selectedVideo})}
						videos={this.state.videos} />
					</div>
				</div>
	      </Slide>,
	      horizontalSlider
	    ];
	    fullPageOptions.slides = verticalSlides;


		return(
			<Fullpage onSlideChangeStart={this.onSlideChangeStart} onSlideChangeEnd={this.onSlideChangeEnd} {...fullPageOptions}>
			</Fullpage>
		);
	}
}

function scrollNavStart(nav) {
  // make the nav fixed when we start scrolling horizontally
  nav.style.position = 'fixed';
}

function scrollNavEnd(nav) {
  // make the nav absolute when scroll finishes
  nav.style.position = 'absolute';
}

