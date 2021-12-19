import { GET_CHARACTER_SUCCESS, GET_CHARACTERS_SUCCESS } from "./actionTypes";
import * as API from "../../utils/api";

export function getCharactersSuccess({ data }) {
  return { type: GET_CHARACTERS_SUCCESS, data };
}

export function getCharacterSuccess({ data }) {
  return { type: GET_CHARACTER_SUCCESS, data };
}

export function getCharacters() {
  return function (dispatch) {
    return API.getCharacters()
      .then((response) => {
        dispatch(getCharactersSuccess(response));
      })
      .catch((error) => console.log(error));
  };
}

export function getCharacter(id) {
  return function (dispatch) {
    return API.getCharacter(id)
      .then((response) => {
        dispatch(getCharacterSuccess(response));
      })
      .catch((error) => console.log(error));
  };
}
