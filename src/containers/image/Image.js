import React, { Component } from 'react'
import axios from 'axios'
import './Image.css'
import Tag from './tag/Tag'
import ImageInfo from './image-info/ImageInfo'
import SizeButton from './size-buttons/SizeButton'
import SpecificImage from './specific-image/SpecificImage'


class Image extends Component {
  constructor() {
    super();
    this.state = {
      image_class: 'medium-image',
      small_clicked: false,
      medium_clicked: true,
      large_clicked: false,
      image_data: '',
      width: '',
      height: ''
    };
    this.nextImage = this.nextImage.bind(this);
    this.clickSmall = this.clickSmall.bind(this);
    this.clickMedium = this.clickMedium.bind(this);
    this.clickLarge = this.clickLarge.bind(this);
  }

  componentDidMount() {
    axios.get(this.props.userData.base_url + "api/images/" + this.props.match.params.id).then((response) => {
      this.setState({
        image_data: response.data[0]
      }, () => {
        console.log(this.state.image_data);
      })
    })
  }

  nextImage(e) {
    console.log(e.keyCode);
    if (e.keyCode === 37) {
      console.log('37');
    }
  }

  clickSmall() {
    let height = window.innerWidth*0.20 * this.state.image_data.height/this.state.image_data.width;

    this.setState({
      small_clicked: true,
      medium_clicked: false,
      large_clicked: false,
      image_class: 'small-image',
    })
  }

  clickMedium() {
    let height = window.innerWidth*0.35 * this.state.image_data.height/this.state.image_data.width;

    this.setState({
      small_clicked: false,
      medium_clicked: true,
      large_clicked: false,
      image_class: 'medium-image',
    })
  }

  clickLarge() {
    let height = window.innerWidth*0.7 * this.state.image_data.height/this.state.image_data.width;

    this.setState({
      small_clicked: false,
      medium_clicked: false,
      large_clicked: true,
      image_class: 'large-image',
    })
  }

  render() {
    const image_url = this.props.userData.base_url + this.state.image_data.url;
    const image_class = this.state.image_class+ " rounded mx-auto d-block";
    let render_image = (this.state.image_data !== '');

    return (
      <React.Fragment>
      {render_image ?
        <div onKeyDown={this.nextImage} className="image-container" tabIndex="-1">
          <ImageInfo imageData={this.state.image_data}/>
          {/*<SizeButton small={this.clickSmall} medium={this.clickMedium} large={this.clickLarge}/>*/}
          <SpecificImage image_url={image_url} image_data={this.state.image_data} />
          <Tag tags={this.state.image_data.tags} image_class={this.state.image_class}/>
        </div>
        : ''
      }
      </React.Fragment>
    );
  }
}


export default Image
