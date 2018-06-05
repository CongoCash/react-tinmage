import React, { Component } from 'react'
import './ImageInfo.css'

class ImageInfo extends Component {



  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-12 text-center title">
            <h2>{this.props.imageData.title}</h2>
          </div>
        </div>
        <div className="row">
          {this.props.imageData.username.length > 0 ?
            <h6 className="col-sm-12 text-center">Uploaded by {this.props.imageData.username} on {this.props.imageData.upload_date}</h6>
            :
            <h4 className="col-sm-12 text-center">Uploaded on {this.props.imageData.upload_date}</h4>
          }
        </div>
      </div>
    );
  }
}


export default ImageInfo
