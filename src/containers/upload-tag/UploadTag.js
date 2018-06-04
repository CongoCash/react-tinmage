import React, { Component } from 'react'

class UploadTag extends Component {

  render() {
    return (
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-2">
          <h2>Tags:</h2>
        </div>
        <div className="col-sm-3">
          <input id="input-tag" className="input" type="text" name="add-tag" onChange={this.props.inputTag.bind(this)}/>
          <button onClick={this.props.onCreateTag.bind(this)}>Create Tag</button>
        </div>
        <div className="col-sm-5">
          {this.props.tags.map((tag) => {
              return <button className="btn btn-primary tag-button"
                             onClick={this.props.onTagDelete.bind(this)} value={tag}>{tag}</button>
            }
          )}
        </div>
      </div>
    );
  }
}


export default UploadTag