import axios from 'axios'
import {myConfig} from '../config'

class ImagesModel {

  static getAll(){
    let request = axios.get(myConfig.api_url + "/api/images")
    return request
  }

  static getTags(url, param) {
    let request = axios.get(myConfig.api_url + url + param)
    return request
  }

}

export default ImagesModel
