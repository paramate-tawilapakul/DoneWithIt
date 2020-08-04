import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import navigationTheme from './app/navigation/navigationTheme'
import AppNavigator from './app/navigation/AppNavigator'
// import AuthNavigator from './app/navigation/AuthNavigator'
import Screen from './app/components/Screen'

export default function App() {
  return (
    <Screen>
      <NavigationContainer theme={navigationTheme}>
        <AppNavigator />
      </NavigationContainer>
    </Screen>
  )
}
