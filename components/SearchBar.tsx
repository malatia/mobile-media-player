import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native";
import Row from "./Row";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
  value: string;
  onChange: (s: string) => void;
  placeholder: string;
};

export default function SearchBar({ value, onChange, placeholder }: Props) {
  const Colors = useThemeColors();

  const [text, setText] = useState(value);

  const handleClear = () => {
    setText("");
    onChange(""); // Appelle onChange pour synchroniser le texte vide avec l'extérieur
  };

  const handleChange = (inputText: string) => {
    setText(inputText);
    onChange(inputText); // Propagation de la mise à jour du texte au parent
  };

  return (
    <View
      style={[styles.searchBar, { backgroundColor: Colors.searchBackground }]}
    >
      <Image
        source={require("@/assets/images/search.png")}
        width={16}
        height={16}
      />

      <TextInput
        onChangeText={handleChange}
        value={value}
        style={[styles.textInput, { color: Colors.text }]}
        placeholder={placeholder}
        placeholderTextColor="#BBBBBB"
      />

      {text.length > 0 && (
        <TouchableOpacity onPress={handleClear}>
          <Image
            source={require("@/assets/images/clear.png")} // Votre icone de croix
            width={16}
            height={16}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginHorizontal: 14,
    marginVertical: 10,
    borderRadius: 12,
    justifyContent: "space-between",
  },
  textInput: {
    paddingHorizontal: 10,
    flex: 1,
  },
});
