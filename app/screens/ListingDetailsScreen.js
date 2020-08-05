import React from 'react'
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'
import { Image } from 'react-native-expo-image-cache'

import colors from '../config/colors'
import ListItem from '../components/lists/ListItem'
import Text from '../components/Text'
import Screen from '../components/Screen'
import ContactSellerForm from '../components/ContactSellerForm'

function ListingDetailsScreen({ route }) {
  const listing = route.params
  return (
    <ScrollView>
      <Screen>
        <Image
          style={styles.image}
          tint='light'
          preview={{ uri: listing.images[0].thumbnailUrl }}
          uri={listing.images[0].url}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{listing.title}</Text>
          <Text style={styles.price}>${listing.price}</Text>
          <View style={styles.userContainer}>
            <ListItem
              image={require('../assets/mosh.jpg')}
              title='Mosh Hamedani'
              subTitle='5 Listings'
            />
          </View>
          <ContactSellerForm listing={listing} />
        </View>
      </Screen>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  userContainer: {
    marginVertical: 40,
  },
})

export default ListingDetailsScreen
