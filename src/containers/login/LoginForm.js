import React, { Component } from 'react'
import '../login/LoginForm.css'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      logged_in: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  componentWillUnmount() {
    this.props.userData.error_message = '';
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onLogin(e) {
    e.preventDefault();
    this.props.onLogin(this.state.username, this.state.password);
  }

  render() {
    console.log(this.props.userData);
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            {this.props.userData.error_message ?
              <div className="row">
                <div className="col-sm-12">
                  <h3 id="error-message">Wrong Username/Password</h3>
                </div>
              </div> : ""
            }
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
