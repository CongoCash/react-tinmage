import React, { Component } from 'react'
import axios from 'axios'
import LoginForm from './LoginForm.js'
import {myConfig} from '../../config'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    axios.get(myConfig + 'api/users/login', {user: this.state});
  }


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <LoginForm onLogin = {this.props.onLogin} userData={this.props.userData}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
