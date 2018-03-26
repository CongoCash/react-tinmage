import React, { Component } from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.onLogout = this.onLogout.bind(this)
  }

  onLogout() {
    console.log('clicking the logout button');
    this.props.onLogout();
  }


  render() {
    let logged_in = this.props.userData.logged_in
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6"></div>
          <div className="col-sm-6">
            <div className="row">
              <div className="col-sm-4">
                <Link to='/upload'>Upload</Link>
              </div>
              {!logged_in ?
                <div className="col-sm-8">
                  <div className="row">
                    <div className="col-sm-6">
                      <Link to ='/signup'>Signup</Link>
                    </div>
                    <div className="col-sm-6">
                      <Link to ='/login'>Login</Link>
                    </div>
                  </div>
                </div>
                :
                <div className="col-sm-8">
                  <div className="row">
                    <div className="col-sm-6">
                      <Link to ='/profile'>{this.props.userData.username}</Link>
                    </div>
                    <div className="col-sm-6">
                      <button onClick={this.onLogout}>Logout</button>
                    </div>
                  </div>
                </div>
              }

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar