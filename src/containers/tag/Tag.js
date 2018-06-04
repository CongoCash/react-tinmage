import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Tag.css'


class Tag extends Component {



  render() {
    let tags = this.props.tags.map((tag) => {
      return <div className="btn btn-success"><Link className="tag-text" to={"/category/" + tag}>{tag}</Link></div>
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            {tags}
          </div>
        </div>
      </div>
    );
  }
}


export default Tag