import React, { Component } from 'react'
import axios from 'axios'
import './Image.css'
import Tag from '../tag/Tag'
import ImageInfo from '../image-info/ImageInfo'
import SizeButton from '../size-buttons/SizeButton'
import SpecificImage from '../specific-image/SpecificImage'


class Image extends Component {
  constructor() {
    super();
    this.state = {
      image_url: '',
      username: '',
      upload_date: '',
      image_class: 'medium-image',
      small_clicked: false,
      medium_clicked: true,
      large_clicked: false,
      title: '',
      tags: []
    };
    this.clickSmall = this.clickSmall.bind(this);
    this.clickMedium = this.clickMedium.bind(this);
    this.clickLarge = this.clickLarge.bind(this);
  }

  componentDidMount() {
    axios.get(this.props.userData.base_url + "api/images/" + this.props.match.params.id).then((response) => {
      if (response.data[0].User) {
        this.setState({
          image_url: response.data[0].url,
          username: response.data[0].User.username,
          upload_date: response.data[0].createdAt.substring(0,10),
          title: response.data[0].title,
          tags: response.data[0].tags
        })
      }
      else {
        this.setState({
          image_url: response.data[0].url,
          username: '',
          upload_date: response.data[0].createdAt.substring(0,10),
          title: response.data[0].title,
          tags: response.data[0].tags
        })
      }
    })
  }

  clickSmall() {
    this.setState({
      small_clicked: true,
      medium_clicked: false,
      large_clicked: false,
      image_class: 'small-image'
    })
  }

  clickMedium() {
    this.setState({
      small_clicked: false,
      medium_clicked: true,
      large_clicked: false,
      image_class: 'medium-image'
    })
  }

  clickLarge() {
    this.setState({
      small_clicked: false,
      medium_clicked: false,
      large_clicked: true,
      image_class: 'large-image'
    })
  }

  render() {
    const image_url = this.props.userData.base_url + this.state.image_url;
    const image_class = this.state.image_class+ " rounded mx-auto d-block";

    return (
      <div className="container">
        <ImageInfo imageData={this.state}/>
        <SizeButton small={this.clickSmall} medium={this.clickMedium} large={this.clickLarge}/>
        <SpecificImage image_url={image_url} image_class={image_class} />
        <Tag tags={this.state.tags}/>
      </div>
    );
  }
}


export default Image