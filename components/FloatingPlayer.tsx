// import { PlayPauseButton, SkipToNextButton } from '@/components/PlayerControls'
// import { unknownTrackImageUri } from '@/constants/images'
// import { useLastActiveTrack } from '@/hooks/useLastActiveTrack'
// import { defaultStyles } from '@/styles'
import { useDynamicStyles } from "@/hooks/useDynamicStyles";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
  Image,
  Pressable,
  Text,
} from "react-native";

import { useActiveTrack } from "react-native-track-player";
import { PlayPauseButton, SkipToNextButton } from "./PlayerControls";
import useLastActiveTrack from "@/hooks/useLastActiveTrack";
import { MovingText } from "./MovingText";

export const FloatingPlayer = ({ style }: ViewProps) => {
  const router = useRouter();
  const { defaultStyles } = useDynamicStyles();

  const activeTrack = useActiveTrack();
  const lastActiveTrack = useLastActiveTrack()

  const displayedTrack = activeTrack ?? lastActiveTrack

  const handlePress = () => {
  	router.navigate('/player')
  }

  if (!displayedTrack) return null;

  return (
    <Pressable onPress={handlePress} style={[styles.container, style]}>
      <>
        <Image
          source={
            displayedTrack.artwork
              ? { uri: displayedTrack.artwork } // Si track.image existe, utiliser cette image
              : require("@/assets/images/unknown_track.png") // Sinon, utiliser l'image par défaut
          }
          style={styles.trackArtworkImage}
        />

        <View style={styles.trackTitleContainer}>
          <MovingText style={[styles.trackTitle, defaultStyles.text]} text={displayedTrack.title ?? ""} animationThreshold={25}/>
        </View>

        <View style={styles.trackControlsContainer}>
          <PlayPauseButton iconSize={24} />
          <SkipToNextButton iconSize={22} />
        </View>
      </>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252525",
    padding: 8,
    borderRadius: 12,
    paddingVertical: 10,
  },
  trackArtworkImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: "hidden",
    marginLeft: 10,
  },
  trackTitle: {
    fontSize: 18,
    fontWeight: "600",
    paddingLeft: 10,
  },
  trackControlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
    marginRight: 16,
    paddingLeft: 16,
  },
});
