import userStorage from "./userStorage";

const { REACT_APP_BACKEND_URL } = process.env;

export async function login(payload) {
  const res = await callApi({
    path: "/login",
    method: "POST",
    payload,
  });

  return res.json();
}

export async function register(payload) {
  const res = await callApi({
    path: "/register",
    method: "POST",
    payload,
  });

  return res.json();
}

export async function validateToken(payload) {
  const res = await callApi({
    path: "/validateToken",
    method: "POST",
    payload,
  });

  return res.json();
}

export async function getCharacters() {
  const token = userStorage.getToken();
  const res = await callApi({
    path: "/characters",
    method: "GET",
    token,
  });

  return res.json();
}

export async function getCharacter(id) {
  const token = userStorage.getToken();
  const res = await callApi({
    path: `/characters/${id}`,
    method: "GET",
    token,
  });

  return res.json();
}

export async function updateFavorite(id, value) {
  const token = userStorage.getToken();
  const res = await callApi({
    path: `/favorites/${id}/${value}`,
    method: "PATCH",
    token,
  });

  return res.json();
}

function callApi({ path, method, payload = null, token = null }) {
  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
    method,
  };

  if (token) opts.headers["x-access-token"] = token;
  if (payload) opts.body = JSON.stringify(payload);

  try {
    return fetch(`${REACT_APP_BACKEND_URL}${path}`, opts);
  } catch (error) {
    return {
      success: false,
      msg: "Could not reach server",
    };
  }
}
