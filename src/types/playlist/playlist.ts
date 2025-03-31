type PlaylistImage = {
	/** Height of the image */
	height: string | null,
	/** Width of the image */
	width: string | null,
	/** Url */
	url: string,
}

export type Playlist = {
	id: string,
	name: string,
	description: string | null,
	/** List of images of this playlist. */
	images: PlaylistImage[] | null,
	/** List of tracks metadata inside this playlist */
	tracks: PlaylistTracksMetaData | null,
}

type PlaylistTracksMetaData = {
	// Api endpoint where you find the details of the tracks
	href: string,
	total: number,
}