const baseURL = "http://localhost:3000";

export const saveToken = (token) => {
  try {
    localStorage.setItem("token", token);
  } catch (err) {
    console.error("Could not save token", err);
  }
};

export const loadToken = () => {
  try {
    const token = localStorage.getItem("token");
    return token ? token : null;
  } catch (err) {
    console.error("Could not load token", err);
    return null;
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem("token");
  } catch (err) {
    console.error("Could not remove token", err);
  }
};

export { baseURL };
