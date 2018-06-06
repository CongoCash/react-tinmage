import React, { Component } from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
require('./Sidebar.css')

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: ['new', 'ads', 'animals', 'cars', 'cartoons', 'cool', 'funny', 'games', 'gif', 'jokes', 'movies',
        'music', 'other', 'political', 'sports', 'travel', 'tv', 'untagged', 'wow']
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
        <div className="row link-design">
          <Link className="link-text col-lg-12 align-vertical" to={"/category/" + category}>
            {this.capitalLink(category)}
          </Link>
        </div>
      )}
      </div>
    )
  }
}

export default Sidebar
