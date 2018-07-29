import React, { Component } from 'react'
require('./UploadTitle.css');

class UploadTitle extends Component {

  render() {
    return (
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <input
            id="input-title"
            className="input"
            type="text"
            name="title"
            onChange={this.props.onChange.bind(this)}
            placeholder="Title"
          />
        </div>
      </div>
    );
  }
}


export default UploadTitle
