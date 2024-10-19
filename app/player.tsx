import { ActivityIndicator, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useDynamicStyles } from "@/hooks/useDynamicStyles";
import { fontSize, screenPadding } from "@/constants/Tokens";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useActiveTrack } from "react-native-track-player";
import { useThemeColors } from "@/hooks/useThemeColors";
import { PlayerControls } from "@/components/PlayerControls";
import { MovingText } from "@/components/MovingText";
import { FontAwesome } from "@expo/vector-icons";
import { PlayerVolumeBar } from "@/components/PlayerVolumeBar";
import { PlayerRepeatToggle } from "@/components/PlayerRepeatToggle";
import { PlayerProgressBar } from "@/components/PlayerProgressBar";
import { usePlayerBackground } from "@/hooks/usePlayerBackground";
import { LinearGradient } from "expo-linear-gradient";

export default function PlayerScreen() {
  const { defaultStyles, utilsStyles } = useDynamicStyles();
  const activeTrack = useActiveTrack();
  const Colors = useThemeColors();
  const { imageColors } = usePlayerBackground(
    activeTrack?.artwork ?? require("@/assets/images/unknown_track.png")
  );
  const { top, bottom } = useSafeAreaInsets();
  let isFavorite = false;

  const toggleFavorite = () => {
    isFavorite = !isFavorite;
    console.log(isFavorite);
  };

  if (!activeTrack) {
    return (
      <View style={[defaultStyles.container, { justifyContent: "center" }]}>
        <ActivityIndicator color={Colors.icon} />
        <Text style={{ color: "#FFFFFF" }}>ALED PAS D'ACTIVE TRACK</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={
        imageColors
          ? [imageColors.average, imageColors.vibrant]
          : [Colors.tabTint, Colors.background]
      }
      dither={true}
    >
      <View style={[defaultStyles.container, styles.overlayContainer]}>
        <View style={{ flex: 1, marginTop: top + 50, marginBottom: bottom }}>
          <View style={styles.artworkImageContainer}>
            <Image
              source={
                activeTrack.artwork
                  ? { uri: activeTrack.artwork }
                  : require("@/assets/images/unknown_track.png")
              }
              style={styles.artworkImage}
            />
          </View>

          <View style={{ flex: 1 }}>
            <View style={{ marginTop: "auto" }}>
              <View style={{ height: 60 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* Track title */}
                  <View style={styles.trackTitleContainer}>
                    <MovingText
                      text={activeTrack.title ?? ""}
                      animationThreshold={30}
                      style={[styles.trackTitleText, defaultStyles.text]}
                    />
                  </View>

                  {/* Favorite button icon */}
                  <FontAwesome
                    name={isFavorite ? "heart" : "heart-o"}
                    size={20}
                    color={isFavorite ? Colors.primary : Colors.icon}
                    style={{ marginHorizontal: 14 }}
                    onPress={toggleFavorite}
                  />
                </View>

                {/* Track artist */}
                {activeTrack.artist && (
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.trackArtistText,
                      { marginTop: 6 },
                      defaultStyles.text,
                    ]}
                  >
                    {activeTrack.artist}
                  </Text>
                )}
              </View>

              <PlayerProgressBar style={{ marginTop: 32 }} />

              <PlayerControls style={{ marginTop: 40 }} />
            </View>

            <PlayerVolumeBar style={{ marginTop: "auto", marginBottom: 30 }} />

            <View style={utilsStyles.centeredRow}>
              <PlayerRepeatToggle size={30} style={{ marginBottom: 6 }} />
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    paddingHorizontal: screenPadding.horizontal,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  artworkImageContainer: {
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 11.0,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "center",
    height: "45%",
  },
  artworkImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 12,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: "hidden",
  },
  trackTitleText: {
    fontSize: 22,
    fontWeight: "700",
  },
  trackArtistText: {
    fontSize: fontSize.base,
    opacity: 0.8,
    maxWidth: "90%",
  },
});
