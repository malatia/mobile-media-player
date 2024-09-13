import { View, Text, FlatList } from "react-native";
import React from "react";
import library from "@/assets/data/library.json";
import TracksListItem from "./TracksListItem";
import { useDynamicStyles } from "@/hooks/useDynamicStyles";

export default function TracksList() {
  const { utilsStyles } = useDynamicStyles();

  function ItemDivider() {
    return (
      <View
        style={{
          ...utilsStyles.itemSeparator,
          marginVertical: 15,
          marginLeft: 60,
        }}
      />
    );
  }

  return (
    <FlatList
      data={library}
      ItemSeparatorComponent={ItemDivider}
      renderItem={({ item: track }) => (
        <TracksListItem
          track={{
            ...track,
            image: track.artwork,
          }}
        />
      )}
    />
  );
}
