import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { SearchBarProps } from "react-native-screens";
import { useThemeColors } from "./useThemeColors";
import { useNavigation } from "expo-router";

export default function useNavigationSearch({
  searchBarOptions,
}: {
  searchBarOptions?: SearchBarProps;
}) {
  const Colors = useThemeColors();
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  const handleOnChangeText: SearchBarProps["onChangeText"] = ({
    nativeEvent: { text },
  }) => {
    setSearch(text);
  };

  const defaultSearchOptions: SearchBarProps = {
    tintColor: Colors.primary,
    hideWhenScrolling: false,
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        ...defaultSearchOptions,
        ...searchBarOptions,
        onChangeText: handleOnChangeText,
      },
    });
  }, [navigation, searchBarOptions]);

  return search;
}

const styles = StyleSheet.create({});
