import { useCallback, useEffect, useState } from "react";
import { PopupContentType } from "../../../../../types/popup/popup";
import { AppInputField } from "../../../input/app-input-field";
import styles from "./create-playlist-popup-content.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { createPlaylistRequest, getPlaylistsRequest, resetCreatePlaylistStatus } from "../../../../../containers/playlists/playlistsSlice";
import { playlistsSelectors } from "../../../../../containers/playlists/playlistsSelectors";
import { RequestStatus } from "../../../../../types/requests";
import { closePopup } from "../../../../../containers/global/globalSlice";
import { globalSelectors } from "../../../../../containers/global/globalSelectors";
import { LoadingScreen } from "../../../loading-screen/loading-screen";

type CreatePlaylistPopupContentProps = PopupContentType;

export const CreatePlaylistPopupContent: React.FC<CreatePlaylistPopupContentProps> = (props: CreatePlaylistPopupContentProps) => {
	const [playlistName, setPlaylistName] = useState<string>("");
	const [playlistNameError, setPlaylistNameError] = useState<string|undefined>(undefined);
	const [playlistDescription, setPlaylistDescription] = useState<string>("");
	const dispatch = useDispatch();
	const createPlaylistStatus = useSelector(playlistsSelectors.createPlaylistStatus);
	const popupIsOpen = useSelector(globalSelectors.getPopupOpenStatus);

	const playlistNameHasError = typeof playlistNameError === "string";

	const onPlaylistNameInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setPlaylistName(event.target.value)
	}, []);

	const onPlaylistDescriptionInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setPlaylistDescription(event.target.value)
	}, []);

	const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) =>{
		// Do not trigger reload of current page
		e.preventDefault();

		if(playlistName !== ""){
			// reset errors
			setPlaylistNameError(undefined);

			dispatch(createPlaylistRequest({
				name: playlistName,
				description: playlistDescription !== "" ? playlistDescription : undefined,
				public: false,
			}));
		}else{
			setPlaylistNameError("Please fill in a name for this playlist.")
		}
		
	}, [dispatch, playlistDescription, playlistName]);

	// Close popup when succesfully created a playlist
	useEffect(() => {
		
		if(createPlaylistStatus === RequestStatus.SUCCESS && popupIsOpen && !playlistNameHasError){
			dispatch(closePopup());
			// Reset Create Playlist Status to ensure the popup can be opened again
			dispatch(resetCreatePlaylistStatus());
			// Fetch new list of playlists
			dispatch(getPlaylistsRequest());
		}
	}, [dispatch, createPlaylistStatus, popupIsOpen, playlistNameHasError]);

	// Show spinner when create playlist request has been sent
	if(createPlaylistStatus === RequestStatus.PENDING){
		return (
			<div className={styles["loading-screen"]}>
				<LoadingScreen/>
			</div>
		);
	}

	return (
		<div className={styles.root}>
			<div className={styles["title-container"]}>
				<p>{props.title}</p>
			</div>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles["name-input-container"]}>
					<AppInputField
						type="text"
						placeholder="Give your playlist a name."
						value={playlistName}
						onChange={onPlaylistNameInputChange}
					/>

					{playlistNameHasError && (
						<p className={styles.error}>{playlistNameError}</p>
					)}
					
				</div>
				<div className={styles["description-input-container"]}>
					<AppInputField
						type="text"
						placeholder="Give your playlist a description."
						value={playlistDescription}
						onChange={onPlaylistDescriptionInputChange}
					/>
				</div>
				
				<button type="submit" className={styles["btn"]}>Create playlist</button>
			</form>
		</div>
	);
}