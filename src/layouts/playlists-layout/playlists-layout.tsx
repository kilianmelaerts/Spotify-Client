import { useDispatch, useSelector } from "react-redux";
import styles from "./playlists-layout.module.scss";
import { playlistsSelectors } from "../../containers/playlists/playlistsSelectors";
import { PlaylistItem } from "../../components/playlist/playlist-item";
import { useCallback, useEffect } from "react";
import { setSelectedPlaylist, setTracksToDisplay } from "../../containers/playlists/playlistsSlice";
import { Playlist } from "../../types/playlist/playlist";
import { openPopup } from "../../containers/global/globalSlice";

export type PlaylistsLayoutProps = {
}

export function PlaylistsLayout(props: PlaylistsLayoutProps){
	const dispatch = useDispatch();
	const playlists = useSelector(playlistsSelectors.getPlaylists);
	const selectedPlaylist = useSelector(playlistsSelectors.getSelectedPlaylist);

	const onPlaylistClick = useCallback((playlist: Playlist) => {
		dispatch(setSelectedPlaylist(playlist));
	}, [dispatch]);

	const onCreatePlaylistClick = useCallback(() => {
		dispatch(openPopup());
	}, [dispatch]);

	useEffect(() => {
		if(typeof selectedPlaylist !== "undefined"){
			dispatch(setTracksToDisplay());
		}
	}, [dispatch, selectedPlaylist]);

	return (
		<div className={styles.root}>
			<div className={styles["create-playlist-header"]}>
				<div className={styles["create-playlist-btn"]} onClick={onCreatePlaylistClick}>
					<p>+ Create a playlist</p>
				</div>
			</div>
			<div className={styles["playlists-container"]}>
				{
					playlists.map((playlist) => {
						return (
							<div key={playlist.id} className={styles["playlist-container"]}>
								<PlaylistItem
									{...playlist}
									onPlaylistClick={onPlaylistClick}
								/>
							</div>
						);
					})
				}
			</div>
		</div>
	);
}