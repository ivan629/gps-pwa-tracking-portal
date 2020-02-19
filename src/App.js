import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

import logo from './logo.svg';

import './App.css';
import RootContainer from '../src/react/components/RootContainer'

function App() {
  return (
      <Provider store={store}>
        <div className="App">
          <RootContainer />
        </div>
      </Provider>
  );
}

export default App;
