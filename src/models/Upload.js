import axios from 'axios'

class UploadsModel {

  static upload(data){
    let request = axios.post("http://localhost:8000/api/upload", data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }});
    return request
  }

}

export default UploadsModel
