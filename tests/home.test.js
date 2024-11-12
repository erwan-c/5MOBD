import React from 'react';
import { render } from '@testing-library/react-native';
import Home from '../pages/home';

describe('<Home />', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Welcome to Home')).toBeTruthy();
  });
});
