import axios from 'axios';


const BASE_URL = "http://192.168.100.175:3000";

const api = axios.create({
  baseURL: BASE_URL
})

export { api }
