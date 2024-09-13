import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <RootNavigation/>
      <StatusBar style="auto"/>
    </SafeAreaProvider>
  );
}

const RootNavigation = () => {
  return(
    <Stack>
      <Stack.Screen name='(tabs)' options={{headerShown: false}}/>
    </Stack>
  )

}
