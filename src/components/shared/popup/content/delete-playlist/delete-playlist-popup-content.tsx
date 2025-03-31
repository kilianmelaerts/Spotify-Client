import { useCallback } from "react";
import { PopupContentType } from "../../../../../types/popup/popup";
import styles from "./delete-playlist-popup-content.module.scss";

type CreatePlaylistPopupContentProps = PopupContentType;

// Currently only here to test popupswitch
export const DeletePlaylistPopupContent: React.FC<CreatePlaylistPopupContentProps> = (props: CreatePlaylistPopupContentProps) => {
	const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) =>{
		// Do not trigger reload of current page
		e.preventDefault();
	}, []);

	return (
		<div className={styles.root}>
			<div className={styles["title-container"]}>
				<p>{props.title}</p>
			</div>
			<form className={styles.form} onSubmit={handleSubmit}>
				<button type="submit" className={styles["btn"]}>Delete</button>
			</form>
		</div>
	);
}