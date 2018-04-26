import React, { Component } from 'react';
import './App.css';
import Navbar from '../src/containers/navbar/Navbar.js'
import Sidebar from '../src/containers/sidebar/Sidebar.js'
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

  componentWillMount() {
    if (localStorage.getItem("username") && localStorage.getItem("session_id")) {
      this.setState({
        username: localStorage.getItem("username"),
        session_id: localStorage.getItem("session_id"),
        logged_in: true
      })
    }
  }


  onLogin(username, password) {
    axios.post(myConfig.api_url + '/api/users/login', {username: username, password: password})
    .then((response) => {
      if (response.data.logged_in == true) {
        localStorage.setItem("username", response.data.username)
        localStorage.setItem("session_id", response.data.session_id)
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
    localStorage.setItem("username", '')
    localStorage.setItem("session_id", '')
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Navbar userData={this.state} onLogout={this.onLogout} />
        </div>
        <div className="row">
          <div className="col-sm-2">
            <Sidebar />
          </div>
          <div className="col-sm-10">
            <Routes userData={this.state} logged_in={this.state.logged_in} onLogin={this.onLogin} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
