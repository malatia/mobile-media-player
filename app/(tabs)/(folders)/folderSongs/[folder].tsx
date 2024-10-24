import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useDynamicStyles } from "@/hooks/useDynamicStyles";
import TracksList from "@/components/TracksList";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import SearchBar from "@/components/SearchBar";
import { useTracks } from "@/store/library";
import { generateTracksListId } from "@/helpers/miscellaneous";
import { Stack, useLocalSearchParams } from "expo-router";
import { Asset, getAssetsAsync } from "expo-media-library";
import { Track } from "react-native-track-player";

export default function FolderSongsScreen() {
  const headerHeight = useHeaderHeight();
  const { defaultStyles } = useDynamicStyles();
  const { folderId, folderName } = useLocalSearchParams();

  const [isReady, setIsReady] = useState(false);
  const [search, setSearch] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);

  const getTracks = async () => {
    const fetchedTracksPaged = await getAssetsAsync({
      album: folderId,
      mediaType: "audio",
      first: 999,
    });
    const fetchedTracks = fetchedTracksPaged.assets;
    let tracksArray = [];
    for (let fetchedTrack of fetchedTracks) {
      tracksArray.push({
        url: fetchedTrack.uri,
        title: fetchedTrack.filename,
        artist: folderName,
      });
    }
    console.log(folderName);
    console.log(folderId);
    console.log(fetchedTracks);

    setTracks(tracksArray);
    setIsReady(true);
  };

  useEffect(() => {
    getTracks();
  }, [folderId]);

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

  if (!isReady) {
    // Afficher un spinner ou une vue de chargement en attendant que la logique soit terminée
    return (
      <View
        style={[
          defaultStyles.container,
          styles.body,
          { paddingTop: headerHeight },
        ]}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View
        style={[
          defaultStyles.container,
          styles.body,
          { paddingTop: headerHeight },
        ]}
      >
        <Stack.Screen
          options={{
            headerTitle: folderName,
          }}
        />
        <View>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder={`Find in ${folderName}`}
          />
        </View>
        <TracksList
          id={generateTracksListId(folderName, search)}
          tracks={search ? filteredTracks : tracks}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 50,
  },
});
