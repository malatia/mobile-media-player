import library from "@/assets/data/library.json";
//import { unknownTrackImageUri } from '@/constants/images'
import { Artist, Playlist, TrackWithPlaylist } from "@/helpers/types";
import { useMemo } from "react";
import { Track } from "react-native-track-player";
import { create } from "zustand";

interface LibraryState {
  tracks: TrackWithPlaylist[];
  toggleTrackFavorite: (track: Track) => void;
  addToPlaylist: (track: Track, playlistName: string) => void;
}

export const useLibraryStore = create<LibraryState>()((set) => ({
  tracks: library,
  toggleTrackFavorite: () => {},
  addToPlaylist: () => {},
}));

export const useTracks = () => useLibraryStore((state) => state.tracks);

export const useFavorites = () => {
  const tracks = useLibraryStore((state) => state.tracks);
  const favorites = useMemo(() => {
    return tracks.filter((track) => track.rating === 1);
  }, [tracks]);

  const toggleTrackFavorite = useLibraryStore(
    (state) => state.toggleTrackFavorite
  );

  return {
    favorites,
    toggleTrackFavorite,
  };
};
