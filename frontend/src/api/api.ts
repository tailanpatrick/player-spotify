import axios from 'axios';


const BASE_URL = "https://backend-spotify-snowy.vercel.app";

const api = axios.create({
  baseURL: BASE_URL
})

export { api }
