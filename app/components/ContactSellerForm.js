import React from 'react'
import { Alert, Keyboard } from 'react-native'
import * as Notifications from 'expo-notifications'
import * as Yup from 'yup'

import { Form, FormField, SubmitButton } from './forms'
import messagesApi from '../api/messages'

function ContactSellerForm({ listing }) {
  const showNotification = () => {
    // First, set the handler that will cause the notification
    // to show the alert
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    })

    // Second, call the method
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Awesome!',
        body: 'Your message was sent to the seller.',
      },
      trigger: null,
      // {
      //   seconds: 2,
      // },
    })
  }

  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss()

    const result = await messagesApi.send(message, listing.id)

    if (!result.ok) {
      console.log('Error', result)
      return Alert.alert('Error', 'Could not send the message to the seller.')
    }

    resetForm()
    showNotification()
  }

  return (
    <Form
      initialValues={{ message: '' }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <FormField
        maxLength={255}
        multiline
        name='message'
        numberOfLines={3}
        placeholder='Message...'
      />
      <SubmitButton title='Contact Seller' />
    </Form>
  )
}

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label('Message'),
})

export default ContactSellerForm
