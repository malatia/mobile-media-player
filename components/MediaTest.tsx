import { useState, useEffect } from "react";
import {
  Button,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  View,
  Platform,
  Pressable,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import TrackPlayer from "react-native-track-player";

export default function MediaTest() {
  const [albums, setAlbums] = useState(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  console.log("MediaTest rendered");

  useEffect(() => {
    getAlbums();
  }, []);

  async function getAlbums() {
    console.log("getAlbums");

    if (permissionResponse.status !== "granted") {
      await requestPermission();
      console.log("Albums not granted");
    }
    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });
    setAlbums(fetchedAlbums);
    console.log(albums);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={getAlbums} title="Get albums" />
      <ScrollView>
        {albums &&
          albums.map((album) => <AlbumEntry key={album.id} album={album} />)}
      </ScrollView>
    </SafeAreaView>
  );
}

function AlbumEntry({ album }) {
  const [assets, setAssets] = useState([]);

  const testAudio = async (uri) => {
    const track = {
      url: uri,
      title: "Ice Age",
      artist: "deadmau5",
    };
    await TrackPlayer.reset();
    await TrackPlayer.add(track);
    await TrackPlayer.play();
  };

  useEffect(() => {
    async function getAlbumAssets() {
      const albumAssets = await MediaLibrary.getAssetsAsync({
        album,
        mediaType: "audio",
      });
      setAssets(albumAssets.assets);
    }
    getAlbumAssets();
  }, [album]);

  return (
    <View key={album.id} style={styles.albumContainer}>
      <Text>
        {album.title} - {album.assetCount ?? "no"} assets
      </Text>
      <View style={styles.albumAssetsContainer}>
        {assets &&
          assets.map((asset) => (
            <Pressable onPress={() => testAudio(asset.uri)} key={asset.uri}>
              <Text>{asset.filename}</Text>
            </Pressable>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    justifyContent: "center",
    ...Platform.select({
      android: {
        paddingTop: 40,
      },
    }),
    color: "black",
  },
  albumContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
    gap: 4,
    backgroundColor: "#ffffff",
    color: "black",
  },
  albumAssetsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    color: "black",
  },
});
