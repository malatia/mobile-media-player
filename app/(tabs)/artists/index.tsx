import { View, Text, StyleSheet,  } from 'react-native'
import React from 'react'
import { useDynamicStyles } from '@/hooks/useDynamicStyles'
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import MediaTest2 from '@/components/MediaTest2';
import MediaTest3 from '@/components/MediaTest3';

export default function ArtistsScreen() {
  const headerHeight = useHeaderHeight();
  const { defaultStyles } = useDynamicStyles();
  return (
    <View
      style={[
        defaultStyles.container,
        styles.body,
        { paddingTop: headerHeight },
      ]}
    >
      <MediaTest3 />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 50,
  },
});
