import axios from 'axios'
import {myConfig} from '../config'

class ImagesModel {

  static getMain(user_id){
    let request = axios.get(myConfig.api_url + "api/images/main", {params: {user_id: user_id}});
    return request
  }

  static getTags(url, param) {
    let request = axios.get(myConfig.api_url + url + param);
    return request
  }

  static postRating(user_id, image_id, tag, status) {
    let request = axios.post(myConfig.api_url + "api/images/ratings", {user_id: user_id, image_id: image_id, tag: tag, status: status});
    return request
  }
}

export default ImagesModel
