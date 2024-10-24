import { View, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useDynamicStyles } from "@/hooks/useDynamicStyles";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import SearchBar from "@/components/SearchBar";
import { useTracks } from "@/store/library";
import { generateTracksListId } from "@/helpers/miscellaneous";
import FolderListItem from "@/components/FolderListItem";
import {
  addListener,
  Album,
  getAlbumsAsync,
  usePermissions,
} from "expo-media-library";
import FolderList from "@/components/FolderList";

export default function FoldersScreen() {
  const headerHeight = useHeaderHeight();
  const tabsHeight = useBottomTabBarHeight();
  const { defaultStyles } = useDynamicStyles();

  const [search, setSearch] = useState("");
  const [folders, setFolders] = useState<Album[]>([]);
  const [permissionResponse, requestPermission] = usePermissions();
  const [isReady, setIsReady] = useState(false);

  const tracks = useTracks();

  async function getFolders() {
    console.log("getFolders");

    if (permissionResponse && permissionResponse.status !== "granted") {
      await requestPermission();
      console.log("Folders not granted");
    }
    const fetchedFolders = await getAlbumsAsync({
      includeSmartAlbums: true,
    });
    setFolders(fetchedFolders);
    setIsReady(true);
    console.log(folders);
  }

  useEffect(() => {
    getFolders();
  }, []);
  
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
        <FolderList folders={folders} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {},
});
