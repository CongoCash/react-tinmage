import React, { Component } from 'react'
import ImagesModel from '../../models/Image.js'
import './Category.css';
import axios from 'axios'

class Start extends Component {

  constructor(){
    super()
    this.state = {
      images: [],
      like: 0,
      dislike: 0,
      image_index: 0,
      upvote: "http://www.clker.com/cliparts/0/7/4/2/1206569735140917528pitr_green_arrows_set_1.svg.hi.png",
      downvote: "http://www.clker.com/cliparts/e/a/c/a/12065697821256125215pitr_red_arrows_set_5.svg.hi.png",
      hovering_like: false,
      hovering_dislike: false,
      error_message: '',
      tag: ""
    }
  }

  componentWillMount(){
    this.getImages(this.props);
    console.log('component has mounted');
  }

  componentWillReceiveProps(nextProps) {
    console.log('entering componentWillReceiveProps');
    this.getImages(nextProps);
    console.log(nextProps.match.params.tag);
    console.log('leaving componentWillReceiveProps');
  }

  getImages(props) {
    console.log('enter getImages');
    console.log(props.match.params.tag);
    if (!props.match.params.tag) {
      console.log("get all")
      ImagesModel.getAll().then((res) => {
        this.setState({
          images: res.data,
          image_index: 0,
          error_message: '',
          tag: ''
        })
      })
    }
    else {
      console.log('enter getTags');
      ImagesModel.getTags('/api/images/tags/', props.match.params.tag)
      .then((res) => {
        if (res.data.length > 0) {
          console.log('inside a real tag');
          console.log(this.state);
          this.setState({
            images: res.data,
            image_index: 0,
            error_message: '',
            tag: props.match.params.tag
          }, () => {console.log(this.state)})
        }
        else {
          console.log('not inside a real tag')
          this.setState({
            images: res.data,
            image_index: 0,
            error_message: 'Cannot find any images under this tag',
            tag: ''
          }, () => {console.log("state sent in not real tag")})
        }
      })
    }
  }

  handleLike(e) {
    console.log(this.props.userData);
    ImagesModel.postRating(this.props.userData.username, this.state.images[this.state.image_index].id, "like");

    if (this.state.image_index < this.state.images.length-1) {
      this.setState({
        like: this.state.like + 1,
        image_index: this.state.image_index + 1,
      })
    }
    else {
      this.setState({
        like: this.state.like + 1,
        image_index: 0
      })
    }
  }

  handleDislike(e) {
    this.setState({
      dislike: this.state.dislike + 1,
      image_index: this.state.image_index + 1,
    })
  }

  hoverLike(e) {
    this.setState({
      hovering_like: true
    })
  }

  hoverDislike(e) {
    console.log('hovering over dislike')
    this.setState({
      hovering_dislike: true
    })
  }

  leaveHoverLike(e) {
    this.setState({
      hovering_like: false
    })
  }

  leaveHoverDislike(e) {
    console.log('leave hover dislike')
    this.setState({
      hovering_dislike: false
    })
  }


  render() {
    let upvote = null;
    let downvote = null;
    let content = null;
    if (this.state.hovering_like) {
      upvote = <img src={this.state.upvote} width="100" height="100" className="upvote" onClick={this.handleLike.bind(this)}
                    onMouseEnter={this.hoverLike.bind(this)} onMouseLeave={this.leaveHoverLike.bind(this)}/>
    }
    if (this.state.hovering_dislike) {
      downvote = <img src={this.state.downvote} width="100" height="100" className="downvote" onClick={this.handleLike.bind(this)}
                      onMouseEnter={this.hoverDislike.bind(this)} onMouseLeave={this.leaveHoverDislike.bind(this)}/>
    }

    if (this.state.error_message.length == 0) {
      content = true
    }
    else {
      content = false
    }
    let image = <img src="" width="500" height="600" useMap="#voting"/>;

    if (this.state.images.length > 0) {
      image = <img src={this.props.userData.base_url + "/" + this.state.images[this.state.image_index].url} width="500" height="600" useMap="#voting"/>
    }

    return (
      <div key={this.props.match.params.tag} className="container">
        {content ?
          <div>
            <div className="row">
              <div className="col-sm-12">
                <div className="image-container">
                  {image}
                </div>
                <map name="voting">
                  <area shape="rect" coords="0,0,250,600" onClick={this.handleLike.bind(this)}
                        onMouseEnter={this.hoverLike.bind(this)} onMouseLeave={this.leaveHoverLike.bind(this)}/>
                  <area shape="rect" coords="250,0,500,600" onClick={this.handleDislike.bind(this)}
                        onMouseEnter={this.hoverDislike.bind(this)} onMouseLeave={this.leaveHoverDislike.bind(this)}/>
                </map>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                {upvote}
                {downvote}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <h3>{this.state.like}</h3>
              </div>
              <div className="col-sm-6">
                <h3>{this.state.dislike}</h3>
              </div>
            </div>
          </div>
          : <div>{this.state.error_message}</div>}
      </div>
    )
  }
}

export default Start