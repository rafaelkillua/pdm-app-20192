import axios from '../axios'

export default {
  getPayments: query => axios.get('payment/find', { params: query }),

  getPayment: paymentId => axios.get(`payment/${paymentId}`),

  getPaymentTypes: () => axios.get('paymentType/find'),

  getExpenseTypes: () => axios.get('expenseType/find'),

  newPayment: data => axios.post('/payment/new', data),

  deletePayment: paymentId => axios.delete(`payment/${paymentId}`)
}
