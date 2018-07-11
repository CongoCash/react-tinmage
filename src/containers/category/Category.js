import React, { Component } from 'react'
import ImagesModel from '../../models/Image.js'
import CategoryImage from '../category-image/CategoryImage'
import Pagination from "react-js-pagination";
import './Category.css'

class Category extends Component {

  constructor(){
    super();
    this.state = {
      images: '',
      image_length: 0,
      image_index: 0,
      error_message: '',
      tag: '',
      start_row: true,
      active_page: 1,
      page_range: 2
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.image_container = React.createRef()
  }

  componentWillReceiveProps(nextProps) {
    this.getImages(nextProps);
  }

  componentDidMount() {
    this.getImages(this.props);

    //setup blank image to hide default drag image
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    img.onload = () => this.setState({ drag_image: img });
  }

  getImages(props) {
    ImagesModel.getTags('api/images/tags/', props.match.params.tag)
    .then((res) => {
      if (res.data.length > 0) {
        this.setState({
          image_length: res.data.length
        });
        let image_array = [];
        let image_holder = [];
        res.data.forEach((value, index) => {
          if (index%6 === 0 && index !== 0) {
            image_array.push(image_holder);
            image_holder = [];
          }
          image_holder.push(value);
          if (index === res.data.length-1) {
            image_array.push(image_holder);
          }
        });
        this.setState({
          images: image_array,
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

  handlePageChange(pageNumber) {
    console.log('here');
    console.log(`active page is ${pageNumber}`);
    this.setState({active_page: pageNumber}, () => {

    });
  }

  render() {
    let images_available = (this.state.images.length > 0 && this.state.image_index < this.state.images.length);
    let all_images = '';
    let page_images = '';

    if (images_available) {
      all_images = this.state.images.map((image) => {
        return (
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="category-container col-lg-10">
              <div className="row">
                {
                  image.map((inner_image) => {
                    return (
                      <CategoryImage base_url={this.props.userData.base_url} image={inner_image}/>
                    )
                  })
                }
              </div>
            </div>
            <div className="col-lg-1"></div>
          </div>

        )
      });
      page_images = all_images.slice((this.state.active_page-1)*this.state.page_range,
        (this.state.active_page-1)*this.state.page_range +  this.state.page_range)
    }

    return (
          <div className="col category-margin">
            {images_available ?
              <React.Fragment>
                {page_images}
                <div className="row">
                  <div className="col center">
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={12}
                      totalItemsCount={this.state.image_length}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                    />
                  </div>
                </div>
              </React.Fragment>
              : <h1>Nothing left here, check out some other categories!</h1>
            }
          </div>

    )
  };
}

export default Category
