export const saveUserId = (userId) => {
  // document.cookie = `userId=${userId}; SameSite=None; Secure; path=/;`;
  document.cookie = `userId=${userId}; max-age=${60*60*24*7}; SameSite=None; Secure; path=/; domain=nomoredomains.monster;`;
}

export const getUserId = () => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("userId=")) {
      return cookie.substring("userId=".length, cookie.length);
    }
  }
  return null;
};

export const deleteUserId = () => {
  document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=nomoredomains.monster;";
}

export const saveToken = (token) => {
  // document.cookie = `token=${token}; SameSite=None; Secure; path=/;`;
  document.cookie = `token=${token}; max-age=${60*60*24*7}; SameSite=None; Secure; path=/; domain=nomoredomains.monster;`;
}

export const getToken = () => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("token=")) {
      return cookie.substring("token=".length, cookie.length);
    }
  }
  return null;
};

export const deleteToken = () => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=nomoredomains.monster;";
};
