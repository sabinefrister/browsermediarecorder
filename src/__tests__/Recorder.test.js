import React from 'react';
import { shallow, mount } from 'enzyme';
import Recorder from '../Recorder'


class MockAudioContext {
  createMediaStreamSource() {
    function connect(gain) {
      return gain
    }
    function disconnect(gain) {
      return gain
    }
    return {connect: connect, disconnect: disconnect}
  }
  createGain() {
    return {gain: {value: 0}}
  }
}

window.AudioContext = MockAudioContext;

function shallowComponent() {
  const mockGetRecordedMediaURLAndFileName = jest.fn();
  const mockGetErrorFromRecorder = jest.fn();
  const mockGetErrorDueToMediaRecorder = jest.fn();
  const stream = {stream: "abc"};
  return shallow(<Recorder stream={stream} 
                  getRecordedMediaURLAndFileName={mockGetRecordedMediaURLAndFileName}
                  getErrorFromRecorder={mockGetErrorFromRecorder} 
                  getErrorDueToMediaRecorder={mockGetErrorDueToMediaRecorder} />);
}

function mountComponent() {
  const mockGetRecordedMediaURLAndFileName = jest.fn();
  const mockGetErrorFromRecorder = jest.fn();
  const mockGetErrorDueToMediaRecorder = jest.fn();
  const stream = {stream: "abc"};
  return mount(<Recorder stream={stream} 
                getRecordedMediaURLAndFileName={mockGetRecordedMediaURLAndFileName}
                getErrorFromRecorder={mockGetErrorFromRecorder} 
                getErrorDueToMediaRecorder={mockGetErrorDueToMediaRecorder} />);
}


describe('Recorder', () => {
  let wrapper;

	afterEach(() => {
		wrapper.unmount();
    window.MediaRecorder.mockClear()
	})

  test('renders Recorder component with record and stop button and the timer', () => {
    window.MediaRecorder = jest.fn()
    window.MediaRecorder.mockImplementation(function() {
      return {
        start: mockStart,
        stop: mockStop,
        onStop: jest.fn(),
        onDataAvailable: jest.fn(),
        onError: jest.fn(),
      }
    })
    wrapper = shallowComponent()

    expect(wrapper.find('Button.recordButton').length).toBe(1);
    expect(wrapper.find('Button.stopButton').length).toBe(1);
    expect(wrapper.find('Timer').length).toBe(1);
  })  

  test('renders Recorder component with all necessary props', () => {
    window.MediaRecorder = jest.fn()
    window.MediaRecorder.mockImplementation(function() {
      return {
        start: mockStart,
        stop: mockStop,
        onStop: jest.fn(),
        onDataAvailable: jest.fn(),
        onError: jest.fn(),
      }
    })
    wrapper = shallowComponent()

    expect(wrapper.instance().props.stream).toEqual({stream: "abc"});
    expect(wrapper.instance().props.getRecordedMediaURLAndFileName).toBeDefined();
  })

  test('renders expected state when mounting component', () => {
    window.MediaRecorder = jest.fn()
    window.MediaRecorder.mockImplementation(function() {
      return {
        start: mockStart,
        stop: mockStop,
        onStop: jest.fn(),
        onDataAvailable: jest.fn(),
        onError: jest.fn(),
      }
    })
    wrapper = shallowComponent()

    expect(wrapper.instance().state).toEqual({
      timerStarted: false,
      idRecordButton: "",
      enableRecordButton: true,
      enableStopButton: true
    });    
  })

  test('state change, when clicking on recordButton', () => {
    const mockStart = jest.fn()
    const mockStop = jest.fn()

    window.MediaRecorder = jest.fn()
    window.MediaRecorder.mockImplementation(function() {
      return {
        start: mockStart,
        stop: mockStop,
        onStop: jest.fn(),
        onDataAvailable: jest.fn(),
        onError: jest.fn(),
      }
    })

    wrapper = mountComponent()

    wrapper
    .find('Button.recordButton')
    .simulate('click');    

    expect(wrapper.instance().state).toEqual({
      timerStarted: true, 
      idRecordButton: "record", 
      enableStopButton: true, 
      enableRecordButton: false
    });

    expect(wrapper.find('Button.recordButton').props().disabled).toEqual(true);
    expect(wrapper.find('Button.stopButton').props().disabled).toEqual(false);
    expect(mockStart.mock.calls.length).toBe(1);
    expect(mockStop.mock.calls.length).toBe(0);
  })

  test('state change, when clicking on stopButton', () => {
    const mockStart = jest.fn()
    const mockStop = jest.fn()

    window.MediaRecorder = jest.fn()
    window.MediaRecorder.mockImplementation(function() {
      return {
        start: mockStart,
        stop: mockStop,
        onStop: jest.fn(),
        onDataAvailable: jest.fn(),
        onError: jest.fn(),
      }
    })

    wrapper = mountComponent()

    wrapper
    .find('Button.stopButton')
    .simulate('click');
    
    expect(wrapper.instance().state).toEqual({
      timerStarted: false, 
      idRecordButton: "",
      enableStopButton: false, 
      enableRecordButton: true
    });

    expect(wrapper.find('Button.recordButton').props().disabled).toEqual(false);
    expect(wrapper.find('Button.stopButton').props().disabled).toEqual(true);
    expect(mockStart.mock.calls.length).toBe(1);
    expect(mockStop.mock.calls.length).toBe(1);
  })
});
