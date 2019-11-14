import React from 'react'
import { View, Text } from 'react-native'

const Payment = props => {
  return (
    <View>
      <Text>Payment</Text>
      <Text>{props.navigation.getParam('paymentId', 'nada')}</Text>
    </View>
  )
}

export default Payment
