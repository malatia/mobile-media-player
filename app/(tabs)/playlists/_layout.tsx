import { StackScreenWithSearchBar } from "@/constants/layout";
import { useDynamicStyles } from "@/hooks/useDynamicStyles";
import { Stack } from "expo-router";
import { View } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function PlaylistsScreenLayout() {
  const { defaultStyles } = useDynamicStyles();
  const Colors = useThemeColors();
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Playlists",
            headerTintColor: Colors.text,
            ...StackScreenWithSearchBar,
          }}
        />
      </Stack>
    </View>
  );
}
