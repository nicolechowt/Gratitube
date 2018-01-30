import React from "react";

// we passed video as a prop inside VideoListItem in video_list.js
const VideoListItem = ({video}) => {
	const imageUrl = video.snippet.thumbnails.default.url;

	// const video = props.video;
	return(
		<li className="list-group-item">
			<div className="video-list media">

				<div className="media-left">
					<img className="media-object" src={imageUrl} />
				</div>

				<div className="media-body">
					<div className="media-heading">{video.snippet.title}
					</div>
				</div>

			</div>
		</li>
	);	
};

export default VideoListItem;