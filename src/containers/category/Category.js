import React, { Component } from 'react'
import ImagesModel from '../../models/Image.js'
import TopImage from '../top-image/TopImage'
import ImageInfo from '../image/image-info/ImageInfo.js'
import './Category.css'
import {Link} from 'react-router-dom'


class Category extends Component {

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
    };
    this.swiped = this.swiped.bind(this);
    this.initialLocation = this.initialLocation.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.dragImage = this.dragImage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.getImages(nextProps);
  }

  componentDidMount() {
    console.log('component did mount');
    this.getImages(this.props);

    //setup blank image to hide default drag image
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    img.onload = () => this.setState({ drag_image: img });
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

  dragImage(e) {
    console.log('setting ghost');
    e.dataTransfer.setDragImage(this.state.drag_image, 0, 0);
  }

  swiped(e) {
    console.log('swiping');

    this.setState({
      dragging: true,
    });

    e.persist();

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
    console.log('finished dragging');
    e.persist();
    let dragged_distance = e.clientX - this.state.initial_x
    //image returned to original location because it has not passed drag threshold
    if (this.state.dragging === true && (Math.abs(dragged_distance) < e.target.width/2)) {
      e.target.style = ""
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
        console.log('incrementing index');
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
  }

  handleLike(e) {

    if (this.state.images.length > 0) {
      ImagesModel.postRating(this.props.userData.user_id, this.state.images[this.state.image_index].id, "like");

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
      ImagesModel.postRating(this.props.userData.user_id, this.state.images[this.state.image_index].id, "dislike");

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

    if (top_image_data && top_image_data.User) {
      console.log(top_image_data);
    }
    console.log('rendering');
    return (
          <React.Fragment>
            {images_available ?
              <React.Fragment>
                  <ImageInfo imageData={top_image_data}/>

                  {top_image ?
                    <TopImage base_url={this.props.userData.base_url} image_data={top_image_data}
                              swiped={this.swiped} dragImage={this.dragImage}
                              initialLocation={this.initialLocation} dragEnd={this.dragEnd}
                              bottom_image={bottom_image} bottom_image_data={bottom_image_data}
                    />
                    : ""
                  }

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
              </React.Fragment>
              : <h1>Nothing left here, check out some other categories!</h1>
            }
          </React.Fragment>

    )
  };
}

export default Category
