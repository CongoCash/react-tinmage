import React, { Component } from 'react'
import axios from 'axios'
import { Redirect} from 'react-router-dom'
import UploadFile from './upload-file/UploadFile'
import UploadTitle from './upload-title/UploadTitle'
import UploadTag from './upload-tag/UploadTag'
require('./Upload.css')
//need to move drag and drop upload to app.js, so that you can upload anywhere

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      selectedFile: '',
      file_ext: {
        bmp: true, dds: true, gif: true, jpeg: true, jpg: true, png: true, psd: true, pspimage: true,
        tga: true, thm: true, tif: true, tiff: true, yuv: true
      },
      upload_error: false,
      upload_success: false,
      image_id: '',
      tags: [],
      tags_clicked: {},
      new_tag: '',
      file_name: '',
      tag_error_message: '',
      preview_height: '',
      preview_width: ''
    };
    this.onTagDelete = this.onTagDelete.bind(this);
    this.onCreateTag = this.onCreateTag.bind(this);
    this.onDropFile = this.onDropFile.bind(this);
    this.dragOverHandler = this.dragOverHandler.bind(this);
  }

  onDropFile = (e) => {
    e.preventDefault();
    this.setState({
      selectedFile: e.dataTransfer.items[0].getAsFile(),
      file_name: e.dataTransfer.items[0].getAsFile().name
    }, () => {
      //adds a preview image upon selecting an image
      window.URL = window.URL || window.webkitURL;
      let preview = document.getElementById('preview');
      preview.src = window.URL.createObjectURL(this.state.selectedFile);
      preview.onload = () => {
        this.setState({
          preview_height: preview.height,
          preview_width: preview.width
        })
      }
    })
  };

  dragOverHandler = (e) => {
    e.preventDefault();
  };

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
          //need to remove attributes otherwise the first dimensions will dictate any others
          preview.removeAttribute("height");
          preview.removeAttribute("width");
          preview.src = window.URL.createObjectURL(this.state.selectedFile);
          let max_image_width = document.getElementsByClassName('image-parent')[0].offsetWidth;
          preview.onload = () => {
            let preview_width = preview.width;
            let preview_height = preview.height;
            if (preview_width > max_image_width * 0.9) {
              console.log('enetered ');
              preview_width = max_image_width * 0.9;
              preview_height = preview_height * (max_image_width / preview.width * 0.9);
            }


            this.setState({
              preview_height: preview_height,
              preview_width: preview_width
            })
          };
          console.log(preview);
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
      if (selectedFile && file_ext[selectedFile.name.split('.').pop()] === true) {
        let formData = new FormData();

        formData.append('title', title);
        formData.append('selectedFile', selectedFile);
        formData.append('user_id', this.props.userData.user_id);
        formData.append('tags', tags_array);
        formData.append('height', this.state.preview_height);
        formData.append('width', this.state.preview_width);
        console.log(this.props.userData.base_url);

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
    console.log(this.props);
    console.log('rendering');
    console.log(this.props.userData);
    const upload_error = this.state.upload_error;
    const redirect_url = "images/" + this.state.image_id;
    return (
      <div className="row upload-container">
      <div className="col-lg-2"></div>
        <div className="col text-center height-100 upload-title-padding upload-content" onDrop={this.onDropFile} onDragOver={this.dragOverHandler}>
          <div className="row">
            <div className="col-lg-12">
              <span onClick={this.props.uploadClick.bind(this)} className="close">&times;</span>
              <h1>Upload file</h1>
              <hr/>
            </div>
          </div>
          {!this.state.upload_success ?
            <div className="image-parent">

              <UploadFile onChange={this.onChange} fileName={this.state.file_name} upload_error={upload_error}
                selectedFile={this.state.selectedFile} previewHeight={this.state.preview_height}
                previewWidth={this.state.preview_width}
              />

              <UploadTitle onChange={this.onChange}/>

              <UploadTag inputTag={this.onChange} onCreateTag={this.onCreateTag} onTagDelete={this.onTagDelete}
                  tags={this.state.tags} tagError={this.state.tag_error_message}/>

              <div className="row">
                <div className="col-lg-4 col-md-4"></div>
                <div className="col-lg-4 col-md-4">
                  <button className="btn btn-success btn-lg upload-buttons" onClick={this.onSubmit}>
                  Upload
                  </button>
                </div>
                <div className="col-lg-4 col-md-4"></div>
              </div>
            </div>
            : <Redirect to={redirect_url} />
          }
        </div>
        <div className="col-lg-2"></div>
      </div>
    );
  }
}


export default Upload
