import { View, Text } from 'react-native'
import React from 'react'
import { useDynamicStyles } from '@/hooks/useDynamicStyles'

export default function ArtistsScreen() {
  const { defaultStyles } = useDynamicStyles()
  return (
    <View style= {defaultStyles.container}>
      <Text style={defaultStyles.text}>Artists Screen</Text>
    </View>
  )
}