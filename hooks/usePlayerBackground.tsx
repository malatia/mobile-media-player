import { useEffect, useState } from "react";
import { getColors } from "react-native-image-colors";
import {
  AndroidImageColors,
  IOSImageColors,
} from "react-native-image-colors/build/types";
import { useThemeColors } from "./useThemeColors";

export const usePlayerBackground = (imageUrl: string) => {
  const [imageColors, setImageColors] = useState<AndroidImageColors | null>(
    null
  );
  const Colors = useThemeColors();

  useEffect(() => {
    getColors(imageUrl, {
      fallback: Colors.background,
      cache: true,
      key: imageUrl,
      pixelSpacing: 10,
    }).then((Colors) => setImageColors(Colors as AndroidImageColors));
  }, [imageUrl]);

  return { imageColors };
};
