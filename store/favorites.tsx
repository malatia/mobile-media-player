import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Track } from "react-native-track-player";
import { create } from "zustand";

const FAVORITES_KEY = "favorites";

type FavoriteStore = {
  favorites: any[];
  loadFavorites: () => void;
  addFavorite: (track: Track) => void;
  removeFavorite: (trackUrl: string) => void;
  isFavorite: (trackUrl: string) => Boolean;
};

const useFavoritesStore = create<FavoriteStore>()((set, get) => ({
  favorites: [],

  // Charger les favoris depuis AsyncStorage
  loadFavorites: async () => {
    const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
    if (storedFavorites) {
      set({ favorites: JSON.parse(storedFavorites) });
    }
  },

  // Ajouter un morceau aux favoris
  addFavorite: async (track: Track) => {
    const updatedFavorites = [...get().favorites, track];
    set({ favorites: updatedFavorites });
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  },

  // Supprimer un morceau des favoris
  removeFavorite: async (trackUrl: string) => {
    const updatedFavorites = get().favorites.filter(
      (track: Track) => track.url !== trackUrl
    );
    console.log(updatedFavorites);

    set({ favorites: updatedFavorites });
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  },

  // Vérifier si un morceau est dans les favoris
  isFavorite: (trackUrl: string) => {
    return get().favorites.some((track: Track) => track.url === trackUrl);
  },
}));

// // Appeler `loadFavorites` dans un useEffect pour charger les favoris au démarrage
// useEffect(() => {
//   useFavoritesStore.getState().loadFavorites();
// }, []);

export default useFavoritesStore;
