import { TOKEN_EXPIRED } from "../actions/actionTypes";

export default function authReducer(state = {}, action) {
  switch (action.type) {
    case TOKEN_EXPIRED: {
      const { tokenHasExpired } = action;
      return { tokenHasExpired };
    }
    default:
      return state;
  }
}
