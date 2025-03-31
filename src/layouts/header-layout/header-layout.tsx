import { useDispatch, useSelector } from 'react-redux';
import { AppInputFieldWithSelectAndResults } from '../../components/shared/input/app-input-field';
import styles from './header-layout.module.scss';
import { playlistsSelectors } from '../../containers/playlists/playlistsSelectors';
import { TrackSearchResult } from '../../components/track/track-item';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { addTrackToPlaylistRequest, getPlaylistsRequest, resetAddTrackToPlaylistStatus, searchTracksRequest, setTracksToDisplay } from '../../containers/playlists/playlistsSlice';
import { debounce } from '../../lib/utils/debounce';
import { RequestStatus } from '../../types/requests';
import { Track } from '../../types/track/track';
import { LoadingScreen } from '../../components/shared/loading-screen/loading-screen';

const DEBOUNCE_KEYSTROKE_INTERVAL_MS = 300;

export function HeaderLayout(){
	const [searchInputValue, setSearchInputValue] = useState<string>("");
	const foundTracks = useSelector(playlistsSelectors.getFoundTracks);
	const searchTracksStatus = useSelector(playlistsSelectors.getSearchTracksStatus);
	const selectedPlaylist = useSelector(playlistsSelectors.getSelectedPlaylist);
	const addTrackToPlaylistStatus = useSelector(playlistsSelectors.getAddTrackToPlaylistStatus);
	const dispatch = useDispatch();

	const addTrackToPlaylist = useCallback((selectedTrackUri: string) => {
		if(typeof selectedPlaylist !== "undefined"){
			dispatch(addTrackToPlaylistRequest({
				playlistId: selectedPlaylist.id,
				trackUri: selectedTrackUri,
			}))
		}
	}, [dispatch, selectedPlaylist]);

	// Lightweight version of debounce
	const debouncedInputChange = useMemo(() => {
		return debounce((value: string) => {
			if(value !== ""){
				dispatch(searchTracksRequest(value));
			}
		}, DEBOUNCE_KEYSTROKE_INTERVAL_MS);
	}, [dispatch]);

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInputValue(e.target.value);
		debouncedInputChange(e.target.value);
	}, [debouncedInputChange]);

	// Set new tracks to display once a track has been added successfully  
	useEffect(() => {
		if(addTrackToPlaylistStatus === RequestStatus.SUCCESS){
			dispatch(setTracksToDisplay());
			// Always reset to idle state
			dispatch(resetAddTrackToPlaylistStatus());
			// Fetch new list of playlists => update image of playlist
			dispatch(getPlaylistsRequest());
		}
	}, [addTrackToPlaylistStatus, dispatch]);

	return(
		<div className={styles.root}>
			<div className={styles["search-input"]}>
				<AppInputFieldWithSelectAndResults
					placeholder="Search track"
					onChange={handleInputChange}
					value={searchInputValue}
				>
					<TrackSearchItemsContainer
						tracks={foundTracks}
						searchTracksStatus={searchTracksStatus}
						addTrackToPlaylist={addTrackToPlaylist}
					/>
				</AppInputFieldWithSelectAndResults>
			</div>
		</div>
	)
}

type TrackSearchItemsContainerProps = {
	tracks?: Track[],
	searchTracksStatus: RequestStatus,
	addTrackToPlaylist: (selectedTrackUri: string) => void,
}

function TrackSearchItemsContainer(props: TrackSearchItemsContainerProps){
	switch(props.searchTracksStatus){
		case RequestStatus.SUCCESS:
			if(typeof props.tracks !== "undefined" && props.tracks.length > 0){
				return (
					<>
						{
							props.tracks.map((track) => {
								return (
									<div key={track.id}>
										<div className={styles["track-item-container"]}>
											<TrackSearchResult
												onAddClick={props.addTrackToPlaylist}
												{...track}
											/>
										</div>
									</div>
								);
							})
						}
					</>
						
				);
			}

			return <></>;
		case RequestStatus.PENDING:
			return (
				<LoadingScreen/>
			);
		default:
			return (
				<div className={styles["empty-search-item"]}>
					Please provide a search term.
				</div>
			)
	}
}
