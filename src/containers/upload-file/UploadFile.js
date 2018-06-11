import React, { Component } from 'react'
require('./UploadFile.css')

class UploadFile extends Component {

  render() {
    return (
      <div>
        {
          this.props.upload_error ?
            <div className="row">
              <div className="col-lg-12">
                <h3 className="text-center">You can only upload images.</h3>
              </div>
            </div>:
            ""
        }
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <form className="width-100">
              <label className="select-file width-100" for="default-upload">
                <div className="btn btn-primary btn-lg upload-buttons">Select File or Drag and Drop</div>
              </label>
              <input id="default-upload" type="file" name="selectedFile" onChange={this.props.onChange.bind(this)}/>
            </form>
          </div>
          <div className="col-lg-4"></div>
        </div>
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <img id="preview"/>
          </div>
        </div>

      </div>
    );
  }
}


export default UploadFile
