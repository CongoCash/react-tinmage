import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      logged_in: false,
    }
    this.onChange = this.onChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }
  componentDidMount() {
    fetch('http://localhost:8000/api/users').then(response => {
      console.log(response)
    })
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(e.target.value)
  }

  onLogin(e) {
    e.preventDefault();
    console.log('mmmmk')
    this.props.onLogin(this.state.username, this.state.password);
    console.log('accessing login form one')
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
                <button className="btn btn-primary btn-lg" onClick={this.onLogin}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm