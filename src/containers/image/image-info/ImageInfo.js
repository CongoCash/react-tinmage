import React, { Component } from 'react'
import './ImageInfo.css'
import Tag from '../tag/Tag'

class ImageInfo extends Component {

  copyUrl() {
    var url = document.createElement('input'),
      text = window.location.href;

    document.body.appendChild(url);
    url.value = text;
    url.select();
    document.execCommand('copy');
    document.body.removeChild(url);
  }

  //add download button/functionality, copy exact image functionality, and copy embed code functionality, fix category

  render() {
    return (
      <React.Fragment>
        {this.props.imageData !== '' ?
        <React.Fragment>
          <div className="col-lg-4 detail-margin">
            <div className="row">
              <div className="col-sm-12 text-center title">
                <h2>{this.props.imageData.title}</h2>
              </div>
            </div>
            <div className="row">
              {this.props.imageData.User !== null ?
                <h6 className="col-sm-12 text-center">Uploaded by {this.props.imageData.User.username} on {this.props.imageData.updatedAt.substring(0,10)}</h6>
                :
                <h6 className="col-sm-12 text-center">Uploaded on {this.props.imageData.updatedAt.substring(0,10)}</h6>
              }
              <hr className="width-100"/>
            </div>
            <Tag tags={this.props.imageData.tags}/>
            <div className="row">
              <div className="col-sm-12 left-align">
                <button onClick={this.copyUrl.bind(this)} className="btn copy-margin">Copy URL</button>
              </div>
            </div>
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
