import React, { Component } from 'react';
import { Button } from 'react-bootstrap/';
import PropTypes from 'prop-types'


class VideoAccess extends Component {
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
      this.props.getStreamData(stream, "video")
    }
    catch {
      return (
        this.props.getStreamData("error", "video")
      )
    }
  }

  render() {
    return (
      <React.Fragment>
          <Button size="lg" onClick={this.getMediaInput}>
            Record Video and Audio
          </Button>
      </React.Fragment>
    );
  }
}

export default VideoAccess;


VideoAccess.propTypes = {
  getStreamData: PropTypes.func.isRequired
};