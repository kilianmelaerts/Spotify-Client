import { useMemo } from "react";
import styles from "./track-item.module.scss";
import { Track } from "../../types/track/track";
import { AppButton, AppButtonVariation } from "../shared/button/app-button";
import { BinIcon, PlusIcon } from "../shared/icons/icons";

type TrackProps =  Track & {
	onDeleteClick: (selectedTrackUri: string) => void,
};

export function TrackItem(props: TrackProps){
	// Go over artists of the given album and concat
	const artists = useMemo(() => {
		if(typeof props.artists !== "undefined"){
			let artistNamesToDisplay = [];

			for (let i = 0; i < props.artists.length; i++) {
				const artist = props.artists[i];
				artistNamesToDisplay.push(artist.name);
			}

			const result = artistNamesToDisplay.join(" ")

			return result;
		}
	}, [props.artists])

	const imgUrl = useMemo(() => {
		if(typeof props.album.images !== "undefined")
			return props.album.images[0].url;
	}, [props.album.images]);

	return(
		<article className={styles["track-container"]}>
			<div className={styles.cover}>
				{typeof imgUrl !== "undefined" && (
					<img className={styles["playlist-img"]} alt="album-cover" src={imgUrl}/>
				)}
			</div>

			<div className={styles["track-name-and-artist-container"]}>
				<p className={styles["track-name"]}>{props.name}</p>

				{typeof props.artists !== "undefined" && (
					<div className={styles["artist-container"]}>	
						<p className={styles.artists}>{artists}</p>
					</div>
				)}
				
			</div>

			<div className={styles["album-name"]}>
				<p>{props.album.name}</p>
			</div>
			
			<div className={styles["release-date"]}>
				<p>{props.album.release_date}</p>
			</div>

			<div className={styles["delete-track-btn-container"]}>
				<AppButton
					onClick={() => props.onDeleteClick(props.uri)}
					className={styles["delete-track-button"]}
					variation={AppButtonVariation.Transparant}
				>
					<BinIcon className={styles.icon}/>
				</AppButton>
			</div>
			
		</article>
	);
}

type TrackSearchResultProps = Track & {
	onAddClick: (selectedTrackUri: string) => void,
}

export function TrackSearchResult(props: TrackSearchResultProps){
	// Go over artists of the given album and concat
	const artists = useMemo(() => {
		if(typeof props.artists !== "undefined"){
			let artistNamesToDisplay = [];

			for (let i = 0; i < props.artists.length; i++) {
				const artist = props.artists[i];
				artistNamesToDisplay.push(artist.name);
			}

			const result = artistNamesToDisplay.join(" ")

			return result;
		}
	}, [props.artists]);

	const imgUrl = useMemo(() => {
		if(typeof props.album.images !== "undefined")
			return props.album.images[0].url;
	}, [props.album.images]);

	return(
		<article className={styles["found-track-container"]}>
			<div className={styles["found-track-cover"]}>
				{typeof imgUrl !== "undefined" && (
					<img className={styles["playlist-img"]} alt="album-cover" src={imgUrl}/>
				)}
			</div>

			<div className={styles["track-name-and-artist-container"]}>
				<p className={styles["found-track-name"]}>{props.name}</p>

				{typeof props.artists !== "undefined" && (
					<div className={styles["found-track-artist-container"]}>	
						<p className={styles["found-track-artist"]}>{artists}</p>
					</div>
				)}
				
			</div>

			<div>
				<p className={styles["found-track-album-name"]}>{props.album.name}</p>
			</div>


			<div className={styles["add-track-btn-container"]}>
				<AppButton
					onClick={() => props.onAddClick(props.uri)}
					className={styles["add-track-button"]}
					variation={AppButtonVariation.Default}
				>
					<PlusIcon className={styles.icon}/>
				</AppButton>
			</div>
		</article>
	);
}