import { AppPopupContainer } from "../container/app-popup-container"
import { CreatePlaylistPopupContent } from "../content/create-playlist/create-playlist-popup-content"
import { DeletePlaylistPopupContent } from "../content/delete-playlist/delete-playlist-popup-content";

export enum PopupTypes {
	CreatePlaylist = "CREATE_PLAYLIST",
	DeletePlaylist = "DELETE_PLAYLIST",
}

type PopupSwitchProps = {
	popupType: PopupTypes,
}

export function PopupSwitch(props: PopupSwitchProps){
	switch(props.popupType){
		case PopupTypes.CreatePlaylist:
			return (
				<AppPopupContainer>
					<CreatePlaylistPopupContent
						title="Create your playlist!"
					/>
				</AppPopupContainer>
			);
		case PopupTypes.DeletePlaylist:
			return(
				<AppPopupContainer>
					<DeletePlaylistPopupContent
						title="Delete your playlist?"
					/>
				</AppPopupContainer>
			);
		default: return null;
	}
};