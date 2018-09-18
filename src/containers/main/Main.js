import React, { Component } from 'react'
import ImagesModel from '../../models/Image.js'
import TagModel from '../../models/Tag'
import TopImage from '../top-image/TopImage'
import './Main.css'
import {Link} from 'react-router-dom'


class Main extends Component {

  constructor(){
    super();
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
      tutorial: false,
      offset: 0,
      refresh_images: false
    };
    this.swiped = this.swiped.bind(this);
    this.initialLocation = this.initialLocation.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.dragImage = this.dragImage.bind(this);
    this.closeTutorial = this.closeTutorial.bind(this);
    this.adjustDim = this.adjustDim.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
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

    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }


  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  getImages(props) {
    if (!props.match.params.tag) {
      ImagesModel.getMain(props.userData.user_id, this.state.offset).then((res) => {
        this.setState({
          images: res.data,
          image_index: 0,
          error_message: '',
          tag: ''
        })
      })
        .catch((error) => {
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

    let clientX = '';
    let clientY = '';


    if (e.clientX || e.clientX === 0) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    else if (e.touches[0].clientX) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

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
      e.target.style.left = (clientX - this.state.initial_x) + "px";
      e.target.style.top = (clientY - this.state.initial_y) + "px";
    }
  }

  initialLocation(clientX, clientY) {

    //sets initial location after clicking on image
    this.setState({
      initial_x: clientX,
      initial_y: clientY
    })
  }



  dragEnd(e) {
    e.persist();


    let dragged_distance = parseFloat(e.target.style.left.split("px")[0]);

    //image returned to original location because it has not passed drag threshold
    if (this.state.dragging === true && (Math.abs(dragged_distance) < e.target.width/2)) {
      e.target.style = "";
      this.setState({
        dragging: false
      })
    }
    else if (this.state.dragging === true && (Math.abs(dragged_distance) >= e.target.width/2)) {
      if (dragged_distance === Math.abs(dragged_distance)) {
        this.handleDislike();
      }
      else {
        this.handleLike();
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
      let tag = this.state.images[this.state.image_index].tags;
      ImagesModel.postRating(this.props.userData.user_id, this.state.images[this.state.image_index].id, tag, "like");

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
      let tag = this.state.images[this.state.image_index].tags;
      ImagesModel.postRating(this.props.userData.user_id, this.state.images[this.state.image_index].id, tag, "dislike");

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

  adjustDim() {
    let height = this.state.images[this.state.image_index].height;
    let width = this.state.images[this.state.image_index].width;
    let multiplier = 0.8;
    if ((height !== '' && height >= window.innerHeight * 0.25) ||
      (width !== '' && width >= window.innerWidth) * 0.25) {
      while (height >= window.innerHeight * 0.25 && width >= window.innerWidth) {
        multiplier -= 0.1;
        height = height*multiplier;
        width = width*multiplier;
      }
    }
    return {
      height: height,
      width: width
    }
  }

  //move like/dislike to same row as title

  render() {
    let images_available = '';
    let top_image = '';
    let bottom_image = '';
    let top_image_data = '';
    let bottom_image_data = '';

    if (this.state.images.length > 0 && !Array.isArray(this.state.images[0])) {
      images_available = (this.state.images.length > 0 && this.state.image_index < this.state.images.length);
      top_image = (this.state.image_index < this.state.images.length);
      bottom_image = (this.state.image_index+1 < this.state.images.length);
      top_image_data = this.state.images[this.state.image_index];
      bottom_image_data = this.state.images[this.state.image_index+1];
    }

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
                        <h4 className="tutorial-text">This will help us serve you images you will like on the front page.</h4>
                      </div>
                    </div>
                  </div>
                </div>
                :
                ""
              }
              <div className="row margin-50">
                <div className="col-lg-2 col-4 center like-container">
                  <h1 ref={this.like} className="like-text" style={this.state.like_css}>Like</h1>
                </div>
                <div className="col-lg-8 col-4 center">
                  <h2>{top_image_data.title}</h2>
                </div>
                <div className="col-lg-2 col-4 center dislike-container">
                  <h1 ref={this.dislike} className="dislike-text" style={this.state.dislike_css}>Dislike</h1>
                </div>
              </div>

              {top_image ?
                <div className="row" style={{height: this.adjustDim().height + "px"}}>
                  <div className="col-lg-2 col-1">
                  </div>
                  <div className="col-lg-8 col-10">
                    <TopImage image_data={top_image_data}
                              swiped={this.swiped} dragImage={this.dragImage}
                              initialLocation={this.initialLocation} dragEnd={this.dragEnd}
                              bottom_image={bottom_image} bottom_image_data={bottom_image_data}
                    />
                  </div>
                  <div className="col-lg-2 col-1">
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
                  {top_image_data.tags.forEach((tag, index) => {
                      return (
                        <Link to={"/category/" + tag}>
                          <button className="btn btn-secondary category-tag">
                            {tag}
                          </button>
                        </Link>)
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
