import React, { Component } from 'react'
import axios from 'axios'
import {myConfig} from '../../config'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      error_message: ''
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
    if (this.state.username.length !== 0 && this.state.password.length !== 0 && this.state.password_confirmation.length !== 0
      && this.state.password === this.state.password_confirmation) {

      axios.post(myConfig.api_url + 'api/users', {user: this.state})
      .then((response) => {
        this.setState({
          error_message: ''
        });
        this.props.history.push('/login');
      })
      .catch((error) => {
        this.setState({
          error_message: error.response.data
        })
      })
    }
    else if (this.state.username.length === 0) {
      this.setState({
        error_message: 'Please fill in username.'
      })
    }

    else if (this.state.password.length === 0) {
      this.setState({
        error_message: 'Please enter a password.'
      })
    }

    else if (this.state.password !== this.state.password_confirmation) {
      this.setState({
        error_message: 'Your password and password confirmation do not match.'
      })
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1>{this.state.error_message}</h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label className="control-label">Username</label>
                <input className="form-control" value={this.state.username}type="text" name="username" onChange={this.onChange} />
              </div>
              <div className="form-group">
                <label className="control-label">Password</label>
                <input className="form-control" value={this.state.password} type="password" name="password"
                       onChange={this.onChange} />
              </div>
              <div className="form-group">
                <label className="control-label">Password Confirmation</label>
                <input className="form-control" value={this.state.password_confirmation} type="password"
                       name="password_confirmation" onChange={this.onChange} />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-lg">
                  Signup
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Signup
