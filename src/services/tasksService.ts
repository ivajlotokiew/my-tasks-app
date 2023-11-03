import axios from "axios";
import { Task } from "../features/tasks/tasksSlice";

const getAllTasksFromServer = (params: {}) =>
  axios.get(`/api/tasks`, {
    headers: { authorization: localStorage.getItem("authToken") },
    params,
  });

const getTaskFromServer = (id: number) =>
  axios.get(`/api/tasks/${id}`, {
    headers: { authorization: localStorage.getItem("authToken") },
  });

const getTodayTasksFromServer = () => axios.get(`/api/todayTasks`);

const getTasksByDirectoryFromServer = (id: number) =>
  axios.get(`/api/directories/${id}/tasks`);

const addTaskToServer = (params: void) =>
  axios.post(`/api/tasks`, params, {
    headers: { authorization: localStorage.getItem("authToken") },
  });

const editTaskToServer = (params: Task) =>
  axios.patch(`/api/tasks/${params.id}`, params, {
    headers: { authorization: localStorage.getItem("authToken") },
  });

const deleteTaskToServer = (params: Task) =>
  axios.delete(`/api/tasks/${params.id}`, {
    headers: { authorization: localStorage.getItem("authToken") },
    params,
  });

const deleteAllTasksToServer = () => axios.delete(`/api/tasks`);

export {
  getAllTasksFromServer,
  getTaskFromServer,
  getTodayTasksFromServer,
  addTaskToServer,
  editTaskToServer,
  deleteTaskToServer,
  deleteAllTasksToServer,
  getTasksByDirectoryFromServer,
};
