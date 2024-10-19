import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useMemo, useState } from "react";
import { useDynamicStyles } from "@/hooks/useDynamicStyles";
import TracksList from "@/components/TracksList";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import SearchBar from "@/components/SearchBar";
import { useTracks } from "@/store/library";
import { generateTracksListId } from "@/helpers/miscellaneous";

export default function SongsScreen() {
  const headerHeight = useHeaderHeight();
  const tabsHeight = useBottomTabBarHeight();
  const { defaultStyles } = useDynamicStyles();

  const [search, setSearch] = useState("");

  const tracks = useTracks();

  // If there's a search, then search for title, and, if there's an artist
  // search for the artist aswell
  const filteredTracks = useMemo(() => {
    if (!search) return tracks;
    return tracks.filter((track) => {
      if (track.title) {
        return (
          track.title.toLowerCase().includes(search.toLowerCase()) ||
          (track.artist
            ? track.artist.toLowerCase().includes(search.toLowerCase())
            : false)
        );
      }
    });
  }, [search]);

  return (
    <View
      style={[
        defaultStyles.container,
        styles.body,
        { paddingTop: headerHeight },
      ]}
    >
      <View>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Find in Songs"
        />
      </View>
      <TracksList id={generateTracksListId('songs', search)} tracks={filteredTracks} />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 50,
  },
});
