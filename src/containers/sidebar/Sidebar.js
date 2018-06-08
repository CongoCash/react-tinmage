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
      <li className="width-100">
        {this.state.categories.map(category =>
          <ul className="row link-design">
            <Link to={"/category/" + category}>
              <ul className="link-text col-md-12 align-vertical">{this.capitalLink(category)}</ul>
            </Link>
          </ul>
        )}
      </li>
    )
  }
}

export default Sidebar
