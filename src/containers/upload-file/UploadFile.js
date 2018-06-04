import React, { Component } from 'react'

class UploadFile extends Component {

  render() {
    return (
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-2">
          <h2>Select File: </h2>
        </div>
        <div className="col-sm-2">
          <form>
            <label for="default-upload">
              <div className="btn btn-primary btn-lg">Select File</div>
            </label>
            <input id="default-upload" type="file" name="selectedFile" onChange={this.props.onChange.bind(this)}/>
          </form>
        </div>
        <div className="col-sm-6">
          <h3>{this.props.fileName}</h3>
        </div>
      </div>
    );
  }
}


export default UploadFile