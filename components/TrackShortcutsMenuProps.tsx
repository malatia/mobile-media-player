import useFavoritesStore from "@/store/favorites";
import { MenuView } from "@react-native-menu/menu";
import { useRouter } from "expo-router";
import { PropsWithChildren } from "react";
import { Track } from "react-native-track-player";
import { match } from "ts-pattern";

type TrackShortcutsMenuProps = PropsWithChildren<{ track: Track }>;

export const TrackShortcutsMenu = ({
  track,
  children,
}: TrackShortcutsMenuProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const isTrackFavorite = isFavorite(track.url);

  const handlePressAction = (id: string) => {
    match(id)
      .with("add-to-favorites", async () => {
        addFavorite(track);
      })
      .with("remove-from-favorites", async () => {
        removeFavorite(track.url);
      })
      // .with('add-to-playlist', () => {
      // 	// it opens the addToPlaylist modal
      // 	// @ts-expect-error it should work
      // 	router.push({ pathname: '(modals)/addToPlaylist', params: { trackUrl: track.url } })
      // })
      .with("add-to-playlist", () => {
        console.log("Not working yet");
      })
      .otherwise(() => console.warn(`Unknown menu action ${id}`));
  };

  return (
    <MenuView
      onPressAction={({ nativeEvent: { event } }) => handlePressAction(event)}
      actions={[
        {
          id: isTrackFavorite ? "remove-from-favorites" : "add-to-favorites",
          title: isTrackFavorite ? "Remove from favorites" : "Add to favorites",
          image: isTrackFavorite ? "star.fill" : "star",
        },
        {
          id: "add-to-playlist",
          title: "Add to playlist",
          image: "plus",
        },
      ]}
    >
      {children}
    </MenuView>
  );
};
