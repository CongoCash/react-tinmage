import React, { Component } from 'react'
import './Profile.css'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
    this.getImages = this.getImages.bind(this);
  }

  componentDidMount() {
    this.getImages();
  }

  getImages() {
    axios.get(this.props.userData.base_url + 'api/users/' + this.props.match.params.id + '/ratings').then((response) => {
      console.log(response);
      this.setState({
        images: response.data
      })
    })
  }

  render() {
    let images = this.state.images.map((image) => {
      console.log(image);
      return <Link to={"/images/" + image.ImageId}><img width="100%" height="300" src={image.Image.url}/></Link>
    });
    let image_element = [];
    console.log(images.length);
    for (let i = 0; i < images.length; i+= 4) {
      image_element.push(
      <div className="row">
        <div className="col-lg-3 col-md-6 col-12">
          {images[i]}
        </div>
        <div className="col-lg-3 col-md-6 col-12">
          {images[i+1]}
        </div>
        <div className="col-lg-3 col-sm-6 col-12">
          {images[i+2]}
        </div>
        <div className="col-lg-3 col-sm-6 col-12">
          {images[i+3]}
        </div>
      </div>
      )
    }
    console.log(image_element);
    return (
      <div className="col-lg-12">
        <div className="row">
          <div className="col-sm-12">
            {image_element.map((elements) => {
              return elements
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Profile