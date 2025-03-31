import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

const selectSelf = (state: RootState) => state.playlists;

export const playlistsSelectors = {
  getPlaylists: createSelector(selectSelf, (playlists) => playlists.playlists),
  getPlaylistsStatus: createSelector(selectSelf, (playlists) => playlists.getPlaylistsStatus),
  getSelectedPlaylist: createSelector(selectSelf, (playlists) => playlists.selectedPlaylist),
  getTracksToDisplay: createSelector(selectSelf, (playlists) => playlists.tracksToDisplay),
  setTracksToDisplayStatus: createSelector(selectSelf, (playlists) => playlists.setTracksToDisplayStatus),
  getFoundTracks: createSelector(selectSelf, (playlists) => playlists.foundTracks),
  getSearchTracksStatus: createSelector(selectSelf, (playlists) => playlists.searchTracksStatus),
  createPlaylistStatus: createSelector(selectSelf, (playlists) => playlists.createPlaylistStatus),
  getAddTrackToPlaylistStatus: createSelector(selectSelf, (playlists) => playlists.addTrackToPlaylistStatus),
  getDeleteTrackFromPlaylistStatus: createSelector(selectSelf, (playlists) => playlists.deleteTrackFromPlaylistStatus),
};
