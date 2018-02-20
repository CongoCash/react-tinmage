import axios from 'axios'

class ImagesModel {

  static getAll(){
    let request = axios.get("http://localhost:8000/api/images")
    return request
  }

}

export default ImagesModel