import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import {
  getAll,
  SortSongFields,
  SortSongOrder,
} from "react-native-get-music-files";
import { Song } from "react-native-get-music-files/lib/typescript/src/NativeTurboSongs";

export default function MediaTest3() {
  const [tracks, setTracks] = useState<Song[] | string>();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    fetchMusicFiles();
  }, []);

  async function fetchMusicFiles() {
    const songsOrError = await getAll({
      limit: 2000,
      offset: 0,
      coverQuality: 50,
      minSongDuration: 1000,
      sortBy: SortSongFields.TITLE,
      sortOrder: SortSongOrder.DESC,
    });
    console.log(songsOrError);
    console.log(songsOrError.length);

    // error
    if (typeof songsOrError === "string") {
      console.log("Error");
      console.log(songsOrError);
      return;
    }

    setTracks(songsOrError);
    setIsReady(true);
  }

  if (!isReady) {
    // Afficher un spinner ou une vue de chargement en attendant que la logique soit terminée
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Button onPress={fetchMusicFiles} title="Fetch Music Files" />
        <ScrollView>
          {tracks.map((track, index) => (
            <View key={index} style={styles.track}>
              <Text style={{color: "#FFFFFF"}}>{track.title}</Text>
              <Text style={{color: "#FFFFFF"}}>{track.artist}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {    
    flex: 1,
    padding: 16,
  },
  track: {    
    marginVertical: 8,
  },
});
