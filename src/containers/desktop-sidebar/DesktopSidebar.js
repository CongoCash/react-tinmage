import React, { Component } from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
require('./DesktopSidebar.css')

class DesktopSidebar extends Component {

  capitalLink(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  render() {
    //add button that will bring a dropdown for sidebar when it's too small
    return (
      <div className="sidebar-border col-lg-2">
        {this.props.categories.map(category =>
          <Link className="row link-design" to={"/category/" + category}>
            <div className="col-lg-12">
              {this.capitalLink(category)}
            </div>
          </Link>
        )}
      </div>
    )
  }
}

export default DesktopSidebar
