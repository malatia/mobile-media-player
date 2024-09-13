import { StackScreenWithSearchBar } from "@/constants/layout";
import { useDynamicStyles } from '@/hooks/useDynamicStyles';
import { Stack } from "expo-router";
import { View } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";


export default function ArtistsScreenLayout(){
    const Colors = useThemeColors()
    const { defaultStyles } = useDynamicStyles()
    return(
        <View style={ defaultStyles.container }>
            <Stack>
                <Stack.Screen name ="index" options={{
                    headerTitle: "Artist",
                    headerTintColor: Colors.text,
                    ...StackScreenWithSearchBar,
                }}/>
            </Stack>
        </View>
    )
}