import React, { Component } from 'react';
import PropTypes from 'prop-types'


class VideoPlayer extends Component {
	render() {
    return (
			<div>
				<h3>{this.props.fileName}</h3>
				<video controls 
					src={this.props.mediaURL}
				/>
			</div>
    );
  }
}

export default VideoPlayer;


VideoPlayer.propTypes = {
	fileName: PropTypes.string.isRequired,
	mediaURL: PropTypes.string.isRequired
};
