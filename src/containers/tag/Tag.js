import React, { Component } from 'react'
import {Link} from 'react-router-dom'


class Tag extends Component {

  linkTag(e) {
    console.log(e.target.value);
    <Link to={"/category/" + e.target.value}/>
  }


  render() {
    let tags = this.props.tags.map((tag) => {
      return <button className="btn btn-primary tag-button" onClick={this.linkTag.bind(this)} value={tag}>{tag}</button>
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            {tags}
          </div>
        </div>
      </div>
    );
  }
}


export default Tag