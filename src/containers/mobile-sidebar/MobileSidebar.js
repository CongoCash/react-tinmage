import React, { Component } from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
require('./MobileSidebar.css')

class MobileSidebar extends Component {
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
    //add button that will bring a dropdown for sidebar when it's too small
    return (
      <div className="width-100 col-md-12">
        <div className="category-button row" onClick={this.category_button}>
          <div className="col-md-12">Categories</div>
        </div>
        {this.state.category_button_clicked ?
          <ul className="row sidebar-list">
            {this.state.categories.map(category =>
              <Link className="col-3 col-sm-2 col-md-1 col-lg-1 mobile-link" to={"/category/" + category}>
                <li onClick={this.category_button} className="category-design">
                  {this.capitalLink(category)}
                </li>
              </Link>
            )}
          </ul>
          :
          ""
        }
      </div>
    )
  }
}

export default MobileSidebar
