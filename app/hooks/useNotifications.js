import { useEffect } from 'react'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

import expoPushTokensApi from '../api/expoPushTokens'

export default useNotifications = notificationListener => {
  useEffect(() => {
    registerForPushNotifications()

    //if (notificationListener) Notifications.addListener(notificationListener)
    if (notificationListener)
      Notifications.addNotificationReceivedListener(notificationListener)
  }, [])

  const registerForPushNotifications = async () => {
    try {
      let token
      if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        )
        let finalStatus = existingStatus
        if (existingStatus !== 'granted') {
          const { status } = await Permissions.askAsync(
            Permissions.NOTIFICATIONS
          )
          finalStatus = status
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!')
          return
        }
        token = (await Notifications.getExpoPushTokenAsync()).data
        console.log(token)
        expoPushTokensApi.register(token)
      } else {
        alert('Must use physical device for Push Notifications')
      }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        })
      }
    } catch (error) {
      console.log('Error getting a push token', error)
    }
  }
}
