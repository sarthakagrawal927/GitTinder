import {
  GET_PROFILE,
  GET_PROFILE_POSTS,
  NO_PROFILE_POSTS,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_LEADERBOARD,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  posts: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
    case GET_LEADERBOARD:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        posts: [],
      };
    case GET_PROFILE_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case NO_PROFILE_POSTS:
      return {
        ...state,
        posts: [],
      };
    default:
      return state;
  }
}
