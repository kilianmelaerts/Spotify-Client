import { useMemo } from "react";
import { Playlist } from "../../types/playlist/playlist";
import styles from "./playlist-item.module.scss";

type PlaylistProps = Playlist & {
	onPlaylistClick: (playlist: Playlist) => void,
}

export function PlaylistItem(props: PlaylistProps){
	const { onPlaylistClick, ...remainingProps } = props;

	const currentplaylist: Playlist = remainingProps;

	const imgUrl = useMemo(() => {
		if(props.images !== null && props.images.length > 0)
			return props.images[0].url;
	}, [props.images]);

	return (
		<div className={styles.root} onClick={() => onPlaylistClick(currentplaylist)}>
			<div className={styles["playlist-img-container"]}>
				{typeof imgUrl !== "undefined" && (
					<img className={styles["playlist-img"]} alt="album-cover" src={imgUrl}/>
				)}
			</div>
			<div className={styles["details-container"]}>
				<p className={styles.name}>{props.name}</p>
				{
					typeof props.description !== "undefined" && props.description !== "" &&(
						<p className={styles.description}>{props.description}</p>
					)
				}
			</div>
		</div>
	);
}