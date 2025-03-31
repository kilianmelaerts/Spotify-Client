import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPlaylistsRequest } from "./playlistsSlice";

type PlaylistsProviderProps = {
  children: ReactNode;
};

/**
 * 
 * @param props PlaylistsProviderProps
 * @returns JSX.Element
 */
function PlaylistsProvider(props: PlaylistsProviderProps) {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //     dispatch(getPlaylists());
  //   }, [dispatch]);

  return <>{props.children}</>;
};

export default PlaylistsProvider;
