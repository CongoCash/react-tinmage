import React, { Component } from 'react'
import axios from 'axios'
import { Redirect} from 'react-router-dom'
import UploadFile from '../upload-file/UploadFile'
import UploadTitle from '../upload-title/UploadTitle'
import UploadTag from '../upload-tag/UploadTag'
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
      tags: [],
      tags_clicked: {},
      new_tag: '',
      file_name: '',
      tag_error_message: ''
    };
    this.onTagDelete = this.onTagDelete.bind(this);
    this.onCreateTag = this.onCreateTag.bind(this);
  }

  onChange = (e) => {
    if (e.target.name === 'selectedFile') {
      if (e.target.files[0]) {
        this.setState({
          selectedFile: e.target.files[0],
          file_name: e.target.files[0].name
        }, () => {
          //adds a preview image upon selecting an image
          window.URL = window.URL || window.webkitURL;
          let preview = document.getElementById('preview');
          preview.src = window.URL.createObjectURL(this.state.selectedFile);
        })
      }
    }
    else if (e.target.name === "title") {
      this.setState({
        title: e.target.value
      })
    }

    else if (e.target.name === "add-tag") {
      this.setState({
        new_tag: e.target.value
      })
    }
  };

  onCreateTag = (e) => {
    if (this.state.new_tag.length > 0 && this.state.tags.length < 5 && this.state.new_tag.length <= 20
    && !this.state.tags.includes(this.state.new_tag)) {
      let new_tag_array = this.state.tags;
      new_tag_array.push(this.state.new_tag);
      this.setState({
        tags: new_tag_array,
        tag_error_message: '',
        new_tag: ''
      }, () => {
        document.getElementById('input-tag').value = "";
      })
    }
    else if (this.state.tags.length >= 5) {
      this.setState({
        tag_error_message: 'You can only create 5 tags, click on an existing tag to delete it'
      })
    }

    else if (this.state.tags.includes(this.state.new_tag)) {
      this.setState({
        tag_error_message: 'Tag already exists'
      })
    }

    else {
      this.setState({
        tag_error_message: 'Tags must be between 1 and 20 characters'
      })
    }
  };

  onTagDelete = (e) => {
    let tags = this.state.tags;
    let new_tags;
    tags.forEach((tag, index) => {
      if (tag === e.target.value) {
        new_tags = tags.slice(0,index);
        new_tags.push.apply(new_tags, tags.slice(index+1));
        this.setState({
          tags: new_tags
        }, () => {
          return
        })
      }
    })
  };

  onSubmit = (e) => {
    e.preventDefault();
    let tags_array = [];
    let push_tags = new Promise((resolve, reject) => {
      tags_array = this.state.tags
      resolve('it worked')
    });

    push_tags.then(() => {
      const { title, selectedFile, file_ext } = this.state;
      if (selectedFile && file_ext[selectedFile.name.split('.').pop()] == true) {
        let formData = new FormData();

        formData.append('title', title);
        formData.append('selectedFile', selectedFile);
        formData.append('user_id', this.props.userData.user_id);
        formData.append('tags', tags_array);

        axios.post(this.props.userData.base_url + 'api/upload', formData).then((response) => {
          this.setState({
            image_id: response.data.id,
            upload_error: false,
            upload_success: true
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
  };

  render() {
    const upload_error = this.state.upload_error
    const redirect_url = "images/" + this.state.image_id
    return (
      <div className="text-center">
        <div className="row">
          <div className="col-md-12">
            <h1>Upload file</h1>
            <hr/>
          </div>
        </div>
        {!this.state.upload_success ?
          <div>

            <UploadFile onChange={this.onChange} fileName={this.state.file_name} upload_error={upload_error}
              selectedFile={this.state.selectedFile}/>

            <UploadTitle onChange={this.onChange}/>

            <UploadTag inputTag={this.onChange} onCreateTag={this.onCreateTag} onTagDelete={this.onTagDelete}
                tags={this.state.tags} tagError={this.state.tag_error_message}/>

            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <button className="btn btn-success btn-lg text-center upload-button" onClick={this.onSubmit}>
                Upload
                </button>
              </div>
              <div className="col-md-4"></div>
            </div>
          </div>
          : <Redirect to={redirect_url} />
        }
      </div>
    );
  }
}


export default Upload
