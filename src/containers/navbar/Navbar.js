import React, { Component } from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar'
import './Navbar.css'
import MobileSidebar from "../mobile-sidebar/MobileSidebar";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_button_clicked: false,
      upload_clicked: false
    };
    this.onLogout = this.onLogout.bind(this);
    this.category_button = this.category_button.bind(this);
    this.uploadClick = this.uploadClick.bind(this);
  }

  onLogout() {
    this.props.onLogout();
  }

  category_button(e) {
    if (this.state.category_button_clicked === false) {
      this.setState({
        category_button_clicked: true
      })
    }

    else {
      this.setState({
        category_button_clicked: false
      })
    }
  }

  uploadClick(e) {
    console.log('upload clicked');
    if (this.state.upload_clicked) {
      console.log(this.state.upload_clicked);
      this.setState({
        upload_clicked: false
      }, ()=> {
        console.log('upload is now1 ' + this.state.upload_clicked)
      })
    }
    else {
      console.log(this.state.upload_clicked);
      this.setState({
        upload_clicked: true
      }, ()=> {
        console.log('upload is now2 ' + this.state.upload_clicked)
      })
    }
  }

  render() {
    let logged_in = this.props.userData.logged_in
    return (
      <React.Fragment>
        <div className="row navbar">
          <div className="col-6">
            <div className="row">
              <div className="col-6">
                <Link to='/' className="nav-link-color logo">Tinmage</Link>
              </div>
              <div className="col-6">
                <h6 onClick={this.category_button} className="nav-link-color align-vertical">Categories</h6>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-2"></div>
              <div className="col-2"></div>
              {!logged_in ?
                <div className="col-8">
                  <div className="row">
                    <div className="col-4">
                      <h1 className="nav-link-color" onClick={this.uploadClick}>Upload</h1>
                    </div>
                    <div className="col-4">
                      <Link to ='/signup' className="nav-link-color">Signup</Link>
                    </div>
                    <div className="col-4">
                      <Link to ='/login' className="nav-link-color">Login</Link>
                    </div>
                  </div>
                </div>
                :
                <div className="col-8">
                  <div className="row">
                    <div className="col-sm-4">
                      <h1 className="nav-link-color" onClick={this.uploadClick}>Upload</h1>
                    </div>
                    <div className="col-sm-4">
                      <Link to ='/profile' className="nav-link-color">{this.props.userData.username}</Link>
                    </div>
                    <div className="col-sm-4">
                      <Link to ='/logout' onClick={this.onLogout}>Logout</Link>
                    </div>
                  </div>
                </div>
              }

            </div>
          </div>
        </div>
        {this.state.category_button_clicked ?
          <div className="row width-100 margin-0">
            <MobileSidebar/>
          </div>
          :
          ""
        }
    </React.Fragment>
    )
  }
}

export default Navbar