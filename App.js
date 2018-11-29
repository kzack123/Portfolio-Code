import React, { Component } from 'react';
import logo from './earth.ico';
import './App.css';

import FrontPage from './containers/FrontPage/FontPage';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <FrontPage />
      </div>
    );
  }
}

export default App;
