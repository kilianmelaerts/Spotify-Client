import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RequestStatus } from "../../types/requests";
import { Playlist } from "../../types/playlist/playlist";
import { Track } from "../../types/track/track";
import { CreatePlaylistRequestBody } from "../../types/spotify-request-types/spotify-request-types";


// TODO: Needs to be split up into playlistSlice and TracksSlice

export type AddTrackFromPlaylistPayload = {
  playlistId: string,
  trackUri: string,
}

export type DeleteTrackFromPlaylistPayload = {
  playlistId: string,
  trackUri: string,
}

export type PlaylistsState = {
  selectedPlaylist?: Playlist,
  tracksToDisplay?: Track[],
  foundTracks?: Track[], 
  playlists: Playlist[],
  getPlaylistsStatus: RequestStatus,
  setTracksToDisplayStatus: RequestStatus,
  createPlaylistStatus: RequestStatus,
  searchTracksStatus: RequestStatus,
  addTrackToPlaylistStatus: RequestStatus,
  deleteTrackFromPlaylistStatus: RequestStatus,
  error?: string;
}

const initialState: PlaylistsState = {
  playlists: [],
  getPlaylistsStatus: RequestStatus.IDLE,
  setTracksToDisplayStatus: RequestStatus.IDLE,
  createPlaylistStatus: RequestStatus.IDLE,
  searchTracksStatus: RequestStatus.IDLE,
  addTrackToPlaylistStatus: RequestStatus.IDLE,
  deleteTrackFromPlaylistStatus: RequestStatus.IDLE,
};

const playlistsSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    getPlaylistsRequest: (state) => {
      state.getPlaylistsStatus = RequestStatus.PENDING;
    },
    setPlaylistsSuccess: (state, action: PayloadAction<Playlist[]>) => {
      state.playlists = action.payload;
      state.getPlaylistsStatus = RequestStatus.SUCCESS;
    },
    setPlaylistsFailed: (state, action) => {
      state.error = action.payload;
      state.getPlaylistsStatus = RequestStatus.ERROR;
    },
    setSelectedPlaylist: (state, action: PayloadAction<Playlist>) => {
      state.selectedPlaylist = action.payload;
    },
    setTracksToDisplay: (state) => {
      state.setTracksToDisplayStatus = RequestStatus.PENDING;
    },
    setTracksToDisplaySuccess: (state, action: PayloadAction<Track[]>) => {
      state.tracksToDisplay = action.payload;
      state.setTracksToDisplayStatus = RequestStatus.SUCCESS;
    },
    setTracksToDisplayFailure: (state, action) => {
      state.error = action.payload;
      state.setTracksToDisplayStatus = RequestStatus.ERROR;
    },
    resetCreatePlaylistStatus: (state) => {
      state.createPlaylistStatus = RequestStatus.IDLE;
    },
    createPlaylistRequest: (state, action: PayloadAction<CreatePlaylistRequestBody>) => {
      state.createPlaylistStatus = RequestStatus.PENDING;
    },
    createPlaylistSuccess: (state, action: PayloadAction<Playlist>) => {
      state.playlists.unshift(action.payload);
      state.createPlaylistStatus = RequestStatus.SUCCESS;
    },
    createPlaylistFailure: (state, action) => {
      state.error = action.payload;
      state.createPlaylistStatus = RequestStatus.ERROR;
    },
    searchTracksRequest: (state, action: PayloadAction<string>) => {
      state.searchTracksStatus = RequestStatus.PENDING;
    },
    searchTracksSuccess: (state, action: PayloadAction<Track[]|undefined>) => {
      state.foundTracks = action.payload;
      state.searchTracksStatus = RequestStatus.SUCCESS;
    },
    searchTracksFailure: (state, action) => {
      state.error = action.payload;
      state.searchTracksStatus = RequestStatus.ERROR;
    },
    emptySearchTracksResults: (state) => {
      state.foundTracks = [];
    },
    addTrackToPlaylistRequest: (state, action: PayloadAction<AddTrackFromPlaylistPayload>) => {
      state.addTrackToPlaylistStatus = RequestStatus.PENDING;
    },
    addTrackToPlaylistSuccess: (state) => {
      state.addTrackToPlaylistStatus = RequestStatus.SUCCESS;
    },
    addTrackToPlaylistFailure: (state, action) => {
      state.error = action.payload;
      state.addTrackToPlaylistStatus = RequestStatus.ERROR;
    },
    resetAddTrackToPlaylistStatus: (state) => {
      state.addTrackToPlaylistStatus = RequestStatus.IDLE;
    },
    deleteTrackFromPlaylistRequest: (state, action: PayloadAction<DeleteTrackFromPlaylistPayload>) => {
      state.deleteTrackFromPlaylistStatus = RequestStatus.PENDING;
    },
    deleteTrackFromPlaylistSuccess: (state) => {
      state.deleteTrackFromPlaylistStatus = RequestStatus.SUCCESS;
    },
    deleteTrackFromPlaylistFailure: (state, action) => {
      state.error = action.payload;
      state.deleteTrackFromPlaylistStatus = RequestStatus.ERROR;
    },
    resetDeleteTrackFromPlaylistStatus: (state) => {
      state.deleteTrackFromPlaylistStatus = RequestStatus.IDLE;
    },

  },
});

export const {
  getPlaylistsRequest,
  setPlaylistsSuccess,
  setPlaylistsFailed,
  setSelectedPlaylist,
  setTracksToDisplay,
  setTracksToDisplayFailure,
  setTracksToDisplaySuccess,
  resetCreatePlaylistStatus,
  createPlaylistRequest,
  createPlaylistSuccess,
  createPlaylistFailure,
  searchTracksRequest,
  searchTracksSuccess,
  searchTracksFailure,
  addTrackToPlaylistRequest,
  addTrackToPlaylistSuccess,
  addTrackToPlaylistFailure,
  resetAddTrackToPlaylistStatus,
  deleteTrackFromPlaylistRequest,
  deleteTrackFromPlaylistSuccess,
  deleteTrackFromPlaylistFailure,
  resetDeleteTrackFromPlaylistStatus,
} = playlistsSlice.actions;

export default playlistsSlice.reducer;
