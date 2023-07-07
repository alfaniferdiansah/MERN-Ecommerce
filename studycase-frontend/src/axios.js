import axios from "axios";

let token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : {};

var instance = axios.create({
  baseURL: 'http://localhost:3021',
  headers: {Authorization: `Bearer ${token}`,}
});

export default instance;