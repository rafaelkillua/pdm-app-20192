import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import DashboardScreen from './screens/Dashboard'
import PaymentScreen from './screens/Payment'

const DashboardStack = createStackNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      title: 'Lista de Pagamentos',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  },

  Payment: {
    screen: PaymentScreen,
    navigationOptions: {
      title: 'Pagamento'
    }
  }
})

export default createAppContainer(DashboardStack)
