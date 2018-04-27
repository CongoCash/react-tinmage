import React, { Component } from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
require('./Category.css')

class Category extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>Category</h1>
      </div>
    )
  }
}

export default Category