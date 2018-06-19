import React, { Component } from 'react'
require('./UploadFile.css')

class UploadFile extends Component {

  adjustDim() {
    let height = this.props.previewHeight;
    let width = this.props.previewWidth;
    let multiplier = 0.8;
    if ((this.props.previewHeight !== '' && this.props.previewHeight >= window.innerHeight * 0.8) ||
      (this.props.previewWidth !== '' && this.props.previewWidth >= window.innerWidth) * 0.8) {
      while (height >= window.innerHeight * 0.8 && width >= window.innerWidth) {
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

  render() {
    let height = this.adjustDim().height;
    let width = this.adjustDim().width;
    console.log(this.adjustDim());
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
          <div className="col-lg-12">
            <img id="preview" height={height} width={width}/>
          </div>
        </div>

      </div>
    );
  }
}


export default UploadFile
