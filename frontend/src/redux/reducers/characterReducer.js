import {
  GET_CHARACTER_SUCCESS,
  GET_CHARACTERS_SUCCESS,
  GET_CHARACTERS_PAGE_SUCCESS,
  CLEAR_CHARACTERS,
} from "../actions/actionTypes";

export default function characterReducer(state = {}, action) {
  switch (action.type) {
    case GET_CHARACTERS_SUCCESS: {
      const { charactersData } = action.data;
      return {
        charactersData,
      };
    }
    case GET_CHARACTER_SUCCESS: {
      const { characterData } = action.data;
      return {
        characterData,
      };
    }
    case CLEAR_CHARACTERS: {
      return {};
    }
    case GET_CHARACTERS_PAGE_SUCCESS: {
      const { charactersData } = action.data;
      return {
        ...state,
        charactersData: {
          ...state.characterData,
          characters: [
            ...state.charactersData.characters,
            ...charactersData.characters,
          ],
          pages: charactersData.pages,
        },
      };
    }
    default:
      return state;
  }
}
