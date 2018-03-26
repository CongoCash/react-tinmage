import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Start from '../src/containers/start/Start.js'
import Navbar from '../src/containers/navbar/Navbar.js'
import Routes from './containers/routes/Routes.js'
import axios from 'axios'
import { Switch, Route } from 'react-router-dom'
import Login from './containers/login/Login'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      logged_in: false,
      session_id: ''
    }
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogin(username, password) {
    console.log('accessed original onLogin')
    axios.post('http://localhost:8000/api/users/login', {username: username, password: password})
    .then((response) => {
      console.log(response.data.logged_in);
      if (response.data.logged_in == true) {
        this.setState({
          logged_in: true,
          username: response.data.username,
          session_id: response.data.session_id
        }, () => {
          console.log(this.state)
        })
      }
    })
  }

  onLogout() {
    console.log('logging out');
    axios.post('http://localhost:8000/api/users/logout')
    .then((response) => {
      if (response.data.logged_in == false) {
        this.setState({
          username: '',
          password: '',
          logged_in: false,
          session_id: ''
        }, () => {
          console.log(this.state)
        })
      }
    })
  }

  render() {
    return (
      <div>
        <Navbar userData={this.state} onLogout={this.onLogout} />
        <Routes logged_in={this.state.logged_in} onLogin={this.onLogin} />
      </div>
    );
  }
}

export default App;
