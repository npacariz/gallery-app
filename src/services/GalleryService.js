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
  /**
   * Method for getting galleries for MyGalleries component
   */
  getMyGalleries(page = 1, term = "") {
    return axios.get(`my-galleries?page=${page}&term=${term}`);
  }
  /**
   * Method for getting galleries for AuthorGalleries component
   */
  getAuthorGalleries(id, page = 1, term = "") {
    return axios.get(`author-galleries/${id}?page=${page}&term=${term}`);
  }
  /**
   * Method for calling database to adding new gallery to database
   */
  addGallery(newGallery) {
    return axios.post("galleries", newGallery);
  }
  /**
   * Method for  calling database to editing gallery
   */
  update(id, gallery) {
    return axios.put(`galleries/${id}`, gallery);
  }
  /**
   * Method for  calling database to deleting gallery
   */
  delete(id) {
    return axios.delete(`galleries/${id}`);
  }
  /**
   * Method for getting single gallery for editing with checking if user is owner of gallery
   */
  galleryForEdit(id) {
    return axios.get(`galleries/${id}/edit`);
  }
}

export const galleryService = new GalleryService();