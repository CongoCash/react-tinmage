import React, { Component } from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import axios from 'axios'
require('./Category.css')

class Category extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images: [],
      image_index: 0,
      current_image_url: ''
    }
  }

  componentWillMount() {
    this.getImages()
  }

  getImages() {
    axios.get(this.props.userData.base_url + '/api/images/tags/' + this.props.match.params.tag)
    .then((res) => {
      this.setState({
        images: res.data
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Category1</h1>
      </div>
    )
  }
}

export default Category