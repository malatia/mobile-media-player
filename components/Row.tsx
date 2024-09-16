import { StyleSheet, Text, View, ViewProps, ViewStyle } from "react-native";
import React from "react";

type Props = ViewProps & {
  gap?: number;
};

export default function Row({ style, gap, ...rest }: Props) {
  return <View style={[rowStyle, style, gap ? { gap: gap } : undefined]} />;
}

const rowStyle = {
  flex: 0,
  flexDirection: "row",
  alignItems: "center",
} satisfies ViewStyle;
