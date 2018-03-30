import React, { Component } from 'react';
import './App.css';
import Navbar from '../src/containers/navbar/Navbar.js'
import Routes from './containers/routes/Routes.js'
import axios from 'axios'
import { myConfig } from './config'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      logged_in: false,
      session_id: '',
      error_message: ''
    }
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogin(username, password) {
    axios.post(myConfig.api_url + '/api/users/login', {username: username, password: password})
    .then((response) => {
      if (response.data.logged_in == true) {
        this.setState({
          logged_in: true,
          username: response.data.username,
          session_id: response.data.session_id,
          error_message: ''
        })
      }
      else {
        this.setState({
          logged_in: false,
          username: '',
          password: '',
          session_id: '',
          error_message: response.data.error
        })
      }
    })
  }

  onLogout() {
    axios.post(myConfig.api_url + '/api/users/logout')
    .then((response) => {
      if (response.data.logged_in == false) {
        this.setState({
          username: '',
          password: '',
          logged_in: false,
          session_id: '',
          error_message: ''
        })
      }
    })
  }

  render() {
    return (
      <div>
        <Navbar userData={this.state} onLogout={this.onLogout} />
        <Routes userData={this.state} logged_in={this.state.logged_in} onLogin={this.onLogin} />
      </div>
    );
  }
}

export default App;
