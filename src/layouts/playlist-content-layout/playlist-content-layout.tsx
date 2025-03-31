import { useDispatch, useSelector } from 'react-redux';
import { TrackItem } from '../../components/track/track-item';
import styles from './playlist-content-layout.module.scss';
import { playlistsSelectors } from '../../containers/playlists/playlistsSelectors';
import { RequestStatus } from '../../types/requests';
import { Track } from '../../types/track/track';
import { LoadingScreen } from '../../components/shared/loading-screen/loading-screen';
import { useCallback, useEffect } from 'react';
import { deleteTrackFromPlaylistRequest, getPlaylistsRequest, resetDeleteTrackFromPlaylistStatus, setTracksToDisplay } from '../../containers/playlists/playlistsSlice';

export function PlaylistContentLayout(){
	const tracksToDisplay = useSelector(playlistsSelectors.getTracksToDisplay);
	const tracksToDisplayRequestStatus = useSelector(playlistsSelectors.setTracksToDisplayStatus);
	const deleteTrackFromPlaylistStatus = useSelector(playlistsSelectors.getDeleteTrackFromPlaylistStatus);
	const selectedPlaylist = useSelector(playlistsSelectors.getSelectedPlaylist);
	const dispatch = useDispatch();

	const deleteTrackFromPlaylist = useCallback((selectedTrackUri: string) => {
		if(typeof selectedPlaylist !== "undefined"){
			dispatch(deleteTrackFromPlaylistRequest({
					playlistId: selectedPlaylist.id,
				trackUri: selectedTrackUri,
			}));
		}
	}, [dispatch, selectedPlaylist]);

	// Set new tracks to display once a track has been deleted successfully  
	useEffect(() => {
		if(deleteTrackFromPlaylistStatus === RequestStatus.SUCCESS){
			dispatch(setTracksToDisplay());
			// Always reset to idle state
			dispatch(resetDeleteTrackFromPlaylistStatus());
			// Fetch new list of playlists => update image of playlist
			dispatch(getPlaylistsRequest());
		}
	}, [deleteTrackFromPlaylistStatus, dispatch]);

	return(
		<div className={styles.root}>
			<div className={styles.header}>
				<div className={styles["cover-container"]}>
					<p>Cover</p>
				</div>
				<div className={styles["name-container"]}>
					<p>Name</p>
				</div>
				<div className={styles["album-container"]}>
					<p>Album</p>
				</div>
				<div className={styles["release-date-container"]}>
					<p>Release date</p>
				</div>
			</div>
			<div className={styles["tracks-container"]}>
				<PlaylistContent
					tracks={tracksToDisplay}
					tracksToDisplayStatus={tracksToDisplayRequestStatus}
					onDeleteTrackClick={deleteTrackFromPlaylist}
				/>
			</div>
		</div>
	)
}

type PlaylistContentProps = {
	tracks?: Track[];
	tracksToDisplayStatus: RequestStatus,
	onDeleteTrackClick: (selectedTrackUri: string) => void,
}

function PlaylistContent(props: PlaylistContentProps){
	switch(props.tracksToDisplayStatus){
		case RequestStatus.PENDING:
			return (<LoadingScreen/>);
		case RequestStatus.SUCCESS:
			if(typeof props.tracks !== "undefined"){
				return (
					<div>
						{
							props.tracks.map((t) => {
								return (
									<div key={t.id} className={styles["track-item-container"]}>
										<TrackItem
											onDeleteClick={props.onDeleteTrackClick}
											{...t}
										/>
									</div>
								);
							})
						}
					</div>
				)
			}

			return <></>;
		default:
			return <></>;
	}
}