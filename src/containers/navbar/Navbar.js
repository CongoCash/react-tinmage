import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
import MobileSidebar from "../mobile-sidebar/MobileSidebar";
import Upload from "../upload/Upload";
import logo from './logo.png';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_active: false,
      upload_clicked: false
    };
    this.onLogout = this.onLogout.bind(this);
    this.category_active = this.category_active.bind(this);
    this.uploadClick = this.uploadClick.bind(this);
  }

  onLogout() {
    this.props.onLogout();
  }

  category_active(e) {
    this.setState({
      category_active: true
    })
  }

  category_inactive = () => {
    this.setState({
      category_active: false
    })
  };

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
    return (
      <div className="col-12">
        <div className="row navbar-default">
          <div className="col-sm-6 col-6">
            <div className="row height-100">
              <div className="col-6 align-left align-vertical padding-0" onMouseEnter={this.category_inactive}>
                <Link to='/' className="nav-link-style logo"><img className="logo-image" src={logo} /></Link>
              </div>
              <div className="col-6 flex-center align-vertical padding-0" onMouseEnter={this.category_active} >
                <a className="nav-link-style align-vertical category-navbar">Categories</a>
              </div>
              <div className="col-4" onMouseEnter={this.category_inactive}></div>
            </div>
          </div>
          <div className="col-sm-6 col-6">
            <div className="row height-100">
              <div className="col-sm-2"></div>
              {!logged_in ?
                <div className="col-12">
                  <div className="row">
                    <div className="col-4 align-right align-vertical">
                      <a className="nav-link-style upload" onClick={this.uploadClick}>Upload</a>
                    </div>
                    <div className="col-4 align-right align-vertical">
                      <Link to ='/signup' className="nav-link-style align-vertical">Signup</Link>
                    </div>
                    <div className="col-4 align-right align-vertical">
                      <Link to ='/login' className="nav-link-style align-vertical">Login</Link>
                    </div>
                  </div>
                </div>
                :
                <div className="col-12">
                  <div className="row">
                    <div className="col-4 align-right align-vertical">
                      <a  className="nav-link-style" onClick={this.uploadClick}>Upload</a>
                    </div>
                    <div className="col-4 align-right align-vertical">
                      <Link to ={'/profile/' + this.props.userData.user_id } className="nav-link-style">{this.props.userData.username}</Link>
                    </div>
                    <div className="col-4 align-right align-vertical">
                      <Link to ='/logout' className="nav-link-style" onClick={this.onLogout}>Logout</Link>
                    </div>
                  </div>
                </div>
              }

            </div>
          </div>
        </div>
        {this.state.category_active ?
          <div className="row width-100 margin-0 category-dropdown" onMouseLeave={this.category_inactive}>
            <MobileSidebar onMouseLeave={this.category_inactive}/>
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