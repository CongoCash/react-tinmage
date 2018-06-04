import React, { Component } from 'react'

class UploadTitle extends Component {

  render() {
    return (
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-2">
          <h2>Title:</h2>
        </div>
        <div className="col-sm-8">
          <input
            id="input-title"
            className="input"
            type="text"
            name="title"
            onChange={this.props.onChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}


export default UploadTitle