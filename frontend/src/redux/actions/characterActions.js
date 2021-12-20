import {
  GET_CHARACTER_SUCCESS,
  GET_CHARACTERS_SUCCESS,
  GET_CHARACTERS_PAGE_SUCCESS,
  CLEAR_CHARACTERS,
} from "./actionTypes";
import { tokenExpired } from "./authActions";
import * as API from "../../utils/api";

export function getCharactersSuccess({ data }) {
  return { type: GET_CHARACTERS_SUCCESS, data };
}

export function getCharacterSuccess({ data }) {
  return { type: GET_CHARACTER_SUCCESS, data };
}

export function getCharactersPageSuccess({ data }) {
  return { type: GET_CHARACTERS_PAGE_SUCCESS, data };
}

export function clearCharacters() {
  return { type: CLEAR_CHARACTERS };
}

export function getCharacters() {
  return function (dispatch) {
    return API.getCharacters().then(async (response) => {
      const { status } = response;
      if (status === 200) {
        const data = await response.json();
        return dispatch(getCharactersSuccess(data));
      }
      if (status === 401 || status === 403) {
        return dispatch(tokenExpired());
      }
      const data = await response.json();
      throw new Error(data.msg);
    });
  };
}

export function getCharacter(id) {
  return function (dispatch) {
    return API.getCharacter(id).then(async (response) => {
      const { status } = response;
      if (status === 200) {
        const data = await response.json();
        return dispatch(getCharacterSuccess(data));
      }
      if (status === 401 || status === 403) {
        return dispatch(tokenExpired());
      }
      const data = await response.json();
      throw new Error(data.msg);
    });
  };
}

export function getCharactersPage(page) {
  return function (dispatch) {
    return API.getCharactersPage(page).then(async (response) => {
      const { status } = response;
      if (status === 200) {
        const data = await response.json();
        return dispatch(getCharactersPageSuccess(data));
      }
      if (status === 401 || status === 403) {
        return dispatch(tokenExpired());
      }
      const data = await response.json();
      throw new Error(data.msg);
    });
  };
}
