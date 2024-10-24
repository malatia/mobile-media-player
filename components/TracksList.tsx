import { View, Text, FlatList, FlatListProps, StyleSheet } from "react-native";
import React, { useRef } from "react";
import library from "@/assets/data/library.json";
import TracksListItem from "./TracksListItem";
import { useDynamicStyles } from "@/hooks/useDynamicStyles";
import TrackPlayer, { Track } from "react-native-track-player";
import { useQueue } from "@/store/queue";
import { QueueControls } from "./QueueControls";

export type Props = Partial<FlatListProps<Track>> & {
  id: string;
  tracks: Track[];
  hideQueueControls?: boolean;
};

export default function TracksList({
  id,
  tracks,
  hideQueueControls = false,
  ...flatListProps
}: Props) {
  const { utilsStyles } = useDynamicStyles();
  const queueOffset = useRef(0);
  const { activeQueueId, setActiveQueueId } = useQueue();

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

  const handleTrackSelect = async (selectedTrack: Track) => {
    console.log("Selected Track : " + selectedTrack);
    console.log("Queue ID : " + typeof activeQueueId);

    const trackIndex = tracks.findIndex(
      (track) => track.url === selectedTrack.url
    );
    console.log("Track index : " + trackIndex);

    if (trackIndex === -1) return;

    const isChangingQueue = id !== activeQueueId;

    if (isChangingQueue) {
      const beforeTracks = tracks.slice(0, trackIndex);
      const afterTracks = tracks.slice(trackIndex + 1);

      await TrackPlayer.reset();

      // we construct the new queue
      await TrackPlayer.add(selectedTrack);
      await TrackPlayer.add(afterTracks);
      await TrackPlayer.add(beforeTracks);

      await TrackPlayer.play();

      queueOffset.current = trackIndex;
      setActiveQueueId(id);
    } else {
      const nextTrackIndex =
        trackIndex - queueOffset.current < 0
          ? tracks.length + trackIndex - queueOffset.current
          : trackIndex - queueOffset.current;

      await TrackPlayer.skip(nextTrackIndex);
      TrackPlayer.play();
    }
  };

  return (
    <FlatList
      data={tracks}
      ItemSeparatorComponent={ItemDivider}
      ListHeaderComponent={
        !hideQueueControls ? (
          <QueueControls
            tracks={tracks}
            style={{ paddingBottom: 20, paddingTop: 10 }}
          />
        ) : undefined
      }
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
