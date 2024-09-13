import { View, Pressable, Image, StyleSheet, Text } from "react-native";
import React from "react";
import FastImage from "react-native-fast-image"; // Si tu veux utiliser react-native-fast-image pour les images distantes
import { useDynamicStyles } from "@/hooks/useDynamicStyles";
import { fontSize } from "@/constants/Tokens";
import { useThemeColors } from "@/hooks/useThemeColors";

export type TracksListItemProps = {
  track: { title: string; image?: string; artist?: string };
};

export default function TracksListItem({ track }: TracksListItemProps) {
  const isActiveTrack = false;
  const Colors = useThemeColors();
  const { defaultStyles } = useDynamicStyles();

  const styles = StyleSheet.create({
    trackItemContainer: {
      flexDirection: "row",
      columnGap: 14,
      alignItems: "center",
      paddingRight: 20,
    },
    trackPlayingIconIndicator: {
      position: "absolute",
      top: 18,
      left: 16,
      width: 16,
      height: 16,
    },
    trackPausedIndicator: {
      position: "absolute",
      top: 14,
      left: 14,
    },
    trackArtworkImage: {
      borderRadius: 8,
      width: 50,
      height: 50,
    },
    trackTitleText: {
      ...defaultStyles.text,
      fontSize: fontSize.sm,
      fontWeight: "600",
      maxWidth: "100%",
    },
    trackArtistText: {
      ...defaultStyles.text,
      fontSize: 14,
      marginTop: 4,
    },
  });

  return (
    <Pressable>
      <View style={styles.trackItemContainer}>
        <View>
          <Image
            source={
              track.image
                ? { uri: track.image } // Si track.image existe, utiliser cette image
                : require("@/assets/images/unknown_track.png") // Sinon, utiliser l'image par défaut
            }
            style={{
              ...styles.trackArtworkImage,
              opacity: isActiveTrack ? 0.6 : 1.0,
            }}
          />
        </View>
        <View>
          <Text
            numberOfLines={1}
            style={{
              ...styles.trackTitleText,
              color: isActiveTrack ? Colors.primary : Colors.text,
            }}
          >
            {track.title}
          </Text>

          {track.artist && (
            <Text
              numberOfLines={1}
              style={[styles.trackArtistText, { color: Colors.textMuted }]}
            >
              {track.artist}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}
