import React, { Component } from 'react';
import { Button } from 'react-bootstrap/';
import PropTypes from 'prop-types'


class AudioAccess extends Component {
  constructor(props) {
    super(props);
    this.getMediaInput = this.getMediaInput.bind(this);
  }

  async getMediaInput() {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        audio: true,
        video: true
      });
      // remove video track
      stream.removeTrack(stream.getVideoTracks()[0])
      this.props.getStreamData(stream, "audio")
    }
    catch {
      return (
        this.props.getStreamData("error")
      )
    }
  }

  render() {
    return (
      <React.Fragment>
          <Button size="lg" onClick={this.getMediaInput}>
            Record Audio
          </Button>
      </React.Fragment>
    );
  }
}

export default AudioAccess;


AudioAccess.propTypes = {
  getStreamData: PropTypes.func.isRequired
};