import React, { Component } from 'react'
import ImagesModel from '../../models/Image.js'
import './Category.css'
import ReactSwipeEvents from 'react-swipe-events'


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
  }

  componentWillReceiveProps(nextProps) {
    this.getImages(nextProps);
  }

  getImages(props) {
    if (!props.match.params.tag) {
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
      ImagesModel.getTags('/api/images/tags/', props.match.params.tag)
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            images: res.data,
            image_index: 0,
            error_message: '',
            tag: props.match.params.tag
          })
        }
        else {
          this.setState({
            images: res.data,
            image_index: 0,
            error_message: 'Cannot find any images under this tag',
            tag: ''
          })
        }
      })
    }
  }

  handleLike(e) {
    if (this.state.images.length > 0) {
      ImagesModel.postRating(this.props.userData.user_id, this.state.images[this.state.image_index].id, "like");

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
  }

  handleDislike(e) {
    if (this.state.images.length > 0) {
      ImagesModel.postRating(this.props.userData.user_id, this.state.images[this.state.image_index].id, "dislike");

      if (this.state.image_index < this.state.images.length-1) {
        this.setState({
          dislike: this.state.dislike + 1,
          image_index: this.state.image_index + 1,
        })
      }
      else {
        this.setState({
          dislike: this.state.dislike + 1,
          image_index: 0
        })
      }
    }
  }

  hoverLike(e) {
    this.setState({
      hovering_like: true
    })
  }

  hoverDislike(e) {
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