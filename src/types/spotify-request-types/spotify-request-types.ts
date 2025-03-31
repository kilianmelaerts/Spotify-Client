import { Playlist } from "../playlist/playlist"
import { Track } from "../track/track"

// Get User playlists response
type GetUserPlaylists200Response = {
	status: 200,
	data: GetUserPlaylists200ResponseBody,
}

type GetUserPlaylists200ResponseBody = {
	items?: Playlist[],
}

type GetUserPlaylistsErrorResponse = {
	status: 401 | 403 | 429,
	data: GetUserPlaylistsErrorResponseBody,
}

type GetUserPlaylistsErrorResponseBody = {
	status: number,
	message: string,
}

export type SpotifyGetUserPlaylistsResponse = (GetUserPlaylists200Response | GetUserPlaylistsErrorResponse);

// get tracks from playlist response
type GetTracksFromPlaylist200Response = {
	status: 200,
	data: GetTracksFromPlaylist200ResponseBody,
}

type PlaylistItem = {
	track: Track,
}

type GetTracksFromPlaylist200ResponseBody = {
	items?: PlaylistItem[],
}

type GetTracksFromPlaylistErrorResponse = {
	status: 401 | 403 | 429,
	data: GetTracksFromPlaylistErrorResponseBody,
}

type GetTracksFromPlaylistErrorResponseBody = {
	status: number,
	message: string,
}

export type SpotifyGetTracksFromPlaylistResponse = (GetTracksFromPlaylist200Response | GetTracksFromPlaylistErrorResponse);

// Create playlist response
type CreatePlaylist201Response = {
	status: 201,
	data: CreatePlaylist200ResponseBody,
}

type CreatePlaylist200ResponseBody = Playlist;

type CreatePlaylistErrorResponse = {
	status: 401 | 403 | 429,
	data: CreatePlaylistErrorResponseBody,
}

type CreatePlaylistErrorResponseBody = {
	status: number,
	message: string,
}

export type CreatePlaylistRequestBody= {
	name: string,
	description?: string,
	public: boolean,
}

export type SpotifyCreatePlaylistResponse = (CreatePlaylist201Response | CreatePlaylistErrorResponse);

// Search Track response
type SearchTrack200Response = {
	status: 200,
	data: SearchTrack200ResponseBody,
}

type SearchTrack200ResponseBody = {
	tracks: {
		items?: Track[],
	}
};

type SearchTrackErrorResponse = {
	status: 401 | 403 | 429,
	data: SearchTrackErrorResponseBody,
}

type SearchTrackErrorResponseBody = {
	status: number,
	message: string,
}

export type SpotifySearchTracktResponse = (SearchTrack200Response | SearchTrackErrorResponse);


// Add track to playlist response
type AddTrackToPlaylist201Response = {
	status: 201,
	data: AddTrackToPlaylist201ResponseBody,
}

type AddTrackToPlaylist201ResponseBody = {
	snapshot_id: string,
};

type AddTrackToPlaylistErrorResponse = {
	status: 401 | 403 | 429,
	data: AddTrackToPlaylistErrorResponseBody,
}

type AddTrackToPlaylistErrorResponseBody = {
	status: number,
	message: string,
}

export type SpotifyAddTrackToPlaylistResponse = (AddTrackToPlaylist201Response | AddTrackToPlaylistErrorResponse);

// Delete track from playlist response
type DeleteTrackFromPlaylist201Response = {
	status: 200,
	data: DeleteTrackFromPlaylist201ResponseBody,
}

type DeleteTrackFromPlaylist201ResponseBody = {
	snapshot_id: string,
};

type DeleteTrackFromPlaylistErrorResponse = {
	status: 401 | 403 | 429,
	data: DeleteTrackFromPlaylistErrorResponseBody,
}

type DeleteTrackFromPlaylistErrorResponseBody = {
	status: number,
	message: string,
}

export type SpotifyDeleteTrackFromPlaylistResponse = (DeleteTrackFromPlaylist201Response | DeleteTrackFromPlaylistErrorResponse);

