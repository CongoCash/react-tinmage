import axios from 'axios'

class UploadsModel {

  static upload(data){
    let request = axios.post("http://localhost:8000/api/upload", data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    return request
  }

}

export default UploadsModel