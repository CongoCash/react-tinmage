import React, { Component } from 'react'
import axios from 'axios'
import { Redirect} from 'react-router-dom'
import Image from '../image/Image'


class Upload extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      selectedFile: '',
      file_ext: {
        bmp: true, dds: true, gif: true, jpg: true, png: true, psd: true, pspimage: true,
        tga: true, thm: true, tif: true, tiff: true, yuv: true
      },
      upload_error: false,
      upload_success: false,
      image_id: ''
    };
  }

  onChange = (e) => {
    const state = this.state;

    switch (e.target.name) {
      case 'selectedFile':
        state.selectedFile = e.target.files[0];
        break;
      default:
        state[e.target.name] = e.target.value;
    }

    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { title, selectedFile, file_ext } = this.state;
    if (selectedFile && file_ext[selectedFile.name.split('.').pop()] == true) {
      let formData = new FormData();

      formData.append('title', title);
      formData.append('selectedFile', selectedFile);
      formData.append('user_id', this.props.userData.user_id);

      axios.post('http://localhost:8000/api/upload', formData).then((response) => {
        console.log(response)
        this.setState({
          image_id: response.data.id,
          upload_error: false,
          upload_success: true
        }, () => {
          console.log(this.state)
        })
      });
    }
    else {
      this.setState({
        upload_error: true,
        upload_success: false
      })
    }
  }

  render() {
    const title = this.state.title;
    const upload_error = this.state.upload_error
    const redirect_url = "images/" + this.state.image_id
    console.log(redirect_url)
    return (
      <div>
        {!this.state.upload_success ?
          <div>
          {
            upload_error ?
              <h3>You can only upload images.</h3> :
              ""
          }
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              name="title"
              value={title}
              onChange={this.onChange}
            />
            <input
              type="file"
              name="selectedFile"
              onChange={this.onChange}
            />
            <button type="submit">Submit</button>
          </form>
          </div>
          : <Redirect to={redirect_url} />
        }
      </div>
    );
  }
}


export default Upload