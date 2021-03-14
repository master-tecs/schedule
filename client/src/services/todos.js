import jwtDecode from "jwt-decode";
import axios from "./axios";
const url = "/todos";

export function getTodos(token) {
  return axios
    .get(`${url}`, { headers: { "x-auth-token": token } })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

export function postTodos(data, token) {
  const user = jwtDecode(token);
  const userId = user._id;

  return axios
    .post(
      `${url}`,
      {
        title: data.title,
        detail: data.detail,
        userId: userId,
      },
      { headers: { "x-auth-token": token } }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

export function putTodos(id, data, token) {
  const user = jwtDecode(token);
  const userId = user._id;
  return axios
    .put(
      `${url}/${id}`,
      {
        title: data.title,
        detail: data.detail,
        completed: data.completed,
        pinned: data.pinned,
        userId: userId,
        endDate: data.endDate,
      },
      { headers: { "x-auth-token": token } }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

export function deleteTodos(id, token) {
  return axios
    .delete(`${url}/${id}`, { headers: { "x-auth-token": token } })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}
// axios.post(`${url}`, {

// })
