import { fontSize } from "@/constants/Tokens";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import {
  Entypo,
  FontAwesome,
  FontAwesome6,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useThemeColors } from "@/hooks/useThemeColors";
import { FloatingPlayer } from "@/components/FloatingPlayer";

export default function TabLayout() {
  const Colors = useThemeColors();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.tabTint,
          tabBarActiveBackgroundColor: Colors.tabBackground,
          tabBarLabelStyle: {
            fontSize: fontSize.xs,
            fontWeight: "500",
          },
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            borderTopWidth: 0,
            marginBottom: -3,
            paddingBottom: 5,
            height: "8%",
          },
          tabBarBackground: () => {
            return (
              <BlurView
                intensity={130}
                tint="dark"
                style={{
                  ...StyleSheet.absoluteFillObject,
                  overflow: "hidden",
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              />
            );
          },
        }}
      >
        <Tabs.Screen
          name="favorites"
          options={{
            title: "Favorites",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="heart" size={25} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="playlists"
          options={{
            title: "Playlists",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="playlist-play"
                size={45}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(songs)"
          options={{
            title: "Songs",
            tabBarIcon: ({ color }) => (
              <Ionicons name="musical-notes" size={35} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(folders)"
          options={{
            title: "Folders",
            tabBarIcon: ({ color }) => (
              <Entypo name="folder-music" size={25} color={color} />
            ),
          }}
        />
      </Tabs>

      <FloatingPlayer style={{
        position: "absolute",
        left:8,
        right:8,
        bottom: 78
      }} />
    </>
  );
}
