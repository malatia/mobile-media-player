import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Track, useActiveTrack } from "react-native-track-player";

export default function useLastActiveTrack() {
  const activeTrack = useActiveTrack();
  const [lastActiveTrack, setLastActiveTrack] = useState<Track>();

  useEffect(() => {
    if (!activeTrack) return;
    setLastActiveTrack(activeTrack);
  }, [activeTrack]);

  return lastActiveTrack;
}
