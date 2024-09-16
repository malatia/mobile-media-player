import { useThemeColors } from "@/hooks/useThemeColors";
import { FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";

type PlayerControlsProps = {
  style?: ViewStyle;
};

type PlayerButtonProps = {
  style?: ViewStyle;
  iconSize?: number;
};

export const PlayerControls = ({ style }: PlayerControlsProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <SkipToPreviousButton />

        <PlayPauseButton />

        <SkipToNextButton />
      </View>
    </View>
  );
};

export const PlayPauseButton = ({
  style,
  iconSize = 48,
}: PlayerButtonProps) => {
  const { playing } = useIsPlaying();
  const Colors = useThemeColors();

  return (
    <View style={[{ height: iconSize }, style]}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
      >
        <FontAwesome6
          name={playing ? "pause" : "play"}
          size={iconSize}
          color={Colors.text}
        />
      </TouchableOpacity>
    </View>
  );
};

export const SkipToNextButton = ({ iconSize = 30 }: PlayerButtonProps) => {
  const Colors = useThemeColors();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => TrackPlayer.skipToNext()}
    >
      <FontAwesome6 name="forward" size={iconSize} color={Colors.text} />
    </TouchableOpacity>
  );
};

export const SkipToPreviousButton = ({ iconSize = 30 }: PlayerButtonProps) => {
  const Colors = useThemeColors();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => TrackPlayer.skipToPrevious()}
    >
      <FontAwesome6 name={"backward"} size={iconSize} color={Colors.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});