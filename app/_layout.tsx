import { useLogTrackPlayerState } from "@/hooks/useLogTrackPlayerState";
import { useSetupTrackPlayer } from "@/hooks/useSetupTrackPlayer";
import useFavoritesStore from "@/store/favorites";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const handleTrackPlayerLoaded = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

  useSetupTrackPlayer({
    onLoad: handleTrackPlayerLoaded,
  });

  
  // Appeler `loadFavorites` dans un useEffect pour charger les favoris au démarrage
  useEffect(() => {
    useFavoritesStore.getState().loadFavorites();
  }, []);

  useLogTrackPlayerState();

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootNavigation />
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const RootNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="player"
        options={{
          headerShown: false,
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "vertical",
          animationDuration: 400,
        }}
      />
    </Stack>
  );
};
