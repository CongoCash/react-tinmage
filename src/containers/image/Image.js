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
      if (this.state.image_id > 1) {
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
        .catch((error) => {
          console.log("error");
        })
      }
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
      .catch((error) => {
        console.log(error);
      })
    }
  }

  render() {
    let render_image = (this.state.image_data !== '' && this.state.image_data);
    let image_url = '';
    if (render_image) {
      image_url = this.props.userData.base_url + this.state.image_data.url;
    }
    return (
      <React.Fragment>
      {render_image ?
        <div onKeyDown={this.nextImage} className="image-container" tabIndex="-1">
          <div className="row">
            <SpecificImage image_url={image_url} image_data={this.state.image_data} />
            <ImageInfo base_url={this.props.userData.base_url} imageData={this.state.image_data}/>
          </div>
        </div>
        : ''
      }
      </React.Fragment>
    );
  }
}


export default Image
