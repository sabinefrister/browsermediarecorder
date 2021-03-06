import React, { Component } from 'react';
import { Navbar, Container, Jumbotron, Row, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPodcast } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import AudioAccess from './AudioAccess';
import VideoAccess from './VideoAccess';
import Recorder from './Recorder';
import AudioPlayer from './AudioPlayer';
import VideoPlayer from './VideoPlayer';
import DownloadButton from './DownloadButton';
import NewRecordingButton from './NewRecordingButton';


class App extends Component {
  constructor(props) {
    super(props);
		this.state = {
			mediaURL: null,
			mediaType: "",
			streamAvailable: false,
			fileName: null,
			showAlert: false,
			alertMessage: "", 
			stream: null,
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

	// callback function for getting the stream of AudioAccess or VideoAccess component
	getStreamData(streamData, mediaType) {
		if (streamData === "error") {
			let mediaAccessAlert = "It wasn't possible to access your screen sharing. Please reload this page and start again."
			this.setState({showAlert: true, alertMessage: mediaAccessAlert})
		} else {
			this.setState({stream: streamData, streamAvailable: true, mediaType: mediaType})
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
		this.state.stream.getTracks().forEach(function(track) {
		  track.stop();
		});
		this.setState({streamAvailable: null, mediaURL: null, fileName: null, stream: null})
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
				  <h1>Record Audio and Video with Chrome</h1>
				  <p>
				    You can record anything you like inside a browser tab with this recorder, 
				    eg. a web seminar or a podcast. It only works with Chrome!
				    After recording and naming your file, you can download it to your computer. 
				    The container of the file is mp4 with opus codex.
				  </p>
				  <Jumbotron>
						{!this.state.streamAvailable && (
							<React.Fragment>
								<Row>
									<Col>
										<p>Please select if you want to record 'audio' or 'video and audio'. </p>
										<p>Then you will be asked to share your screen. You should choose Chrome Tab on the 
										right side, decide which tab you want to record in and enable 'Share Audio' on the left bottom. 
										After sharing your screen the record will start automatically. </p>
										<p>If you are recording a video, you can enter full screen in the tab you are recording 
										in. You should stay there while recording. Otherwise you can increase the video size 
										by zooming inside the browser.</p>
									</Col>
								</Row>
								<Row>
									<Col className="mediaAccess">
										<AudioAccess 
											getStreamData={this.getStreamData} 					 
										/>
										<VideoAccess 
											getStreamData={this.getStreamData} 					 
										/>
									</Col>
								</Row>
							</React.Fragment>
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
										{this.state.mediaType === "audio" ? (
												<AudioPlayer mediaURL={this.state.mediaURL} fileName={this.state.fileName} />
											) : (
												<VideoPlayer mediaURL={this.state.mediaURL} fileName={this.state.fileName} />
											)
										}
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
