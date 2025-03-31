export type Track = {
	id: string,
	/** Name track */
	name: string,
	/** Album this track belongs to */
	album: Album,
	/** Artists that worked on this track */
	artists: [
		{
			name: string,
		}
	],
	/** Track uri */
	uri: string,
}

export type Album = {
	name: string,
	images: [
		{
			url: string,
		}
	],
	release_date: string,
}