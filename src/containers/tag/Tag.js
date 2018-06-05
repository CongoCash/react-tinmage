import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Tag.css'


class Tag extends Component {



  render() {
    let tags = this.props.tags.map((tag) => {
      return <div className="btn btn-success tag"><Link className="tag-text" to={"/category/" + tag}>{tag}</Link></div>
    });

    let tags_available = (this.props.tags.length > 0 && this.props.tags[0] !== "");
    console.log(this.props.tags);

    return (
      <div>
      {tags_available ?
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              {tags}
            </div>
          </div> : ''
      }
      </div>
    );
  }
}


export default Tag