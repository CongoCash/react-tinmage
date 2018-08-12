import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
import MobileSidebar from "../mobile-sidebar/MobileSidebar";
import Upload from "../upload/Upload";

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
      this.setState({
        upload_clicked: false
      })
    }
    else {
      this.setState({
        upload_clicked: true
      })
    }
  }

  render() {
    let logged_in = this.props.userData.logged_in;
    console.log('navbar rendered');
    return (
      <div className="col-sm">
        <div className="row navbar">
          <div className="col-sm-6 col-6">
            <div className="row">
              <div className="col-6 align-left padding-0">
                <Link to='/' className="nav-link-style logo">Tinmage</Link>
              </div>
              <div className="col-6 align-left padding-0">
                <a  onClick={this.category_button} className="nav-link-style align-vertical">Categories</a>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-6">
            <div className="row">
              <div className="col-sm-2"></div>
              {!logged_in ?
                <div className="col-12">
                  <div className="row">
                    <div className="col-4 align-right">
                      <a  className="nav-link-style align-vertical" onClick={this.uploadClick}>Upload</a>
                    </div>
                    <div className="col-4 align-right">
                      <Link to ='/signup' className="nav-link-style align-vertical">Signup</Link>
                    </div>
                    <div className="col-4 align-right">
                      <Link to ='/login' className="nav-link-style align-vertical">Login</Link>
                    </div>
                  </div>
                </div>
                :
                <div className="col-12">
                  <div className="row">
                    <div className="col-4 align-right">
                      <a  className="nav-link-style align-vertical" onClick={this.uploadClick}>Upload</a>
                    </div>
                    <div className="col-4 align-right">
                      <Link to ='/profile' className="nav-link-style align-vertical">{this.props.userData.username}</Link>
                    </div>
                    <div className="col-4 align-right">
                      <Link to ='/logout' className="nav-link-style align-vertical" onClick={this.onLogout}>Logout</Link>
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
        {this.state.upload_clicked ?
            <Upload uploadClick={this.uploadClick} userData={this.props.userData}/>
          :
          ""
        }
    </div>
    )
  }
}

export default Navbar