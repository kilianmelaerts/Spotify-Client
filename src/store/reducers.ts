import { combineReducers } from "redux";

import global from "../containers/global/globalSlice";
import authentication from "../containers/auth/slice";
import playlists from "../containers/playlists/playlistsSlice";

const rootReducer = combineReducers({
  global,
  authentication,
  playlists,
});

export default rootReducer;
