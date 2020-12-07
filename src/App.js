import React, { Component } from 'react';
import { Navbar, Container, Jumbotron, Row, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPodcast } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import MicrophoneAccess from './MicrophoneAccess';
import Recorder from './Recorder';
import AudioPlayer from './AudioPlayer';
import VideoPlayer from './VideoPlayer';
import DownloadButton from './DownloadButton';
import NewRecordingButton from './NewRecordingButton';


class App extends Component {
  constructor(props) {
    super(props);
		this.state = {
			mediasURL: null,
			streamAvailable: false,
			fileName: null,
			showAlert: false,
			alertMessage: ""
		};
		this.getStreamData = this.getStreamData.bind(this);
		this.getRecordedMediaURLAndFileName = this.getRecordedMediaURLAndFileName.bind(this);
		this.getErrorFromRecorder = this.getErrorFromRecorder.bind(this);
		this.getErrorDueToMediaRecorder = this.getErrorDueToMediaRecorder.bind(this);
		this.setNewRecording = this.setNewRecording.bind(this);
	}

  componentDidMount(){
    document.title = "Browser Media Recorder"
  }

	// callback function for getting the stream of MicrophoneAccess component
	getStreamData(streamData) {
		if (streamData === "error") {
			let microphoneAccessAlert = "It wasn't possible to access your microphone. Please reload this page and start again."
			this.setState({showAlert: true, alertMessage: microphoneAccessAlert})
		} else {
			this.setState({stream: streamData, streamAvailable: true})
		}
	} 
	// callback function for getting the mediaURL and fileName of recorded clip from Recorder component
	getRecordedMediaURLAndFileName(mediaURL, fileName) {
		this.setState({mediaURL: mediaURL, fileName: fileName})
	}

	getErrorFromRecorder(error) {
		let recorderAlert = `It wasn't possible to start a recording. - ${error}`
		this.setState({showAlert: true, alertMessage: recorderAlert})
	}

	getErrorDueToMediaRecorder(error) {
		let mediaRecorderAlert = `The sound recorder is not supported by Safari and Internet Explorer. 
		Please use another Browser. - ${error}`
		this.setState({showAlert: true, alertMessage: mediaRecorderAlert, streamAvailable: false})
	}

	setNewRecording() {
		this.setState({mediaURL: null, fileName: null})
	}

  render() {
  	return (
  		<React.Fragment>
			  <Navbar variant="dark">
			    <Navbar.Brand>
			    	<FontAwesomeIcon icon={faPodcast}  className="d-inline-block align-top"/>
			    	{' '}Record your podcast or web seminar
			    </Navbar.Brand>
			  </Navbar>
			  <Alert variant="danger" show={this.state.showAlert}>
			  	{this.state.alertMessage}
		  	</Alert>
				<Container className="main-container">
				  <h1>Record Audio and Video with Chrome and Download it to Your Computer</h1>
				  <p>
				    You can record anything you like inside a browser tab with this recorder, 
				    eg. a web seminar or a podcast. It only works with Chrome and you have to choose one Chrome Tab.
				    After naming your file, you can download it to your computer. 
				    The container of the file is mp4 with opus codex.
				  </p>
				  <Jumbotron>
						{!this.state.streamAvailable && (
							<Row>
								<Col className="recorder">
									<MicrophoneAccess 
										getStreamData={this.getStreamData} 					 
									/>
								</Col>
							</Row>
						)}
						{this.state.streamAvailable && !this.state.fileName && (
							<Row>
								<Col>
									<Recorder 
										stream={this.state.stream} 
										getRecordedMediaURLAndFileName={this.getRecordedMediaURLAndFileName}
										getErrorFromRecorder={this.getErrorFromRecorder}
										getErrorDueToMediaRecorder={this.getErrorDueToMediaRecorder}
									/>
								</Col>
							</Row>
						)}
						{this.state.mediaURL && (
							<Row>
								<Col className="player">
									<div className="Player">
										<AudioPlayer mediaURL={this.state.mediaURL} fileName={this.state.fileName} />
										<VideoPlayer mediaURL={this.state.mediaURL} fileName={this.state.fileName} />
										<DownloadButton mediaURL={this.state.mediaURL} fileName={this.state.fileName} />
										<NewRecordingButton setNewRecording={this.setNewRecording}/>
									</div>
								</Col>
							</Row>
						)}
					</Jumbotron>
		    </Container>
	    </React.Fragment>
  	)
  }
};

export default App;
