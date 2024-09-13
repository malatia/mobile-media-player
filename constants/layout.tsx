import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { useThemeColors } from "@/hooks/useThemeColors";
import { BlurView } from "expo-blur";
import { StyleSheet, View } from "react-native";


export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
  
  headerTransparent: true,
  headerShadowVisible: false,
  headerBackground: () => {
    return (
      <BlurView
        intensity={95}
        tint="dark"
        style={{
          ...StyleSheet.absoluteFillObject,

        }}
      />
    );
  },
};
