import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./features/tasks/tasksSlice";
import directoriesReducer from "./features/directories/directoriesSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    directories: directoriesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
