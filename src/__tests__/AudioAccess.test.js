import React from 'react';
import { shallow, mount } from 'enzyme';
import AudioAccess from '../AudioAccess'

function shallowComponent() {
  const mockGetStreamData = jest.fn((stream) => {stream: "stream"});
  return shallow(<AudioAccess getStreamData={mockGetStreamData} />);
}

describe('AudioAccess', () => {
  let wrapper;

	afterEach(() => {
		wrapper.unmount();
	})

  test('renders AudioAccess component with all elements', () => {
    wrapper = shallowComponent()
    expect(wrapper.find('Button').length).toBe(1);
  })

  test('renders AudioAccess component with all necessary props', () => {
    wrapper = shallowComponent()
    expect(wrapper.instance().props.getStreamData).toBeDefined();
  })

  test('should call getStreamData after button click', async () => {
    const mockGetStreamData = jest.fn();
    wrapper = mount(<AudioAccess getStreamData={mockGetStreamData} />);

    const mockMediaDevices = {
      getDisplayMedia: jest.fn()
    }

    global.navigator.mediaDevices = mockMediaDevices;

    wrapper
      .find('Button')
      .simulate('click');

    await expect(mockMediaDevices.getDisplayMedia.mock.calls.length).toBe(1);
    expect(mockGetStreamData.mock.calls.length).toBe(1);
  })
});
