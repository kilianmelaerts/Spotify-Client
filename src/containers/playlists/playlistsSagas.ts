import axios from "axios";

import { all, call, put, select, takeEvery } from "@redux-saga/core/effects";

import { authSelectors } from "../auth/selectors";
import { getPlaylistsRequest, setPlaylistsSuccess, setPlaylistsFailed, setTracksToDisplaySuccess, setTracksToDisplayFailure, setTracksToDisplay, createPlaylistSuccess, createPlaylistFailure, createPlaylistRequest, searchTracksRequest, searchTracksSuccess, searchTracksFailure, AddTrackFromPlaylistPayload, addTrackToPlaylistSuccess, addTrackToPlaylistFailure, addTrackToPlaylistRequest, setSelectedPlaylist, DeleteTrackFromPlaylistPayload, deleteTrackFromPlaylistSuccess, deleteTrackFromPlaylistFailure, deleteTrackFromPlaylistRequest } from "./playlistsSlice";
import { CreatePlaylistRequestBody, SpotifyAddTrackToPlaylistResponse, SpotifyCreatePlaylistResponse, SpotifySearchTracktResponse, SpotifyGetTracksFromPlaylistResponse, SpotifyGetUserPlaylistsResponse, SpotifyDeleteTrackFromPlaylistResponse } from "../../types/spotify-request-types/spotify-request-types";
import { playlistsSelectors } from "./playlistsSelectors";
import { Playlist } from "../../types/playlist/playlist";
import { User } from "../auth/slice";
import { PayloadAction } from "@reduxjs/toolkit";
import { Track } from "../../types/track/track";

function* getPlaylistsSaga() {
  
  try{
    // Get access token from authSlice (using authSelector)
    const accessToken: string = yield select(authSelectors.getAccessToken);
    
    const request = () =>
      axios.get<SpotifyGetUserPlaylistsResponse>(`https://api.spotify.com/v1/me/playlists`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      
    const response: SpotifyGetUserPlaylistsResponse = yield call(request);

    // Request has succeeded!
    if(response.status === 200 && typeof response.data.items !== "undefined")
      yield put(setPlaylistsSuccess(response.data.items));

  } catch(error: any) {
    yield put(setPlaylistsFailed({ message: error.message }));
  } 
}

function* getTracksFromPlaylistSaga() {
  try{
    // Get access token from authSlice (using authSelector)
    const accessToken: string = yield select(authSelectors.getAccessToken);

    const selectedPlaylist: Playlist | undefined = yield select(playlistsSelectors.getSelectedPlaylist);

    if(typeof selectedPlaylist === "undefined" || selectedPlaylist.tracks === null)
      return;
    
    const tracksApiHref = selectedPlaylist.tracks.href;
    
    const request = () =>
      axios.get<SpotifyGetTracksFromPlaylistResponse>(tracksApiHref, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      
    const response: SpotifyGetTracksFromPlaylistResponse = yield call(request);
    
    // Request has succeeded!
    if(response.status === 200 && typeof response.data.items !== "undefined"){
      // Keep a list of all tracks
      const tracks: Track[] = [];
      for (let i = 0; i < response.data.items.length; i++) {
        const track = response.data.items[i].track;
        tracks.push(track);
      }

      yield put(setTracksToDisplaySuccess(tracks));
    }

  } catch(error: any) {
    yield put(setTracksToDisplayFailure({ message: error.message }));
  } 
}

function* createPlaylistSaga(action: PayloadAction<CreatePlaylistRequestBody>) {

  try{
    // Get access token from authSlice (using authSelector)
    const accessToken: string = yield select(authSelectors.getAccessToken);

    // Get current signed in user
    const user: User = yield select(authSelectors.getUser);

    const { name, description, public: playlistIsPublic } = action.payload;
    
    const request = () =>
      axios.post<SpotifyCreatePlaylistResponse>(`https://api.spotify.com/v1/users/${user.userId}/playlists`,
        {
          name: name,
          description: description,
          public: playlistIsPublic,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
    
    const response: SpotifyCreatePlaylistResponse = yield call(request);

    // Request has succeeded!
    if(response.status === 201)
      yield put(createPlaylistSuccess(response.data));

  } catch(error: any) {
    yield put(createPlaylistFailure({ message: error.message }));
  }
}

function* searchTrackSaga(action: PayloadAction<string>) {
  try{
    // Get access token from authSlice (using authSelector)
    const accessToken: string = yield select(authSelectors.getAccessToken);
    
    const request = () =>
      axios.get<SpotifySearchTracktResponse>(`https://api.spotify.com/v1/search?q=${action.payload}&type=track`,
        {
          headers: { Authorization: `Bearer ${accessToken}`},
        }
      );
      
    const response: SpotifySearchTracktResponse = yield call(request);
  
    // Request has succeeded!
    if(response.status === 200 && typeof response.data.tracks.items !== "undefined"){
      // Keep a list of all tracks
      const tracks: Track[] = [];
      for (let i = 0; i < response.data.tracks.items.length; i++) {
        const track = response.data.tracks.items[i];
        tracks.push(track);
      }

      yield put(searchTracksSuccess(tracks));
    }
  } catch(error: any) {
    yield put(searchTracksFailure({ message: error.message }));
  } 
}

function* addTrackToPlaylistSaga(action: PayloadAction<AddTrackFromPlaylistPayload>) {
  try{
    // Get access token from authSlice (using authSelector)
    const accessToken: string = yield select(authSelectors.getAccessToken);
    
    const request = () =>
      axios.post<SpotifyAddTrackToPlaylistResponse>(`https://api.spotify.com/v1/playlists/${action.payload.playlistId}/tracks`,
        {
          uris: [action.payload.trackUri]
        },
        {
          headers: { Authorization: `Bearer ${accessToken}`},
        },
      );
      
    const response: SpotifyAddTrackToPlaylistResponse = yield call(request);
  
    // Request has succeeded!
    if(response.status === 201){
      yield put(addTrackToPlaylistSuccess());
    }

  } catch(error: any) {
    yield put(addTrackToPlaylistFailure({ message: error.message }));
  } 
}

function* deleteTrackFromPlaylistSaga(action: PayloadAction<DeleteTrackFromPlaylistPayload>) {
  try{
    // Get access token from authSlice (using authSelector)
    const accessToken: string = yield select(authSelectors.getAccessToken);
    
    const request = () =>
      axios.delete<SpotifyDeleteTrackFromPlaylistResponse>(`https://api.spotify.com/v1/playlists/${action.payload.playlistId}/tracks`,
        {
          data: {
            tracks: [
              {
                uri: action.payload.trackUri,
              }
            ]
          },
          headers: { Authorization: `Bearer ${accessToken}`},
        },
      );
      
    const response: SpotifyDeleteTrackFromPlaylistResponse = yield call(request);
    
    // Request has succeeded!
    if(response.status === 200){
      yield put(deleteTrackFromPlaylistSuccess());
    }

  } catch(error: any) {
    yield put(deleteTrackFromPlaylistFailure({ message: error.message }));
  } 
}

// Worker
export default function* playlistsSaga() {
  yield all([
    takeEvery(getPlaylistsRequest.type, getPlaylistsSaga),
    takeEvery(setTracksToDisplay.type, getTracksFromPlaylistSaga),
    takeEvery(createPlaylistRequest.type, createPlaylistSaga),
    takeEvery(searchTracksRequest.type, searchTrackSaga),
    takeEvery(addTrackToPlaylistRequest.type, addTrackToPlaylistSaga),
    takeEvery(deleteTrackFromPlaylistRequest.type, deleteTrackFromPlaylistSaga),
  ]);
}
