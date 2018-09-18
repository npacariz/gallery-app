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
      const token = response.data.access_token;
      localStorage.setItem("token", token);
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
    return axios.post(`auth/logout`).then(() => {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    });
  }
  /**
   * Register method and automatically login user
   */
  register(newUser) {
    return axios.post(`auth/register`, newUser).then(response => {
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      this.setAxiosDefaultAuthorizationHeader();
    });
  }
}

export const auth = new AuthService();
