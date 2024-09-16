import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useDynamicStyles } from "@/hooks/useDynamicStyles";
import TracksList from "@/components/TracksList";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import SearchBar from "@/components/SearchBar";
import library from "@/assets/data/library.json";
import { FloatingPlayer } from "@/components/FloatingPlayer";

export default function SongsScreen() {
  const headerHeight = useHeaderHeight();
  const tabsHeight = useBottomTabBarHeight();
  const { defaultStyles } = useDynamicStyles();

  const [search, setSearch] = useState("");

  // If there's a search, then search for title, and, if there's an artist
  // search for the artist aswell
  const filteredTracks = search
    ? library.filter(
        (track) =>
          track.title.toLowerCase().includes(search.toLowerCase()) ||
          (track.artist
            ? track.artist.toLowerCase().includes(search.toLowerCase())
            : false)
      )
    : library;

  return (
    <View
      style={[
        defaultStyles.container,
        styles.body,
        { paddingTop: headerHeight },
      ]}
    >
      <View>
        <SearchBar value={search} onChange={setSearch} />
      </View>
      <TracksList tracks={filteredTracks} />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 50,
  },
});
