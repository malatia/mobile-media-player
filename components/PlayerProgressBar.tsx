import { StyleSheet, Text, View, ViewProps } from "react-native";
import React from "react";
import { Slider } from "react-native-awesome-slider";
import TrackPlayer, { useProgress } from "react-native-track-player";
import { useSharedValue } from "react-native-reanimated";
import { formatSecondsToMinutes } from "@/helpers/miscellaneous";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useDynamicStyles } from "@/hooks/useDynamicStyles";
import { fontSize } from "@/constants/Tokens";

export function PlayerProgressBar({ style }: ViewProps) {
  const Colors = useThemeColors();
  const { defaultStyles, utilsStyles } = useDynamicStyles();
  const { duration, position } = useProgress(250);
  const isSliding = useSharedValue(false);
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);

  const trackElapsedTime = formatSecondsToMinutes(position);
  const trackRemainingTime = formatSecondsToMinutes(duration - position);

  if (!isSliding.value) {
    progress.value = duration > 0 ? position / duration : 0;
  }

  return (
    <View style={[style]}>
      <Slider
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        containerStyle={utilsStyles.slider}
        thumbWidth={0}
        renderBubble={() => null}
        theme={{
          maximumTrackTintColor: Colors.maximumTrackTintColor,
          minimumTrackTintColor: Colors.minimumTrackTintColor,
        }}
        onSlidingStart={() => {
          isSliding.value = true;
        }}
        onSlidingComplete={async (value) => {
          if (!isSliding.value) return;
          isSliding.value = false;
          await TrackPlayer.seekTo(value * duration);
        }}
        onValueChange={async (value) => {
          await TrackPlayer.seekTo(value * duration);
        }}
      />
      <View style={styles.timeRow}>
        <Text
          style={[
            defaultStyles.text,
            styles.timeText,
            { color: Colors.text, fontSize: fontSize.xs },
          ]}
        >
          {trackElapsedTime}
        </Text>
        <Text
          style={[
            styles.timeText,
            defaultStyles.text,
            { color: Colors.text, fontSize: fontSize.xs },
          ]}
        >
          {" "}
          {"-"} {trackRemainingTime}{" "}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 20,
  },
  timeText: {
    opacity: 0.75,
    letterSpacing: 0.7,
    fontWeight: "500",
  },
});
