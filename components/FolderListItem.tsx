import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Album } from "expo-media-library";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useThemeColors } from "@/hooks/useThemeColors";
import { fontSize } from "@/constants/Tokens";
import { Link } from "expo-router";

export type FoldersListItemProps = {
  folder: Album;
};

export default function FolderListItem({ folder }: FoldersListItemProps) {
  const Colors = useThemeColors();
  return (
    <Link
      href={{
        pathname: "/folderSongs/[folder]",
        params: { folderId: folder.id, folderName: folder.title },
      }}
      asChild
    >
      <Pressable>
        <View style={[styles.folderContainer]}>
          <View>
            <FontAwesome name="folder" size={35} color={Colors.tabTint} />
          </View>
          <View>
            <Text style={[{ color: Colors.text, fontSize: fontSize.base }]}>
              {folder.title}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  folderContainer: {
    flexDirection: "row",
    gap: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
});
