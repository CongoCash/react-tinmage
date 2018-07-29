import React, { Component } from 'react'
import BottomImage from '../bottom-image/BottomImage'

class TopImage extends Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.updateDimensions = this.updateDimensions.bind(this);
    this.adjustDim = this.adjustDim.bind(this);
  }

  adjustDim() {
    let height = this.props.image_data.height;
    let width = this.props.image_data.width;
    let multiplier = 0.8;
    if ((height !== '' && height >= window.innerHeight * 0.25) ||
      (width !== '' && width >= window.innerWidth) * 0.25) {
      while (height >= window.innerHeight * 0.25 && width >= window.innerWidth) {
        multiplier -= 0.1;
        height = height*multiplier;
        width = width*multiplier;
        console.log(height);
        console.log(width);
      }
    }
    return {
      height: height,
      width: width
    }
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
    return (
      <React.Fragment>
        <div className="row" style={{height: this.adjustDim().height}}>
          <div className="col-lg-12">
            <img className="top-image" height={this.adjustDim().height} width={this.adjustDim().width} align="middle"
                 src={this.props.image_data.url}
                 onDrag={this.props.swiped.bind(this)} onDragStart={this.props.dragImage.bind(this)}
                 onMouseDown={this.props.initialLocation.bind(this)} onDragEnd={this.props.dragEnd.bind(this)}
            />
            {this.props.bottom_image ?
              <BottomImage bottom_image_data={this.props.bottom_image_data} height={this.adjustDim().height}
                           width={this.adjustDim().width}
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
