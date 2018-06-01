import axios from 'axios'
import {myConfig} from "../config"

class UploadsModel {

  static upload(data){
    let request = axios.post(myConfig.api_url + "api/upload", data, {
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