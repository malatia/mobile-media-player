import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import FolderListItem from "./FolderListItem";
import { Album } from "expo-media-library";
import { useDynamicStyles } from "@/hooks/useDynamicStyles";

export type FolderListProps = {
  folders: Album[];
};

export default function FolderList({ folders }: FolderListProps) {
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
    <View style={[styles.folderListContainer]}>
      <FlatList
        data={folders}
        ItemSeparatorComponent={ItemDivider}
        ListFooterComponent={ItemDivider}
        contentContainerStyle={styles.folderListContainer}
        ListEmptyComponent={
          <View>
            <Text style={utilsStyles.emptyContentText}>No Folders found</Text>
          </View>
        }
        renderItem={({ item: folder }) => (
          <FolderListItem folder={folder} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  folderListContainer: {
    paddingBottom: 300,
    paddingTop: 15,
  },
});
