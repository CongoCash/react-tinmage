import React, { Component } from 'react'
import axios from 'axios'
import { Redirect} from 'react-router-dom'
import Image from '../image/Image'
require('./Upload.css')


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
      image_id: '',
      default_tags: ['funny', 'gif', 'sports', 'misc'],
      tags_clicked: {
        'funny': 0, 'gif': 0, 'sports': 0, 'misc': 0
      },
      tags: ['zzzmmm']
    };
    this.onTagSelected = this.onTagSelected.bind(this);
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

  onTagSelected = (e) => {
    let update_tag = this.state.tags_clicked;
    update_tag[e.target.value] = update_tag[e.target.value] + 1;
    if (update_tag[e.target.value] % 2 == 1) {
      e.target.style.backgroundColor = "red";
    }
    else {
      e.target.style.backgroundColor = "";

    }
    this.setState({
      update_tag
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    let tags_array = [];
    let push_tags = new Promise((resolve, reject) => {
      this.state.default_tags.forEach((tag) => {
        if (this.state.tags_clicked[tag] % 2 !== 0 && this.state.tags_clicked[tag] > 0) {
          tags_array.push(tag)
        }
      })
      resolve('it worked')
    })

    push_tags.then(() => {
      const { title, selectedFile, file_ext } = this.state;
      if (selectedFile && file_ext[selectedFile.name.split('.').pop()] == true) {
        console.log(tags_array);
        let formData = new FormData();

        formData.append('title', title);
        formData.append('selectedFile', selectedFile);
        formData.append('user_id', this.props.userData.user_id);
        formData.append('tags', tags_array);

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
    })
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
            {this.state.default_tags.map((tag) => {
              return <button onClick={this.onTagSelected} value={tag}>{tag}</button>
              }
            )}
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