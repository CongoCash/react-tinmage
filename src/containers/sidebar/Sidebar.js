import React, { Component } from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: ['new', 'funny', 'animals']
    }
    this.capitalLink = this.capitalLink.bind(this)
  }

  capitalLink(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  render() {
    return (
      <div>
      {this.state.categories.map(category =>
        <div className="row">
          <div clasName="col-sm-12">
            <h1><Link to={"/" + category}>{this.capitalLink(category)}</Link></h1>
          </div>
        </div>
      )}
      </div>
    )
  }
}

export default Sidebar