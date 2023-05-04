import { API_URL, API_URL_DEV } from "./constants";

const apiHeaders = { "Content-Type": "application/json" }
const isDevelopment = process.env.NODE_ENV === "development";


export const apiGetMe = async () => {
  return await fetch(`${isDevelopment ? API_URL_DEV : API_URL}/users/me`, {
    method: "GET",
    credentials: "include"
  });
};

export const apiUpdateUser = async (name, email) => {
  return await fetch(`${isDevelopment ? API_URL_DEV : API_URL}/users/me`, {
    method: "PATCH",
    credentials: "include",
    headers: apiHeaders,
    body: JSON.stringify({ name, email }),
  });
};

export const apiGetMovies = async () => {
  return await fetch(`${isDevelopment ? API_URL_DEV : API_URL}/movies/`, {
    method: "GET",
    credentials: "include",
    headers: apiHeaders,
  });
};

export const apiCreateMovie = async (movieData) => {
  return await fetch(`${isDevelopment ? API_URL_DEV : API_URL}/movies/`, {
    method: "POST",
    credentials: "include",
    headers: apiHeaders,
    body: JSON.stringify(movieData),
  });
};

export const apiDeleteMovie = async (_id) => {
  return await fetch(`${isDevelopment ? API_URL_DEV : API_URL}/movies/${_id}`, {
    method: "DELETE",
    credentials: "include",
    headers: apiHeaders,
  });
};

export const apiSignUp = async (name, email, password) => {
  return await fetch(`${isDevelopment ? API_URL_DEV : API_URL}/signup`, {
    method: "POST",
    headers: apiHeaders,
    body: JSON.stringify({ name, email, password }),
  });
};

export const apiSignIn = async (email, password) => {
  return await fetch(`${isDevelopment ? API_URL_DEV : API_URL}/signin`, {
    method: "POST",
    headers: apiHeaders,
    body: JSON.stringify({ email, password }),
  });
};

export const apiSignOut = async () => {
  return await fetch(`${isDevelopment ? API_URL_DEV : API_URL}/signout`, {
    method: "POST",
    headers: apiHeaders,
    credentials: "include"
  });
};
