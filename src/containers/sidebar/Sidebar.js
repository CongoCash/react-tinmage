import React, { Component } from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
require('./Sidebar.css')

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: ['new', 'ads', 'animals', 'cars', 'cartoons', 'cool', 'funny', 'games', 'gif', 'jokes', 'movies',
        'music', 'other', 'political', 'sports', 'travel', 'tv', 'untagged', 'wow'],
      category_button_clicked: false
    };
    this.capitalLink = this.capitalLink.bind(this);
    this.category_button = this.category_button.bind(this);
  }

  capitalLink(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
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

  render() {
    return (
      <div className="sidebar-border">
        {this.state.categories.map(category =>
          <Link className="row link-design" to={"/category/" + category}>
            {this.capitalLink(category)}
          </Link>
        )}
      </div>
    )
  }
}

export default Sidebar
