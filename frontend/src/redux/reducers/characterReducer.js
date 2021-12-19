import {
  GET_CHARACTER_SUCCESS,
  GET_CHARACTERS_SUCCESS,
} from "../actions/actionTypes";

export default function characterReducer(state = {}, action) {
  switch (action.type) {
    case GET_CHARACTERS_SUCCESS: {
      const { charactersData, userData } = action.data;
      return { charactersData, userData };
    }
    case GET_CHARACTER_SUCCESS: {
      const { characterData, userData } = action.data;
      return {
        ...state,
        characterData,
        userData: {
          ...state.userData,
          ...userData,
        },
      };
    }
    default:
      return state;
  }
}
