import React, { Component } from 'react'
import './CategoryImage.css'


class CategoryImage extends Component {

  constructor(){
    super();
    this.state = {
      width: 500,
      height: 500
    };
    this.updateDimensions = this.updateDimensions.bind(this);
    this.image_container = React.createRef()
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    console.log('test');
    this.setState({
      width: this.image_container.current.offsetWidth * 0.9,
      height: this.props.image.height/this.props.image.width * this.image_container.current.offsetWidth * 0.9,
    })
    // else {
    //   this.setState({
    //     width: this.props.image.width,
    //     height: this.props.image.height
    //   })
    // }
  }

  render() {
    console.log(this.props.base_url + this.props.image.url);
    return (
      <React.Fragment>
          <div ref={this.image_container} className="col-lg-3">
            <img src={this.props.base_url + this.props.image.url} height={this.state.height} width={this.state.width}/>
          </div>
      </React.Fragment>

    )
  };
}

export default CategoryImage
