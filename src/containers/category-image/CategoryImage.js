import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './CategoryImage.css'

class CategoryImage extends Component {

  constructor(){
    super();
    this.state = {
      width: 500,
      height: 500,
      modal_open: false,
      modal_image: '',
      modal_css: '',
      image_css: ''
    };
    this.updateDimensions = this.updateDimensions.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.image_container = React.createRef();
    this.modal = React.createRef();
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    this.setState({
      width: this.image_container.current.offsetWidth * 0.9,
      height: this.image_container.current.offsetWidth * 0.9
    })
  }

  openModal(e) {
    let image_height = '';
    let image_width = '';
    if (this.props.image.width > window.innerWidth*0.5) {
      image_width = window.innerWidth*0.5;
      image_height = this.props.image.height/this.props.image.width * window.innerWidth*0.5
    }
    else {
      image_width = this.props.image.width;
      image_height = this.props.image.height;
    }
    this.setState({
      modal_open: true,
      modal_image: e.target.src,
      modal_css: {
        display: 'block',
      },
      image_css: {
        height: image_height,
        width: image_width,
        margin: 'auto',
        border: 'solid white 1px'
      }
    })
  }

  closeModal(e) {
    this.setState({
      modal_open: false,
      modal_image: '',
      modal_css: {
        display: 'none'
      },
      image_css: ''
    })
  }

  render() {
    let open_modal = this.state.modal_open;
    let bg = {backgroundColor: "grey"};

    return (
      <React.Fragment>
        <div ref={this.image_container} className="col-lg-2 category-image-position">
          <img onClick={this.openModal} className="category-image"
               src={this.props.base_url + this.props.image.url} height={this.state.height} width={this.state.width}/>
        </div>

        {open_modal ?
          <div id="myModal" className="modal" ref="modal1" style={this.state.modal_css}>

            <div className="modal-content">
              <div className="container">
                <div className="row">
                  <div className="col-lg-2"></div>
                  <div className="col-lg-8">
                    <h2 className="modal-title">{this.props.image.title}</h2>
                  </div>
                  <div className="col-lg-2">
                    <span onClick={this.closeModal} className="close">&times;</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col center">
                    <img src={this.state.modal_image} style={this.state.image_css} />
                  </div>
                </div>
                <div className="row">
                  <div className="col center">
                    <Link to={"/images/" + this.props.image.id}>
                      <button className="btn details">Detail Page</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
        ""
        }

      </React.Fragment>

    )
  };
}

export default CategoryImage
