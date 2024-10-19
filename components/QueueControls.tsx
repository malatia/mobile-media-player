import { useDynamicStyles } from "@/hooks/useDynamicStyles";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import TrackPlayer, { Track } from "react-native-track-player";

type QueueControlsProps = {
  tracks: Track[];
} & ViewProps;

export const QueueControls = ({
  tracks,
  style,
  ...viewProps
}: QueueControlsProps) => {
  const { defaultStyles } = useDynamicStyles();
  const Colors = useThemeColors();

  const handlePlay = async () => {
    await TrackPlayer.setQueue(tracks);
    await TrackPlayer.play();
  };

  const handleShufflePlay = async () => {
    const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5);

    await TrackPlayer.setQueue(shuffledTracks);
    await TrackPlayer.play();
  };

  return (
    <View
      style={[{ flexDirection: "row", gap:16, justifyContent:"center" }, style]}
      {...viewProps}
    >
      {/* Play button */}
      <View style={{ flex: 3/7 }}>
        <TouchableOpacity
          onPress={handlePlay}
          activeOpacity={0.8}
          style={styles.button}
        >
          <Ionicons name="play" size={22} color={Colors.tabTint} />

          <Text
            style={[
              defaultStyles.text,
              styles.buttonText,
              { color: Colors.tabTint },
            ]}
          >
            Play
          </Text>
        </TouchableOpacity>
      </View>

      {/* Shuffle button */}
      <View style={{ flex: 3/7 }}>
        <TouchableOpacity
          onPress={handleShufflePlay}
          activeOpacity={0.8}
          style={styles.button}
        >
          <Ionicons name={"shuffle-sharp"} size={24} color={Colors.tabTint} />

          <Text
            style={[
              defaultStyles.text,
              styles.buttonText,
              { color: Colors.tabTint },
            ]}
          >
            Shuffle
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {    
    padding: 12,
    backgroundColor: "rgba(47, 47, 47, 0.5)",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 8,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
  },
});
