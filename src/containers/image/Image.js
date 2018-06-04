import React, { Component } from 'react'
import axios from 'axios'
import './Image.css'
import Tag from '../tag/Tag'


class Image extends Component {
  constructor() {
    super();
    this.state = {
      image_url: '',
      username: '',
      upload_date: '',
      image_class: 'medium-image',
      small_clicked: false,
      medium_clicked: true,
      large_clicked: false,
      title: '',
      tags: []
    };
    this.clickSmall = this.clickSmall.bind(this);
    this.clickMedium = this.clickMedium.bind(this);
    this.clickLarge = this.clickLarge.bind(this);
  }

  componentDidMount() {
    axios.get(this.props.userData.base_url + "api/images/" + this.props.match.params.id).then((response) => {
      if (response.data[0].User) {
        console.log(response.data[0]);
        this.setState({
          image_url: response.data[0].url,
          username: response.data[0].User.username,
          upload_date: response.data[0].createdAt.substring(0,10),
          title: response.data[0].title,
          tags: response.data[0].tags
        })
      }
      else {
        this.setState({
          image_url: response.data[0].url,
          username: '',
          upload_date: response.data[0].createdAt.substring(0,10),
          title: '',
          tags: []
        })
      }
    })
  }

  clickSmall() {
    this.setState({
      small_clicked: true,
      medium_clicked: false,
      large_clicked: false,
      image_class: 'small-image'
    })
  }

  clickMedium() {
    this.setState({
      small_clicked: false,
      medium_clicked: true,
      large_clicked: false,
      image_class: 'medium-image'
    })
  }

  clickLarge() {
    this.setState({
      small_clicked: false,
      medium_clicked: false,
      large_clicked: true,
      image_class: 'large-image'
    })
  }

  render() {
    const image_url = this.props.userData.base_url + this.state.image_url;
    const image_class = this.state.image_class+ " rounded mx-auto d-block";
    let username = this.state.username.length > 0

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <div className="row">
                {username ?
                  <h4 className="col-sm-12 text-center">Uploaded by {this.state.username} on {this.state.upload_date}</h4>
                  :
                  <h4 className="col-sm-12 text-center">Uploaded on {this.state.upload_date}</h4>
                }
            </div>
            <div className="row">
              <div className="col-sm-12 text-center">
                <h5>response.data[0].title</h5>
              </div>
            </div>
            <div className="row button-margin">
              <div className="col-sm-4">
                <button onClick={this.clickSmall} className="btn btn-primary btn-lg small-button">Small</button>
              </div>
              <div className="col-sm-4">
                <button onClick={this.clickMedium} className="btn btn-success btn-lg medium-button">Medium</button>
              </div>
              <div className="col-sm-4">
                <button onClick={this.clickLarge} className="btn btn-dark btn-lg large-button">Large</button>
              </div>
            </div>
          </div>
          <div className="col-sm-4"></div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <img src={image_url} className={image_class}/>
          </div>
        </div>
        <Tag tags={this.state.tags}/>
      </div>
    );
  }
}


export default Image