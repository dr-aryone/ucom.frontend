export const saveToken = (token) => {
  try {
    localStorage.setItem('token', token);
  } catch (e) {
    console.error(e);
  }
};

export const getToken = () => {
  try {
    return localStorage.getItem('token');
  } catch (e) {
    return null;
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem('token');
  } catch (e) {
    console.error(e);
  }
};

// export const getCookie = (name) => {
//   const value = `; + ${document.cookie}`;
//   const parts = value.split("; " + name + "=");
//   if (parts.length == 2) return parts.pop().split(";").shift();
// }

