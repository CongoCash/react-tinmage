import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Tag.css'


class Tag extends Component {

  render() {
    let tags = this.props.tags.map((tag, index) => {
      return <Link className="btn btn-success tag tag-text" to={"/category/" + tag} key={index}>{tag}</Link>
    });

    let tags_available = (this.props.tags.length > 0 && this.props.tags[0] !== "");

    return (
      <React.Fragment>
      {tags_available ?
          <div className="row">
            <div className="col-lg-12">
              <h4>Tags: </h4>{tags}
            </div>
          </div> : ''
      }
      </React.Fragment>
    );
  }
}

export default Tag
