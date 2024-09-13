import { useThemeColors } from "@/hooks/useThemeColors";
import { fontSize } from "@/constants/Tokens";
import { StyleSheet } from "react-native";

export const useDynamicStyles = () => {
  const Colors = useThemeColors();

  const defaultStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    text: {
      fontSize: fontSize.base,
      color: Colors.text,
    },
  });

  const utilsStyles = StyleSheet.create({
    centeredRow: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    slider: {
      height: 7,
      borderRadius: 16,
    },
    itemSeparator: {
      borderColor: Colors.textMuted,
      borderWidth: StyleSheet.hairlineWidth,
      opacity: 0.3,
    },
    emptyContentText: {
      ...defaultStyles.text,
      color: Colors.textMuted,
      textAlign: "center",
      marginTop: 20,
    },
    emptyContentImage: {
      width: 200,
      height: 200,
      alignSelf: "center",
      marginTop: 40,
      opacity: 0.3,
    },
  });

  return { defaultStyles, utilsStyles };
};
