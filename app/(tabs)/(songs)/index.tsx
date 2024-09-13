import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { useDynamicStyles } from '@/hooks/useDynamicStyles';
import TracksList from "@/components/TracksList";
import { useHeaderHeight } from "@react-navigation/elements";

export default function SongsScreen() {
  const headerHeight = useHeaderHeight();
  const { defaultStyles } = useDynamicStyles()

  return (
    <View
      style={[
        defaultStyles.container,
        styles.body,
        { paddingTop: headerHeight },
      ]}
    >
      <TracksList />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 50,
  },
});
