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
      tags: [],
      tags_clicked: {},
      new_tag: '',
      file_name: '',
      tag_error_message: ''
    };
    this.onTagSelected = this.onTagSelected.bind(this);
    this.onCreateTag = this.onCreateTag.bind(this);
  }

  onChange = (e) => {
    if (e.target.name === 'selectedFile') {
      if (e.target.files[0]) {
        this.setState({
          selectedFile: e.target.files[0],
          file_name: e.target.files[0].name
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
    if (this.state.new_tag.length > 0) {
      let new_tag_array = this.state.tags;
      new_tag_array.push(this.state.new_tag);
      let new_tags_clicked = this.state.tags_clicked;
      new_tags_clicked[this.state.new_tag] = 1;
      console.log(new_tags_clicked);
      this.setState({
        tags: new_tag_array,
        tag_error_message: '',
        tags_clicked: new_tags_clicked
      })
    }
    else {
      this.setState({
        tag_error_message: 'Please enter valid tag'
      })
    }
  };

  onTagSelected = (e) => {
    let update_tag = this.state.tags_clicked;
    update_tag[e.target.value] = update_tag[e.target.value] + 1;
    if (update_tag[e.target.value] % 2 == 1) {
      e.target.style.backgroundColor = "";
    }
    else {
      e.target.style.backgroundColor = "grey";
    }
    this.setState({
      update_tag
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let tags_array = [];
    let push_tags = new Promise((resolve, reject) => {
      this.state.tags.forEach((tag) => {
        if (this.state.tags_clicked[tag] % 2 !== 0 && this.state.tags_clicked[tag] > 0) {
          tags_array.push(tag)
        }
      });
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

        axios.post('http://localhost:8000/api/upload', formData).then((response) => {
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
      <div>
        <div className="row">
          <div className="col-sm-12">
            <h1 className="text-center">Upload file</h1>
            <hr/>
          </div>
        </div>
        {!this.state.upload_success ?
          <div>
            {
              upload_error ?
                <div className="row">
                  <div className="col-sm-12">
                    <h3 className="text-center">You can only upload images.</h3>
                  </div>
                </div>:
                ""
            }

            <div className="row">
              <div className="col-sm-2"></div>
              <div className="col-sm-2">
                <h2>Select File: </h2>
              </div>
              <div className="col-sm-2">
                <form>
                  <label for="default-upload">
                    <div className="btn btn-primary btn-lg">Select File</div>
                  </label>
                  <input id="default-upload" type="file" name="selectedFile" onChange={this.onChange}/>
                </form>
              </div>
              <div className="col-sm-6">
                <h3>{this.state.file_name}</h3>
              </div>
            </div>
            <hr/>

            <div className="row">
              <div className="col-sm-2"></div>
              <div className="col-sm-2">
                <h2>Title:</h2>
              </div>
              <div className="col-sm-8">
                <input
                  className="input"
                  type="text"
                  name="title"
                  onChange={this.onChange}
                />
              </div>
            </div>
            <hr/>

            <div className="row">
              <div className="col-sm-2"></div>
              <div className="col-sm-2">
                <h2>Tags:</h2>
              </div>
              <div className="col-sm-3">
                <input className="input" type="text" name="add-tag" onChange={this.onChange}/>
                <button onClick={this.onCreateTag}>Create Tag</button>
              </div>
              <div className="col-sm-5">
                {this.state.tags.map((tag) => {
                    return <button className="btn btn-primary tag-button" onClick={this.onTagSelected} value={tag}>{tag}</button>
                  }
                )}
              </div>
            </div>

            <hr/>

            <div className="row">
              <div className="col-sm-4"></div>
              <div className="col-sm-4 btn btn-success btn-lg text-center" onClick={this.onSubmit}>
                Upload
              </div>
              <div className="col-sm-4"></div>
            </div>
          </div>
          : <Redirect to={redirect_url} />
        }
      </div>
    );
  }
}


export default Upload