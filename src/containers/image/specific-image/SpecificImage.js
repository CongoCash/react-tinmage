import React, { Component } from 'react'
require('./SpecificImage.css')

class SpecificImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: '',
      height: ''
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
    if (this.props.image_data.width >= this.image_container.current.offsetWidth * 0.9) {
      this.setState({
        width: this.image_container.current.offsetWidth * 0.9,
        height: this.props.image_data.height/this.props.image_data.width * this.image_container.current.offsetWidth * 0.9,
      })
    }
    else {
      this.setState({
        width: this.props.image_data.width,
        height: this.props.image_data.height
      })
    }
  }

  render() {
    let image_render = this.state.width !== '';
    console.log('specific image rendering');
    console.log(this.props.image_data.height/this.props.image_data.width + ' ratio');
    console.log(this.state.height);
    console.log(this.state.width);
    return (
      <div className="row image-margin">
        <div ref={this.image_container} className="col-sm-12 center">
          <React.Fragment>
            {
              image_render ?
               <img src={this.props.image_url} height={this.state.height} width={this.state.width} />
                :
                ""
            }
          </React.Fragment>
        </div>
      </div>
    );
  }
}


export default SpecificImage
