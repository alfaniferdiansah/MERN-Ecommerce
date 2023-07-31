import axios from "axios";

let token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : {};

var instance = axios.create({
  baseURL: 'https://studycase.vercel.app',
  headers: {Authorization: `Bearer ${token}`,}
});

export default instance;