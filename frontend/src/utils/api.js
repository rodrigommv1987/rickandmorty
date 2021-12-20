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

  return res;
}

export async function getCharactersPage(number) {
  const token = userStorage.getToken();
  const res = await callApi({
    path: `/characters/page/${number}`,
    method: "GET",
    token,
  });

  return res;
}

export async function getCharacter(id) {
  const token = userStorage.getToken();
  const res = await callApi({
    path: `/characters/${id}`,
    method: "GET",
    token,
  });

  return res;
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

async function callApi({ path, method, payload = null, token = null }) {
  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
    method,
  };

  if (token) opts.headers["x-access-token"] = token;
  if (payload) opts.body = JSON.stringify(payload);

  try {
    const response = await fetch(`${REACT_APP_BACKEND_URL}${path}`, opts);
    return response;
  } catch (error) {
    const msg = "Network Error";
    const body = new Blob([JSON.stringify({ msg })], {
      type: "application/json",
    });
    return new Response(body, {
      status: 500,
      statusText: msg,
    });
  }
}
