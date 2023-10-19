import cookie from "js-cookie";

// Set Cookie
export const setCookie = (key, value) => {
  cookie.set(key, value, {
    expires: 365,
    path: "/"
  });
};

// Get Cookie
export const getCookie = (key) => {
  return cookie.get(key);
};

// Remove Cookie
export const removeCookie = (key) => {
  cookie.remove(key, {
    expires: 365
  });
};
