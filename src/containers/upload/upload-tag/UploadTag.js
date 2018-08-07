import React, { Component } from 'react'
require('./UploadTag.css')

class UploadTag extends Component {

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col">
            <h4>{this.props.tagError}</h4>
            <input id="input-tag" className="input-tag" type="text" name="add-tag"
                   onChange={this.props.inputTag.bind(this)} placeholder="Tag"/>
            <button className="create-tag" onClick={this.props.onCreateTag.bind(this)}>Add</button>
          </div>
          <div className="col-lg-2"></div>
        </div>

        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col">
            {this.props.tags.map((tag, index) => {
                return <button className="btn btn-primary tag-button"
                               onClick={this.props.onTagDelete.bind(this)} value={tag} key={index}>{tag}</button>
              }
            )}
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>

    );
  }
}


export default UploadTag
