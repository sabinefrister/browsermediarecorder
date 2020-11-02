import React, { Component } from 'react';
import { Container, Jumbotron, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import MicrophoneAccess from './MicrophoneAccess';
import Recorder from './Recorder';
import AudioPlayer from './AudioPlayer';
import Download from './Download';


class App extends Component {
  constructor(props) {
    super(props);
		this.state = {
			stream: null,
			audioURL: null,
			streamAvailable: false,
			fileName: null,
		};
		this.getStreamData = this.getStreamData.bind(this);
		this.getRecordedAudioURLAndFileName = this.getRecordedAudioURLAndFileName.bind(this);
	}
  
	// callback function for getting the stream of MicrophoneAccess component
	getStreamData(streamData) {
		this.setState({stream: streamData})
		this.setState({streamAvailable: true})
	} 
	// callback function for getting the audioURL and fileName of recorded clip from Recorder component
	getRecordedAudioURLAndFileName(audioURL, fileName) {
		this.setState({audioURL: audioURL, fileName: fileName})
	}

  render() {
  	return (
  		<div className="App">
				<Jumbotron> 
				  <h1>Record audio and Download to your computer</h1>
				  <p>
				    You can record anything you like with this simple sound recorder. After naming your file, 
				    you can download it to your computer.
				  </p>
				</Jumbotron>
				<Container>
					<Row>
						<Col className="headline">
							<h1 className="headline"><FontAwesomeIcon icon={faMicrophone} /> Record your voice</h1>
						</Col>
					</Row>

					{!this.state.streamAvailable && (
						<Row>
							<Col className="recorder">
								<MicrophoneAccess 
									stream={this.state.stream}
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
									getRecordedAudioURLAndFileName={this.getRecordedAudioURLAndFileName}
								/>
							</Col>
						</Row>
					)}
					{this.state.audioURL && (
						<Row>
							<Col className="player">
								<div className="Player">
									<AudioPlayer audioURL={this.state.audioURL} fileName={this.state.fileName} />
									<Download audioURL={this.state.audioURL} fileName={this.state.fileName} />
								</div>
							</Col>
						</Row>
					)}
				</Container>
	    </div>
  	)
  }
};

export default App;
