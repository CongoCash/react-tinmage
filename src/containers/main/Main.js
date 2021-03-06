import React, { Component } from 'react'
import ImagesModel from '../../models/Image.js'
import TopImage from '../top-image/TopImage'
import ImageInfo from '../image/image-info/ImageInfo.js'
import './Main.css'
import {Link} from 'react-router-dom'


class Main extends Component {

  constructor(){
    super()
    this.state = {
      images: [],
      like: 0,
      dislike: 0,
      image_index: 0,
      error_message: '',
      tag: '',
      initial_x: '',
      initial_y: '',
      top_image_class: '',
      bottom_image_class: '',
      dragging: false,
      drag_image: '',
      like_css: {
        opacity: ''
      },
      dislike_css: {
        opacity: ''
      },
      tutorial: false
    };
    this.swiped = this.swiped.bind(this);
    this.initialLocation = this.initialLocation.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.dragImage = this.dragImage.bind(this);
    this.closeTutorial = this.closeTutorial.bind(this);
    this.like = React.createRef();
    this.dislike = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    this.getImages(nextProps);
  }

  componentDidMount() {
    this.getImages(this.props);

    if (!localStorage.tutorial) {
      localStorage.tutorial = true
      this.setState({
        tutorial: true
      })
    }

    //setup blank image to hide default drag image
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    img.onload = () => this.setState({ drag_image: img });
  }

  getImages(props) {
    if (!props.match.params.tag) {
      console.log(this.props);
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
      ImagesModel.getTags('api/images/tags/', props.match.params.tag)
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

  closeTutorial() {
    localStorage.tutorial = false;
    this.setState({
      tutorial: false
    })
  }

  dragImage(e) {
    //sets the default drag image to a 1 pixel blank image
    e.dataTransfer.setDragImage(this.state.drag_image, 0, 0);
  }

  swiped(e) {
    this.setState({
      dragging: true,
      first_swipe: true
    });

    e.persist();

    let dragged_distance = e.clientX - this.state.initial_x;

    //fade in like and dislike text during swipe
    if (dragged_distance < 0) {
      this.setState({
        like_css: {
          opacity: Math.abs(dragged_distance)/(e.target.width/2),
          zIndex: 15
        }
      })
    }

    else if (dragged_distance > 0) {
      this.setState({
        dislike_css: {
          opacity: Math.abs(dragged_distance)/(e.target.width/2)
        }
      })
    }

    if (e.clientX !== 0) {
      e.target.style.left = (e.clientX - this.state.initial_x) + "px";
      e.target.style.top = (e.clientY - this.state.initial_y) + "px";
    }
  }

  initialLocation(e) {
    //sets initial location after clicking on image
    this.setState({
      initial_x: e.clientX,
      initial_y: e.clientY
    })
  }

  dragEnd(e) {
    e.persist();
    let dragged_distance = e.clientX - this.state.initial_x;
    //image returned to original location because it has not passed drag threshold
    if (this.state.dragging === true && (Math.abs(dragged_distance) < e.target.width/2)) {
      e.target.style = "";
      this.setState({
        dragging: false
      })
    }
    else if (this.state.dragging === true && (Math.abs(dragged_distance) >= e.target.width/2)) {

      if (dragged_distance === Math.abs(dragged_distance)) {
        this.handleLike();
      }
      else {
        this.handleDislike();
      }
      //if image dragged passed threshold and no more images, currently resets back to image 0, currently not in use
      if (this.state.images.length <= this.state.image_index-1) {
        this.setState({
          dragging: false,
          image_index: 0
        }, () => {
          e.target.style.left = 0 + "px";
          e.target.style.top = 0 + "px";
        });
      }
      //increment to next image
      else {
        let next_image_index = this.state.image_index + 1;
        this.setState({
          dragging: false,
          image_index: next_image_index
        }, () => {
          e.target.style.left = "";
          e.target.style.top = "";
        })
      }
    }

    //reset like and dislike opacity to 0
    this.setState({
      like_css: {
        opacity: 0
      },
      dislike_css: {
        opacity: 0
      }
    })
  }

  handleLike(e) {

    if (this.state.images.length > 0) {
      ImagesModel.postRating(this.props.userData.user_id, this.state.images[this.state.image_index].id, "like")
      .then(function(response) {
        console.log(response);
      });

      if (this.state.image_index < this.state.images.length-1) {
        this.setState({
          image_index: this.state.image_index + 1,
        })
      }
      else {
        this.setState({
          image_index: 0
        })
      }
    }
  }

  handleDislike(e) {
    if (this.state.images.length > 0) {
      ImagesModel.postRating(this.props.userData.user_id, this.state.images[this.state.image_index].id, "dislike")
      .then(function(response) {
        console.log(response);
      });

      if (this.state.image_index < this.state.images.length-1) {
        this.setState({
          image_index: this.state.image_index + 1,
        })
      }
      else {
        this.setState({
          image_index: 0
        })
      }
    }
  }

  render() {
    let images_available = (this.state.images.length > 0 && this.state.image_index < this.state.images.length);
    let top_image = (this.state.image_index < this.state.images.length);
    let bottom_image = (this.state.image_index+1 < this.state.images.length);
    let top_image_data = this.state.images[this.state.image_index];
    let bottom_image_data = this.state.images[this.state.image_index+1];

    return (
          <React.Fragment>
            {images_available ?
              <React.Fragment>
                <div className="col">
                  {this.state.tutorial ?
                    <div className="row">
                      <div className="col tutorial-modal">
                        <div className="row">
                          <div className="col-lg-3"></div>
                          <div className=" col-lg-6 tutorial-content">
                            <span onClick={this.closeTutorial} className="close">&times;</span>
                            <h4 className="tutorial-text">Swiping left on the image to add it to your favorites.</h4>
                            <h4 className="tutorial-text">Swiping right on the image will dislike it.</h4>
                            <h4 className="tutorial-text">The more images you swipe, the better your recommended section
                              will be.</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    :
                    "hellooo"
                  }
                  <div className="row">
                    <div className="col-lg-12 center">
                      <h2>{top_image_data.title}</h2>
                    </div>
                  </div>

                  {top_image ?
                    <div className="row">
                      <div className="col-lg-2">
                        <h1 ref={this.like} className="like-text" style={this.state.like_css}>Like</h1>
                      </div>
                      <div className="col-lg-8">
                        <TopImage image_data={top_image_data}
                                  swiped={this.swiped} dragImage={this.dragImage}
                                  initialLocation={this.initialLocation} dragEnd={this.dragEnd}
                                  bottom_image={bottom_image} bottom_image_data={bottom_image_data}
                        />
                      </div>
                      <div className="col-lg-2">
                        <h1 ref={this.dislike} className="dislike-text" style={this.state.dislike_css}>Dislike</h1>
                      </div>
                    </div>
                    : ""
                  }

                  <div className="row">
                    <div className="col-lg-12 center">
                      <Link to={"/images/" + this.state.images[this.state.image_index].id}>
                        <button className="btn details">Detail Page</button>
                      </Link>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12 align-tag">
                      {top_image_data.tags.map((tag, index) => {
                        if (tag !== "") {
                          return (
                            <Link to={"/category/" + tag}>
                              <button className="btn btn-secondary category-tag">
                                {tag}
                              </button>
                            </Link>)
                        }
                      })}
                    </div>
                  </div>
                </div>
              </React.Fragment>
              :
              <div className="col">
                <h1>Nothing left here, check out some other categories!</h1>
              </div>
            }
          </React.Fragment>

    )
  };
}

export default Main
