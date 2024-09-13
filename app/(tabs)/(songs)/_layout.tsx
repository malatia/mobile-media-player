import { StackScreenWithSearchBar } from "@/constants/layout";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useDynamicStyles } from '@/hooks/useDynamicStyles';
import { Stack } from "expo-router";
import { View } from "react-native";

export default function SongsScreenLayout() {
  const Colors = useThemeColors()
  const { defaultStyles } = useDynamicStyles()
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Songs",
            headerTintColor: Colors.text,
            ...StackScreenWithSearchBar,
          }}
        />
      </Stack>
    </View>
  );
}
