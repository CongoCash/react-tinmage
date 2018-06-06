import React, { Component } from 'react'
require('./UploadTag.css')

class UploadTag extends Component {

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <h4>{this.props.tagError}</h4>
            <input id="input-tag" className="input-tag" type="text" name="add-tag"
                   onChange={this.props.inputTag.bind(this)} placeholder="Tag"/>
            <button className="create-tag btn" onClick={this.props.onCreateTag.bind(this)}>Add</button>
          </div>
          <div className="col-md-4"></div>
        </div>

        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            {this.props.tags.map((tag) => {
                return <button className="btn btn-primary tag-button"
                               onClick={this.props.onTagDelete.bind(this)} value={tag}>{tag}</button>
              }
            )}
          </div>
        </div>
      </div>

    );
  }
}


export default UploadTag
