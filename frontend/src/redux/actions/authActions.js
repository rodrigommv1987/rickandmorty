import { TOKEN_EXPIRED } from "./actionTypes";

export function tokenExpired() {
  return { type: TOKEN_EXPIRED, tokenHasExpired: true };
}
