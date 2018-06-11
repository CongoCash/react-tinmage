import axios from 'axios'
import {myConfig} from "../config"

class UploadsModel {

  static upload(data){
    let request = axios.post(myConfig.api_url + "api/upload", data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }});
    return request
  }

}

export default UploadsModel
