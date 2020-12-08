import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Timer from './Timer';
import PropTypes from 'prop-types'


class Recorder extends Component {
  constructor(props) {
    super(props);
		this.state = {
			timerStarted: false,
			idRecordButton: "",
			enableRecordButton: true,
			enableStopButton: true,
		};

		this.startRecording = this.startRecording.bind(this);
		this.stopRecording = this.stopRecording.bind(this);
  }

  componentDidMount() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.source = this.audioContext.createMediaStreamSource(this.props.stream);
    
    // Connect different audio modules/audio graph nodes together
    // Setting up gain
		this.gainNode = this.audioContext.createGain();
		this.initialVol = 0.75;
		this.gainNode.gain.value = this.initialVol;
		this.source.connect(this.gainNode);

		try {
			// Creating a mediaRecorder
			this.mediaRecorder = new MediaRecorder(this.props.stream);
		} catch (error) {
			// catch error if Media Recorder API is not supported
			this.props.getErrorDueToMediaRecorder(error)
			return;
		}
		
		// setting up recorded audio snippets
		var chunks = [];

		this.mediaRecorder.onstop = function(event) {
			var fileName = prompt("Please enter a name for your media clip.", 
				"Media 1")
			if (fileName === null) {
				fileName = "Media 1"
			}
	  	var blob = new Blob(chunks, {'type' : 'video/mp4'});
	  	// reset chunks for a new file 
	  	chunks = [];
	  	var mediaURL = URL.createObjectURL(blob);
	  	this.props.getRecordedMediaURLAndFileName(mediaURL, `${fileName}.mp4`);
		}.bind(this);

		this.mediaRecorder.ondataavailable = function(event) {
			chunks.push(event.data);
		}
		this.mediaRecorder.onError = function(event) {
			this.props.getErrorFromRecorder(event.error.name)
		}

		// start recording automatically after access to screen
		this.startRecording() 
  }

  componentWillUnmount() {
    this.source.disconnect();
  }

  startRecording() {
  	this.setState({
  		timerStarted: true, 
  		idRecordButton: "record", 
  		enableStopButton: true, 
  		enableRecordButton: false
  	})
  	this.mediaRecorder.start();
  }

  stopRecording() {
  	if (this.state.timerStarted) {
	  	this.mediaRecorder.stop();
	  	this.setState({
	  		timerStarted: false, 
	  		idRecordButton: "",
	  		enableStopButton: false, 
	  		enableRecordButton: true
	  	})
  	}
  }  

  render() {
    return (
			<div className="recorder">
				<Timer timerStarted={this.state.timerStarted} />
				<Button size="lg" 
								className="recordButton"
								id={this.state.idRecordButton} 
								disabled={!this.state.enableRecordButton}>
								Record
				</Button>
				<Button size="lg" 
								className="stopButton"
								id="stop" 
								onClick={this.stopRecording}
								disabled={!this.state.enableStopButton}>
								Stop
				</Button>
			</div>
    );
  }
}

export default Recorder;


Recorder.propTypes = {
  stream: PropTypes.object.isRequired,
  getRecordedMediaURLAndFileName: PropTypes.func.isRequired,
  getErrorDueToMediaRecorder: PropTypes.func.isRequired
};
