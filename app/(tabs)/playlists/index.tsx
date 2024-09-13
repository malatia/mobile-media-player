import { View, Text } from 'react-native'
import React from 'react'
import { useDynamicStyles } from '@/hooks/useDynamicStyles';

export default function PlaylistsScreen() {
  const { defaultStyles } = useDynamicStyles()
  return (
    <View style= {defaultStyles.container}>
      <Text style={defaultStyles.text}>Playlists Screen</Text>
    </View>
  )
}