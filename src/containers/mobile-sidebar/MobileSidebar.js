import React, { Component } from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
require('./MobileSidebar.css')

class MobileSidebar extends Component {
  constructor() {
    super()
    this.state = {
      category_button_clicked: false
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
      <div className="width-100 col-md-12">
        <div className="category-button row" onClick={this.category_button}>
          <div className="col-md-12">Categories</div>
        </div>
        {this.state.category_button_clicked ?
          <ul className="row sidebar-list">
            {this.props.categories.map(category =>
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
