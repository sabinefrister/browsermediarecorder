import React, { Component } from 'react';
import { Button } from 'react-bootstrap/';
import PropTypes from 'prop-types'


class MicrophoneAccess extends Component {
  constructor(props) {
    super(props);
    this.getMicrophone = this.getMicrophone.bind(this);
  }

  async getMicrophone() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });
      this.props.getStreamData(stream)
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
          <Button size="lg" onClick={this.getMicrophone}>
            Allow microphone input
          </Button>
      </React.Fragment>
    );
  }
}

export default MicrophoneAccess;


MicrophoneAccess.propTypes = {
  getStreamData: PropTypes.func.isRequired
};