import React, { Component } from 'react'

class BottomImage extends Component {
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
    return (
      <img className="bottom-image" height={this.props.height} width={this.props.width}
           src={this.props.bottom_image_data.url}
      />
    )
  }
}

export default BottomImage
