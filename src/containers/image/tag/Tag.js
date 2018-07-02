import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Tag.css'


class Tag extends Component {

  render() {
    console.log(this.props.tags);
    let tags = this.props.tags.map((tag) => {
      return <Link className="btn btn-success tag tag-text" to={"/category/" + tag}>{tag}</Link>
    });

    let tags_available = (this.props.tags.length > 0 && this.props.tags[0] !== "");

    return (
      <React.Fragment>
      {tags_available ?
          <div className="row">
            <div className="col-lg-12">
              Tags: {tags}
            </div>
          </div> : ''
      }
      </React.Fragment>
    );
  }
}

export default Tag
