import React, { Component } from 'react'
import BottomImage from '../bottom-image/BottomImage'

class TopImage extends Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      touch: false,
      type: "none",
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

  startTouch = (e) => {
    e.preventDefault();
    this.setState({
      touch: true,
      type: "touching",
    });
    console.log('touching');
  };

  moveTouch = (e) => {
    e.preventDefault();
    this.setState({
      touch: true,
      type: "moving"
    });
    console.log('moving');
  };

  endTouch = (e) => {
    e.preventDefault();
    this.setState({
      touch: false,
      touch: "none"
    });
    console.log('ending');
  };

  startTouch = (e) => {
    console.log('start touch');
    let clientX = '';
    let clientY = '';
    if (e.clientX) {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    else if (e.touches) {
      console.log(e.touches);
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    this.props.initialLocation(clientX, clientY);
  };

  render() {

    return (
      <React.Fragment>
        <img className="top-image" height={this.adjustDim().height} width={this.adjustDim().width} align="middle"
             src={this.props.image_data.url} alt=""
             onDrag={this.props.swiped.bind(this)} onDragStart={this.props.dragImage.bind(this)}
             onMouseDown={this.startTouch} onDragEnd={this.props.dragEnd.bind(this)}
             onTouchStart={this.startTouch} onTouchMove={this.props.swiped.bind(this)} onTouchEnd={this.props.dragEnd.bind(this)}
        />
        {this.props.bottom_image ?
          <BottomImage bottom_image_data={this.props.bottom_image_data} height={this.adjustDim().height}
                       width={this.adjustDim().width}
          />
          :
          ""
        }
      </React.Fragment>
    )
  }
}

export default TopImage
