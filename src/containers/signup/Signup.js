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
      password_confirmation: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault()
    axios.post(myConfig + 'api/users', {user: this.state})
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
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
