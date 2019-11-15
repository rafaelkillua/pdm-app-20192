import axios from '../axios'

export default {
  getPayments: query => axios.get('payment/list', { params: query }),

  getPayment: paymentId => axios.get(`payment/${paymentId}`),

  getPaymentTypes: () => axios.get('paymentType/list'),

  getExpenseTypes: () => axios.get('expenseType/list'),

  newPayment: data => axios.put('/payment', data),

  editPayment: (paymentId, data) => axios.patch(`payment/${paymentId}`, data),

  deletePayment: paymentId => axios.delete(`payment/${paymentId}`)
}
