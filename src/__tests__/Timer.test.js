import React from 'react';
import { shallow } from 'enzyme';
import Timer from '../Timer'

function shallowComponent(timerStarted) {
  return shallow(<Timer timerStarted={timerStarted} />);
}

function mountComponent(timerStarted) {
  return mount(<Timer timerStarted={timerStarted} />);
}

describe('Timer', () => {
	let wrapper;

	afterEach(() => {
		wrapper.unmount();
	})

  test('render Timer component with all elements', () => {
    wrapper = shallowComponent(false);
    expect(wrapper.find('.timer').length).toBe(1);
    expect(wrapper.contains(<div>00:00:00</div>)).toEqual(true)
  })  

  test('render Timer which has not started yet', () => {
    wrapper = shallowComponent(false);
    expect(wrapper.find('.timer').length).toBe(1);
  })

  test('renders Timer component with all necessary props', () => {
    wrapper = shallowComponent(true);
    expect(wrapper.instance().props.timerStarted).toEqual(true);
    expect(wrapper.contains(<div>00:00:00</div>)).toEqual(true)
  }) 

  test('renders correct timer after one second', () => {
    wrapper = shallowComponent(true);
    expect(wrapper.instance().props.timerStarted).toEqual(true);

    const originalDate = new Date(2020, 0, 1, 11, 0, 55)
    const mockedDate = new Date(2020, 0, 1, 11, 0, 56)

    global.Date = jest.fn(() => originalDate)

    // componentDidUpdate sets dateStart
    wrapper.instance().componentDidUpdate()
    global.Date = jest.fn(() => mockedDate)
    wrapper.instance().refreshTimer()

    expect(wrapper.state("duration")).toBe("00:00:01")
  })
});