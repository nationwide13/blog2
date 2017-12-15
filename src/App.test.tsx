import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { defaultMatch } from './constants/definitions';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App match={defaultMatch}/>, div);
});
