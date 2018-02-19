import React from "react";
import VideoListItem from "./video_list_item";

// props is being passed from index.js, "videos" was passed 
// as an argument, "videos" is basically the data coming
// back from the API

// .map is looping through the videos array from index.js
// video represents each element in the array
// return the VideoListItem component, and we are passing in 
// video as a prop(erty), and we will pass each element as an 
// argument


// videoItems is an array of components


const VideoList = (props) => {
	
	const videoItems = props.videos.map((video) => {

		return (
			<VideoListItem 
			onVideoSelect={props.onVideoSelect}
			key={video.etag} 
			video ={video} />
		);
	});

	return (

			<ul className="col-md-4 list-group">
				{videoItems}
			</ul>

	);
};

export default VideoList;