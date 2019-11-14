import axios from '../axios'

export default {
  getPayments: query => axios.get('payment/find', { params: query })
}
