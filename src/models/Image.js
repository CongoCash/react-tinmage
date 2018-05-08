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

  static postRating(user_id, image_id, status) {
    let request = axios.post(myConfig.api_url + "/api/images/rating", {user_id: user_id, image_id: image_id, status: status});
    return request
  }

}

export default ImagesModel
