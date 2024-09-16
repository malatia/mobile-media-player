import { View, Text, FlatList, FlatListProps, StyleSheet } from "react-native";
import React from "react";
import library from "@/assets/data/library.json";
import TracksListItem from "./TracksListItem";
import { useDynamicStyles } from "@/hooks/useDynamicStyles";
import TrackPlayer, { Track } from "react-native-track-player";

export type Props = Partial<FlatListProps<Track>> & {
  tracks: Track[];
};

export default function TracksList({ tracks }: Props) {
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

  const handleTrackSelect = async (track: Track) => {
    await TrackPlayer.load(track);
    await TrackPlayer.play();
  };

  return (
    <FlatList
      data={tracks}
      ItemSeparatorComponent={ItemDivider}
      ListFooterComponent={ItemDivider}
      contentContainerStyle={styles.contentContainer}
      ListEmptyComponent={
        <View>
          <Text style={utilsStyles.emptyContentText}>No Songs found</Text>
        </View>
      }
      renderItem={({ item: track }) => (
        <TracksListItem track={track} onTrackSelect={handleTrackSelect} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 300, // Ajoute un espace en bas de la FlatList
  },
});
