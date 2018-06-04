import React, { Component } from 'react'

class SizeButton extends Component {

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <img src={this.props.image_url} className={this.props.image_class}/>
        </div>
      </div>
    );
  }
}


export default SizeButton