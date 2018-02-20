import React, { Component } from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import Upload from "../upload/Upload";

class Navbar extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6"></div>
          <div className="col-sm-6">
            <Link to='/upload'>Upload</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar