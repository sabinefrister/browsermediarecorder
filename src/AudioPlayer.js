import React, { Component } from 'react';
import PropTypes from 'prop-types'


class AudioPlayer extends Component {
	render() {
    return (
			<div>
				<h3>{this.props.fileName}</h3>
				<audio controls 
					src={this.props.mediaURL}
				/>
			</div>
    );
  }
}

export default AudioPlayer;


AudioPlayer.propTypes = {
	fileName: PropTypes.string.isRequired,
	mediaURL: PropTypes.string.isRequired
};
