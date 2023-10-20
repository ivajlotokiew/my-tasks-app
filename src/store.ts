import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./features/tasks/tasksSlice";
import directoriesReducer from "./features/directories/directoriesSlice";
import authenticationReducer from "./features/authentication/authenticationSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    directories: directoriesReducer,
    authentication: authenticationReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
