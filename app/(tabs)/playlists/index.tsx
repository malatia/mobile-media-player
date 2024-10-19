import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { useDynamicStyles } from "@/hooks/useDynamicStyles";
import MediaTest from "@/components/MediaTest";
import { useHeaderHeight } from "@react-navigation/elements";

export default function PlaylistsScreen() {
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
      <MediaTest />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 50,
  },
});
