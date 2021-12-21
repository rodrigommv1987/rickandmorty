import { UPDATE_FAVORITE_SUCCESS } from "./actionTypes";
import * as API from "../../utils/api";

export function updateFavoriteSuccess({ data }) {
  return { type: UPDATE_FAVORITE_SUCCESS, data };
}

export function updateFavorite(id, value) {
  return function (dispatch) {
    return API.updateFavorite(id, value)
      .then((response) => {
        dispatch(updateFavoriteSuccess(response));
      })
      .catch((error) => console.log(error));
  };
}
