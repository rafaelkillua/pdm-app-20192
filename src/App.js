/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import { StatusBar } from 'react-native'
import Router from './router'
import { Root } from 'native-base'

const App = () => {
  return (
    <Root>
      <StatusBar barStyle="dark-content" />
      <Router />
    </Root>
  )
}

export default App
