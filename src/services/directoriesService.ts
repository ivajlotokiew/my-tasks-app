import axios from "axios";
import { Directory } from "../features/directories/directoriesSlice";

const getAllDirectoriesFromServer = (params: {}) =>
  axios.get(`/api/directories`, {
    headers: { authorization: localStorage.getItem("authToken") },
    params,
  });

const addDirectoryToServer = (params: {}) =>
  axios.post(`/api/directories`, params, {
    headers: { authorization: localStorage.getItem("authToken") },
  });

const editDirectoryToServer = (params: Directory) =>
  axios.patch(`/api/directories/${params.id}`, params);

const deleteDirectoryToServer = (params: Directory) =>
  axios.delete(`/api/directories/${params.id}`);

const deleteAllDirectoriesToServer = () => axios.delete(`/api/directories`);

export {
  getAllDirectoriesFromServer,
  addDirectoryToServer,
  editDirectoryToServer,
  deleteDirectoryToServer,
  deleteAllDirectoriesToServer,
};
