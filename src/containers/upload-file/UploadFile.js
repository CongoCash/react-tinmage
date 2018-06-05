import React, { Component } from 'react'
require('./UploadFile.css')

class UploadFile extends Component {

  render() {
    return (
      <div>
        {
          this.props.upload_error ?
            <div className="row">
              <div className="col-md-12">
                <h3 className="text-center">You can only upload images.</h3>
              </div>
            </div>:
            ""
        }
        <div className="row align-middle-text">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <form>
              <label className="select-file" for="default-upload">
                <div className="btn btn-primary btn-lg button-width">Select File</div>
              </label>
              <input id="default-upload" type="file" name="selectedFile" onChange={this.props.onChange.bind(this)}/>
            </form>
          </div>
          <div className="col-md-4"></div>
        </div>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <h3>{this.props.fileName}</h3>
          </div>
        </div>
      </div>
    );
  }
}


export default UploadFile