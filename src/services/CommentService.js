import axios from "axios";

export default class CommentService {
  constructor() {
    axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
  }
  /**
   * Method for adding comments
   */

   addComment(gallery_id, body) {
      return axios.post('comments', {gallery_id, body})
   }
}

export const commentService = new CommentService();
