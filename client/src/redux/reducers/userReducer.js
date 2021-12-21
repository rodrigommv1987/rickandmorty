import {
  UPDATE_FAVORITE_SUCCESS,
  GET_CHARACTER_SUCCESS,
  GET_CHARACTERS_SUCCESS,
} from "../actions/actionTypes";

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case GET_CHARACTERS_SUCCESS: {
      const { userData } = action.data;
      return { ...state, userData };
    }
    case GET_CHARACTER_SUCCESS: {
      const { userData } = action.data;
      return { ...state, userData };
    }
    case UPDATE_FAVORITE_SUCCESS: {
      const { userData } = action.data;
      return {
        ...state,
        userData,
      };
    }
    default:
      return state;
  }
}
