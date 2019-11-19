import React from 'react'
import { StyleSheet } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Button, Icon } from 'native-base'

import DashboardScreen from './screens/Dashboard'
import PaymentScreen from './screens/Payment'

const DashboardStack = createStackNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Lista de Pagamentos',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerRight: (
        <Button
          icon
          style={styles.filterButton}
          onPress={navigation.getParam('openFilters')}>
          <Icon
            name="filter-list"
            type="MaterialIcons"
            style={styles.filterIcon}
          />
        </Button>
      )
    })
  },

  Payment: {
    screen: PaymentScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${
        navigation.getParam('paymentId') ? 'Editar' : 'Adicionar'
      } Pagamento`
    })
  }
})

const styles = StyleSheet.create({
  filterButton: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    elevation: 0
  },
  filterIcon: {
    color: '#000000'
  }
})

export default createAppContainer(DashboardStack)
