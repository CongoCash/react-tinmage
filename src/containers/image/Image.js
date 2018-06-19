import React, { Component } from 'react'
import axios from 'axios'
import './Image.css'
import Tag from './tag/Tag'
import ImageInfo from './image-info/ImageInfo'
import SizeButton from './size-buttons/SizeButton'
import SpecificImage from './specific-image/SpecificImage'


class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image_class: 'medium-image',
      small_clicked: false,
      medium_clicked: true,
      large_clicked: false,
      image_data: '',
      width: '',
      height: '',
      image_id: this.props.match.params.id
    };
    this.nextImage = this.nextImage.bind(this);
    this.clickSmall = this.clickSmall.bind(this);
    this.clickMedium = this.clickMedium.bind(this);
    this.clickLarge = this.clickLarge.bind(this);
  }

  componentDidMount() {
    axios.get(this.props.userData.base_url + "api/images/" + this.state.image_id).then((response) => {
      this.setState({
        image_data: response.data[0]
      }, () => {
        console.log(this.state.image_data);
      })
    })
  }

  //fix error that shows up when grabbing image_id that doesn't exist, either prevent or send them to image_id 1 or last id
  //also images are not resizing themselves, are taking the image ratio of the original image
  nextImage(e) {
    console.log(e.keyCode);
    if (e.keyCode === 37) {
      let image_id = parseInt(this.state.image_id) - 1;
      axios.get(this.props.userData.base_url + "api/images/" + image_id).then((response) => {
        this.setState({
          image_data: response.data[0],
          image_id: image_id
        }, () => {
          console.log(this.props.history);
          this.props.history.replace(this.state.image_id.toString());
        })
      })
    }
    else if (e.keyCode === 39) {
      let image_id = parseInt(this.state.image_id) + 1;
      console.log(image_id);
      axios.get(this.props.userData.base_url + "api/images/" + image_id).then((response) => {
        this.setState({
          image_data: response.data[0],
          image_id: image_id
        }, () => {
          console.log(this.props.history);
          this.props.history.replace(this.state.image_id.toString());
        })
      })
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
