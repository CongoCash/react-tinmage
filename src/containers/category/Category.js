import React, { Component } from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
require('./Category.css')

class Category extends Component {
  constructor(props) {
    super(props)
  }

  // getImages(e) {
  //   axios.get(this.props.userData.base_url + )
  // }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Category</h1>
      </div>
    )
  }
}

export default Category