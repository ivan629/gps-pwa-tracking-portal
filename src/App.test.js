import React from 'react';
import { shallow } from 'enzyme';
import Controls from './react/components/Controls';

describe('Compare correct button text', () => {
  const nextProps = {
    isLocationMonitoring: false
  };

  const wrapper = shallow(<Controls {...nextProps}/>);

  // it('is correct button text', () => {
  //   const text = wrapper.find('.toggleDetectionButton').text();
  //
  //   console.log(text);
  //
  //   expect(text).toEqual(`${nextProps.isLocationMonitoring ? 'stop' : 'start'} detection`);
  // });

  it('renders properly', () => {
    expect(wrapper.debug()).toMatchSnapshot()
  })
});
