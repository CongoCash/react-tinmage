import React, { Component } from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import './Navbar.css'

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
      <div className="container-fluid">
        <div className="row nav-height-color">
          <div className="col-sm-6">
            <div className="row">
              <div className="col-sm-6">
                <Link to='/' className="nav-link-color">Tinmage</Link>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="row">
              <div className="col-sm-4">
                <Link to='/upload' className="nav-link-color">Upload</Link>
              </div>
              {!logged_in ?
                <div className="col-sm-8">
                  <div className="row">
                    <div className="col-sm-6">
                      <Link to ='/signup' className="nav-link-color">Signup</Link>
                    </div>
                    <div className="col-sm-6">
                      <Link to ='/login' className="nav-link-color">Login</Link>
                    </div>
                  </div>
                </div>
                :
                <div className="col-sm-8">
                  <div className="row">
                    <div className="col-sm-6">
                      <Link to ='/profile' className="nav-link-color">{this.props.userData.username}</Link>
                    </div>
                    <div className="col-sm-6">
                      <Link to ='/logout' onClick={this.onLogout}>Logout</Link>
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