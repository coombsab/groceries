import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  timeout: 8000
})

export const nasaApi = Axios.create({
  baseURL: "https://api.nasa.gov/planetary/apod",
  timeout: 8000,
  params: {
    api_key: "dYn6vQicG5E6YUr5fYqLIEtcDQk2HacZVofNZXwU"
  }
})
