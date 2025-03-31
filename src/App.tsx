import "./styles/main.scss";
import styles from "./App.module.scss";
import { FC, ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { MainLayout } from "./layouts/main-layout/main-layout";
import { PlaylistContentLayout } from "./layouts/playlist-content-layout/playlist-content-layout";
import { PlaylistsLayout } from "./layouts/playlists-layout/playlists-layout";
import { getPlaylistsRequest } from "./containers/playlists/playlistsSlice";

const App: FC = (): ReactElement => {
	const dispatch = useDispatch();
	
	useEffect(() => {
		// Trigger saga to fetch playlists
		dispatch(getPlaylistsRequest());
	}, [dispatch]);

	// TODO: You can access user data and now fetch user's playlists

	return (
		<MainLayout className={styles.root}>
			<PlaylistsLayout />
			<PlaylistContentLayout/>
		</MainLayout>
	);
};

export default App;
