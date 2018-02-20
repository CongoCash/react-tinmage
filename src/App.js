import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Start from '../src/containers/start/Start.js'
import Navbar from '../src/containers/navbar/Navbar.js'
import Main from '../src/containers/main/Main.js'


class App extends Component {

  render() {
    return (
      <div>
        <Navbar />
        <Main />
      </div>
    );
  }
}

export default App;
