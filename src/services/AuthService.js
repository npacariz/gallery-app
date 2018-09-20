import axios from "axios";

export default class AuthService {
  constructor() {
    axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
    this.setAxiosDefaultAuthorizationHeader();
  }
  /**
   *  Login method, sending request for token to database
   */
  login(email, password) {
    return axios.post(`auth/login`, { email, password }).then(response => {
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user_id", response.data.user_id);
      this.setAxiosDefaultAuthorizationHeader();
    });
  }
  /**
   * Setting a token to axios header for every request
   */
  setAxiosDefaultAuthorizationHeader() {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  /**
   *  Logout method, calling database to logout user;
   */
  logout() {
    axios.post(`auth/logout`);
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    delete axios.defaults.headers.common["Authorization"];
  }
  /**
   * Register method and automatically login user
   */
  register(newUser) {
    return axios.post(`auth/register`, newUser).then(response => {
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user_id", response.data.user_id);
      this.setAxiosDefaultAuthorizationHeader();
    });
  }
  /**
   * Checking if user token is in local storage
   */
  isAuthenticated() {
    return !!localStorage.getItem("token");
  }

  /**
   * Checking for user id
   */
  gettingUserId() {
    return localStorage.getItem("user_id");
  }
}

export const auth = new AuthService();
