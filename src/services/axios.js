import axios from 'axios'
import { API_URL } from 'react-native-dotenv'

const _axios = axios.create({
  baseURL: API_URL
})
export default _axios
