import React, { Component } from 'react'
import BottomImage from '../bottom-image/BottomImage'

class TopImage extends Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }


  render() {
    console.log('rendering');
    let image_ratio = this.props.image_data.height/this.props.image_data.width;
    let image_width = window.innerWidth * 0.25;
    if (image_width < 250) {
      image_width = 250;
    }
    let image_height = image_ratio * image_width;
    let image_dim = {
      image_height: image_height,
      image_width: image_width,
    };
    console.log(image_ratio);
    console.log(image_dim);
    console.log(this.props.image_data.url);
    return (
      <React.Fragment>
        <div className="row" style={{height: image_dim.image_height}}>
          <div className="col-lg-12">
            <img className="top-image" height={image_dim.image_height} width={image_dim.image_width} align="middle"
                 src={this.props.base_url + this.props.image_data.url}
                 onDrag={this.props.swiped.bind(this)} onDragStart={this.props.dragImage.bind(this)}
                 onMouseDown={this.props.initialLocation.bind(this)} onDragEnd={this.props.dragEnd.bind(this)}
            />
            {this.props.bottom_image ?
              <BottomImage bottom_image_data={this.props.bottom_image_data} height={image_dim.image_height}
                           width={image_dim.image_width} base_url={this.props.base_url}
              />
              :
              ""
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default TopImage
