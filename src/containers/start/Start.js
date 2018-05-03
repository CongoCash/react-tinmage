import React, { Component } from 'react'
import ImagesModel from '../../models/Image.js'
import './Start.css';

class Start extends Component {

  constructor(){
    super()
    this.state = {
      images: [],
      like: 0,
      dislike: 0,
      image_index: 0,
      current_image_url: "",
      upvote: "http://www.clker.com/cliparts/0/7/4/2/1206569735140917528pitr_green_arrows_set_1.svg.hi.png",
      downvote: "http://www.clker.com/cliparts/e/a/c/a/12065697821256125215pitr_red_arrows_set_5.svg.hi.png",
      hovering_like: false,
      hovering_dislike: false
    }
  }

  componentWillMount(){
    this.fetchData()
  }

  fetchData(){
    ImagesModel.getAll().then((res) => {
      this.setState({
        images: res.data,
        current_image_url: res.data[this.state.image_index].url
      }, function() {
        console.log(this.state.current_image_url)
      })
    })
  }

  returnImage(e) {
    this.setState({
      current_image_url: this.state.images[this.state.image_index].url
    })
  }

  handleLike(e) {
    this.setState({
      like: this.state.like + 1,
      image_index: this.state.image_index + 1
    }, function() {
      this.setState({
        current_image_url: this.state.images[this.state.image_index].url
      })
    })
  }

  handleDislike(e) {
    this.setState({
      dislike: this.state.dislike + 1,
      image_index: this.state.image_index + 1,
    }, function () {
      this.setState({
        current_image_url: this.state.images[this.state.image_index].url
      })
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
    let upvote = null
    let downvote = null
    console.log(this.state.hovering_like)
    if (this.state.hovering_like) {
      upvote = <img src={this.state.upvote} width="100" height="100" className="upvote" onClick={this.handleLike.bind(this)}
                    onMouseEnter={this.hoverLike.bind(this)} onMouseLeave={this.leaveHoverLike.bind(this)}/>
    }
    if (this.state.hovering_dislike) {
      downvote = <img src={this.state.downvote} width="100" height="100" className="downvote" onClick={this.handleDislike.bind(this)}
                      onMouseEnter={this.hoverDislike.bind(this)} onMouseLeave={this.leaveHoverDislike.bind(this)}/>
    }
    console.log(downvote)


      return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="image-container">
              <img src={this.props.userData.base_url + "/" + this.state.current_image_url} width="500" height="600" useMap="#voting"/>
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
    )
  }
}

export default Start