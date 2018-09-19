import axios from "axios";

export default class GalleryService {
  constructor() {
    axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
  }
  /**
   * Method for getting galleries for AllGalleries component
   */
  getAll(page = 1, term = "") {
    return axios.get(`galleries?page=${page}&term=${term}`);
  }

  /**
   * Method for getting single gallery with images and comments
   */
  show(id) {
    return axios.get(`galleries/${id}`);
  }
}

export const galleryService = new GalleryService();
