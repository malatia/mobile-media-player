import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SearchBarProps } from "react-native-screens";
import { useThemeColors } from "./useThemeColors";
import { useNavigation } from "expo-router";

export default function useNavigationSearch() {
  const Colors = useThemeColors();
  const [search, setSearch] = useState("")
  const navigation = useNavigation()

  const defaultSearchOptions: SearchBarProps = {
    tintColor: Colors.primary,
    hideWhenScrolling: false,
  };
  

  return (
    <View>
      <Text>useNavigationSearch</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
