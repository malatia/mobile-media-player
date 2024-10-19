import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useMemo, useState } from "react";
import { useDynamicStyles } from "@/hooks/useDynamicStyles";
import TracksList from "@/components/TracksList";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import SearchBar from "@/components/SearchBar";
import library from "@/assets/data/library.json";
import { useFavorites } from "@/store/library";
import { generateTracksListId } from "@/helpers/miscellaneous";

export default function FavoritesScreen() {
  const headerHeight = useHeaderHeight();
  const tabsHeight = useBottomTabBarHeight();
  const { defaultStyles } = useDynamicStyles();

  const [search, setSearch] = useState("");

  const { favorites: favoritesTracks } = useFavorites();

  // If there's a search, then search for title, and, if there's an artist
  // search for the artist aswell
  const filteredFavoritesTracks = useMemo(() => {
    if (!search) return favoritesTracks;

    return favoritesTracks.filter((track) => {
      if (track.title) {
        return (
          track.title.toLowerCase().includes(search.toLowerCase()) ||
          (track.artist
            ? track.artist.toLowerCase().includes(search.toLowerCase())
            : false)
        );
      }
    });
  }, [search, favoritesTracks]);

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
          placeholder="Find in Favorites"
        />
      </View>
      <TracksList
        id={generateTracksListId("favorites", search)}
        tracks={filteredFavoritesTracks}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 50,
  },
});
