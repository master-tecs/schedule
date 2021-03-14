import axios from "./axios";
const user = "/users";
const auth = "/auth";

export const registerUsers = async (user) => {
  return await axios
    .post(`${user}`, user)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error.response);
      return error;
    });
};

export const getCurentUser = async (token) => {
  return await axios
    .get(`${user}/me`, { headers: { "x-auth-token": token } })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error.response);
      return error;
    });
};

export const loginUser = async (user) => {
  return await axios
    .post(`${auth}`, user)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error.response);
      return error;
    });
};

// export function getUsers() {
//   return axios
//     .get(`${url}`)
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));
// }
