import library from "@/assets/data/library.json";
//import { unknownTrackImageUri } from '@/constants/images'
import { Artist, Playlist, TrackWithPlaylist } from "@/helpers/types";
import { useMemo } from "react";
import { Track } from "react-native-track-player";
import { create } from "zustand";
import {Album, getAlbumsAsync} from "expo-media-library";

interface LibraryState {
  tracks: TrackWithPlaylist[];
  toggleTrackFavorite: (track: Track) => void;
  addToPlaylist: (track: Track, playlistName: string) => void;
  getFolders: () => Promise<Album[]>,
}

export const useLibraryStore = create<LibraryState>()((set) => ({
  tracks: library,
  toggleTrackFavorite: () => {},
  addToPlaylist: () => {},

  getFolders: async () => {
    return await getAlbumsAsync({
      includeSmartAlbums: true,
    });
    
  },
}));

export const useFolders = () => useLibraryStore((state) => state.getFolders)
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
