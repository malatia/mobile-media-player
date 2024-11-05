import { View, Pressable, Image, StyleSheet, Text } from "react-native";
import React from "react";
import FastImage from "react-native-fast-image"; // Si tu veux utiliser react-native-fast-image pour les images distantes
import { useDynamicStyles } from "@/hooks/useDynamicStyles";
import { fontSize } from "@/constants/Tokens";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Track, useActiveTrack, useIsPlaying } from "react-native-track-player";
import { Entypo, Ionicons } from "@expo/vector-icons";
import LoaderKit from "react-native-loader-kit";
import { TrackShortcutsMenu } from "./TrackShortcutsMenuProps";

export type TracksListItemProps = {
  track: Track;
  onTrackSelect: (Track: Track) => void;
};

export default function TracksListItem({
  track,
  onTrackSelect,
}: TracksListItemProps) {
  const isActiveTrack = useActiveTrack()?.url === track.url;
  const Colors = useThemeColors();
  const { defaultStyles } = useDynamicStyles();
  const { playing } = useIsPlaying();

  return (
    <Pressable onPress={() => onTrackSelect(track)}>
      <View style={styles.trackItemContainer}>
        <View>
          <Image
            source={
              track.artwork
                ? { uri: track.artwork } // Si track.image existe, utiliser cette image
                : require("@/assets/images/unknown_track.png") // Sinon, utiliser l'image par défaut
            }
            style={{
              ...styles.trackArtworkImage,
              opacity: isActiveTrack ? 0.6 : 1.0,
            }}
          />

          {isActiveTrack &&
            (playing ? (
              <LoaderKit
                style={styles.trackPlayingIconIndicator}
                name="LineScaleParty"
                color={Colors.icon}
              />
            ) : (
              <Ionicons
                style={styles.trackPausedIndicator}
                name="play"
                size={24}
                color={Colors.icon}
              />
            ))}
        </View>

        <View style={styles.innerText}>
          <View>
            <Text
              numberOfLines={1}
              style={[
                defaultStyles.text,
                styles.trackTitleText,
                { color: isActiveTrack ? Colors.tabTint : Colors.text },
              ]}
            >
              {track.title}
            </Text>

            {track.artist && (
              <Text
                numberOfLines={1}
                style={[
                  defaultStyles.text,
                  styles.trackArtistText,
                  { color: Colors.textMuted },
                ]}
              >
                {track.artist}
              </Text>
            )}
          </View>
          <TrackShortcutsMenu track={track}>
            <Entypo
              name="dots-three-horizontal"
              size={18}
              color={Colors.icon}
            />
          </TrackShortcutsMenu>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  trackItemContainer: {
    flexDirection: "row",
    columnGap: 14,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  trackPlayingIconIndicator: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 32,
    height: 32,
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
    fontSize: fontSize.sm,
    fontWeight: "600",
    maxWidth: 280,
  },
  trackArtistText: {
    fontSize: 14,
    marginTop: 4,
  },
  innerText: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
