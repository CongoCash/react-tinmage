import React, { Component } from 'react'
import {Link} from 'react-router-dom'
require('./MobileSidebar.css')

class MobileSidebar extends Component {
  constructor() {
    super();
    this.state = {
      categories: ['new', 'ads', 'animals', 'cars', 'cartoons', 'cool', 'funny', 'games', 'gif', 'jokes', 'movies',
        'music', 'other', 'political', 'sports', 'travel', 'tv', 'untagged', 'wow']
    };
    this.category_button = this.category_button.bind(this);
  }

  category_button() {
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

  capitalLink(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  render() {
    return (
      <div className="row width-100 margin-0 category-dropdown" onMouseLeave={this.props.category_inactive}>
        <div className="width-100 col-sm-10 offset-sm-1 col-12 padding-0">
          <ul className="row sidebar-list width-100 height-100">
            {this.state.categories.map((category, index) =>
              <Link className="col-3 col-sm-2 col-md-1 col-lg-1 category-item" to={"/category/" + category} key={index}>
                <li onClick={this.category_button} className="category-design">
                  {this.capitalLink(category)}
                </li>
              </Link>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default MobileSidebar
