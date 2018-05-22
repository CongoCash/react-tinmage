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
      default_tags: ['new', 'ads', 'animals', 'cars', 'cartoons', 'cool', 'funny', 'games', 'gif', 'jokes', 'movies',
        'music', 'other', 'political', 'sports', 'travel', 'tv', 'untagged', 'wow'],
      tags_clicked: {
        'new': 0, 'ads': 0, 'animals': 0, 'cars': 0, 'cartoons': 0, 'cool': 0,
        'funny': 0, 'games': 0, 'gif': 0, 'jokes': 0, 'movies': 0, 'music': 0,
        'other': 0, 'political': 0, 'sports': 0, 'travel': 0, 'tv': 0, 'untagged': 0,
        'wow': 0
      },
      tags: ['zzzmmm'],
      new_tag: '',
      file_name: '',
      tag_error_message: ''
    };
    this.onTagSelected = this.onTagSelected.bind(this);
    this.onAddTag = this.onAddTag.bind(this);
  }

  onChange = (e) => {
    console.log(e.target);
    if (e.target.name === 'selectedFile') {
      this.setState({
        selectedFile: e.target.files[0],
        file_name: e.target.files[0].name
      })
    }
    else if (e.target.name === "title") {
      this.setState({
        selectedFile: e.target.value
      })
    }

    else if (e.target.name === "add-tag") {
      this.setState({
        new_tag: e.target.value
      })
    }
  };

  onAddTag = (e) => {
    if (this.state.new_tag.length > 0) {
      let new_tag_array = this.state.default_tags;
      new_tag_array.push(this.state.new_tag);
      this.setState({
        default_tags: new_tag_array,
        tag_error_message: ''
      })
    }
    else {
      this.setState({
        tag_error_message: 'Please enter valid tag'
      })
    }
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
  };

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
              return <button className="tag-button" onClick={this.onTagSelected} value={tag}>{tag}</button>
              }
            )}
            <input type="text" name="add-tag" onChange={this.onChange}/>
            <button onClick={this.onAddTag}>Add Tag</button>
            <form onSubmit={this.onSubmit}>
              <label className="upload-button" for="default-upload">Upload</label>
              <input id="default-upload" type="file" name="selectedFile" onChange={this.onChange}/>
              <input
                type="text"
                name="title"
                value={title}
                onChange={this.onChange}
              />
              <button type="submit">Submit</button>
            </form>
            <h2>File name: </h2><span>{this.state.file_name}</span>
          </div>
          : <Redirect to={redirect_url} />
        }
      </div>
    );
  }
}


export default Upload