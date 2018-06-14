import React, { Component } from 'react'
import './ImageInfo.css'

class ImageInfo extends Component {



  render() {
    console.log(this.props.imageData);
    return (
      <React.Fragment>
        {this.props.imageData !== '' ?
        <React.Fragment>
          <div className="row">
            <div className="col-sm-12 text-center title">
              <h2>{this.props.imageData.title}</h2>
            </div>
          </div>
          <div className="row">
            {this.props.imageData.User !== null ?
              <h6 className="col-sm-12 text-center">Uploaded by {this.props.imageData.User.username} on {this.props.imageData.updatedAt.substring(0,10)}</h6>
              :
              <h4 className="col-sm-12 text-center">Uploaded on {this.props.imageData.updatedAt.substring(0,10)}</h4>
            }
          </div>
        </React.Fragment>
      :
      ''
      }
      </React.Fragment>
    );
  }
}


export default ImageInfo
