import React from 'react';
import { shallow } from 'enzyme';
import VideoPlayer from '../VideoPlayer'


describe('VideoPlayer', () => {
	let wrapper;

	beforeEach(() => {
		const fileName = "Test123.wav";
		const mediaURL = "https://mediaURL";
	  wrapper = shallow(<VideoPlayer fileName={fileName} mediaURL={mediaURL}/>);
	});

	afterEach(() => {
		wrapper.unmount();
	})

  test('renders VideoPlayer component with all elements', () => {
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('h3').length).toBe(1);
    expect(wrapper.find('video').length).toBe(1);
  })

  test('renders VideoPlayer component with all necessary props', () => {
    expect(wrapper.instance().props.fileName).toEqual("Test123.wav");
    expect(wrapper.instance().props.mediaURL).toEqual("https://mediaURL");
    expect(wrapper.find('video').props().src).toEqual("https://mediaURL");
    expect(wrapper.find('video').props().controls).toEqual(true);
  })
});