import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import request from "axios";
import { Directory } from "../directories/directoriesSlice";

export interface User {
    id: number,
    directory?: Directory,
    firstName?: string,
    lastName?: string,
    username: string,
    password: string | null,
    imgURL: string | null,
}

export interface Task {
    id?: number,
    directoryId?: number,
    dir?: string,
    title: string,
    description?: string,
    date: string,
    important: boolean,
    completed: boolean,
    isLoading?: boolean,
}

interface iInitialState {
    user: User,
    tasks: Task[],
    todayTasks?: Task[],
    directories: Directory[],
    error: string | null,
    isLoading: boolean,
    count: number,
    todaysTasksCount: number,
    completedTasksCount: number,
    todaysCompletedTasksCount: number,
}

const initialState: iInitialState = {
    user: { id: 0, password: null, username: '', imgURL: '' },
    tasks: [],
    todayTasks: [],
    directories: [],
    isLoading: false,
    error: null,
    count: 0,
    todaysTasksCount: 0,
    completedTasksCount: 0,
    todaysCompletedTasksCount: 0,
};

export const fetchUser: any = createAsyncThunk('tasks/getUser',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/api/user/me")
            return data
        } catch (error) {
            return rejectWithValue("We couldn't load your tasks. Try again soon.");
        }
    });

export const fetchTasks: any = createAsyncThunk('tasks/getTasks',
    async (params: {}, { rejectWithValue }) => {
        try {
            let user;
            if (localStorage.getItem("authUser") !== null) {
                user = localStorage.getItem("authUser")
            }
            const id = user ? JSON.parse(user).id : null
            const { data } = await axios.get(`/api/tasks/${id}`, { params })
            return data
        } catch (error) {
            return rejectWithValue("We couldn't load your tasks. Try again soon.");
        }
    });

export const fetchTodayTasks: any = createAsyncThunk('tasks/getTodayTasks',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/todayTasks`)
            return data
        } catch (error) {
            return rejectWithValue("We couldn't load today tasks. Try again soon.");
        }
    });

export const addTaskAction: any = createAsyncThunk('tasks/addTasks',
    async (params, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await axios.post(`/api/tasks`, params)
            dispatch(fetchTodayTasks())

            return data;
        } catch (err) {
            if (request.isAxiosError(err) && err.response) {
                return rejectWithValue(err.response?.data.errors[0]);
            }

            return rejectWithValue("We couldn't add the new task. Try again soon.");
        }
    });

export const editTaskAction: any = createAsyncThunk('tasks/editTasks',
    async (params: Task, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await axios.patch(`/api/tasks/${params.id}`, params)
            dispatch(fetchTodayTasks())
            return data;
        } catch (err) {
            if (request.isAxiosError(err) && err.response) {
                return rejectWithValue(err.response?.data.errors[0]);
            }

            return rejectWithValue("We couldn't add the new task. Try again soon.");
        }
    });

export const deleteTaskAction: any = createAsyncThunk('tasks/deleteTasks',
    async (params: Task, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await axios.delete(`/api/tasks/${params.id}`)
            dispatch(fetchTodayTasks())
            return data
        } catch (err) {
            if (request.isAxiosError(err) && err.response) {
                return rejectWithValue(err.response?.data.errors[0]);
            }

            return rejectWithValue("The item failed to delete, please try again later.");
        }
    });

export const deleteAllTasksAction: any = createAsyncThunk('tasks/deleteAllTasks',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`/api/tasks`)
            return data
        } catch (error) {
            return rejectWithValue("We couldn't delete the all tasks. Try again soon.");
        }
    });

export const fetchTasksByDirectory: any = createAsyncThunk('tasks/fetchTasksByDirectory',
    async (id: any, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/directories/${id}/tasks`)
            return data;
        } catch (error) {
            return rejectWithValue("We couldn't get the directory tasks. Try again soon.");
        }
    });

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.error = null;
                state.count = payload.allTasksCount;
                state.todaysTasksCount = payload.todaysTasksCount;
                state.todaysCompletedTasksCount = payload.todaysCompletedTasksCount;
                state.completedTasksCount = payload.completedTasksCount;
            })
            .addCase(fetchUser.rejected, (state, { payload }) => {
                state.error = payload.name
            })
            .addCase(fetchTasks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, { payload }) => {
                state.tasks = payload.tasks;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchTasks.rejected, (state, { payload }) => {
                state.error = payload.name
                state.isLoading = false;
            })
            .addCase(fetchTodayTasks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTodayTasks.fulfilled, (state, { payload }) => {
                state.todayTasks = payload.tasks;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchTodayTasks.rejected, (state, { payload }) => {
                state.error = payload.name
                state.isLoading = false;
            })
            .addCase(fetchTasksByDirectory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTasksByDirectory.fulfilled, (state, { payload }) => {
                state.tasks = payload.tasks;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchTasksByDirectory.rejected, (state, { payload }) => {
                state.error = payload.name
                state.isLoading = false;
            })
            .addCase(addTaskAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addTaskAction.fulfilled, (state, { payload }) => {
                const newTask = payload.task;
                state.tasks.push(newTask)
                state.isLoading = false;
                state.error = null;
                state.count = payload.allTasksCount;
                state.todaysTasksCount = payload.todaysTasksCount;
                state.todaysCompletedTasksCount = payload.todaysCompletedTasksCount;
                state.completedTasksCount = payload.completedTasksCount;
            })
            .addCase(addTaskAction.rejected, (state, { payload }) => {
                state.error = payload
                state.isLoading = false;
            })
            .addCase(editTaskAction.pending, (state, { meta: { arg } }) => {
                const id = arg.id;
                const task = state.tasks.find(task => task.id === id)!
                task.isLoading = true
            })
            .addCase(editTaskAction.fulfilled, (state, { payload }) => {
                const id = payload.task.id;
                const task = state.tasks.find(task => task.id === id)!
                const index = state.tasks.indexOf(task);
                state.tasks[index] = payload.task
                task.isLoading = false;
                state.error = null;
                state.todaysTasksCount = payload.todaysTasksCount;
                state.todaysCompletedTasksCount = payload.todaysCompletedTasksCount;
                state.completedTasksCount = payload.completedTasksCount;
            })
            .addCase(editTaskAction.rejected, (state, { payload, meta }) => {
                const id = meta.arg.id;
                const task = state.tasks.find(task => task.id === id)!
                task.isLoading = false
                state.error = payload
                state.isLoading = false;
            })
            .addCase(deleteTaskAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTaskAction.fulfilled, (state, { payload }) => {
                state.tasks = payload.tasks
                state.isLoading = false
                state.error = null
                state.count = payload.allTasksCount;
                state.todaysTasksCount = payload.todaysTasksCount;
                state.todaysCompletedTasksCount = payload.todaysCompletedTasksCount;
                state.completedTasksCount = payload.completedTasksCount;
            })
            .addCase(deleteTaskAction.rejected, (state, { payload, meta }) => {
                const id = meta.arg.id;
                const task = state.tasks.find(task => task.id === id)!
                task.isLoading = false
                state.error = payload
                state.isLoading = false;
            })
            .addCase(deleteAllTasksAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAllTasksAction.fulfilled, (state, { payload }) => {
                state.tasks = payload.tasks
                state.isLoading = false;
                state.error = null;
            })
            .addCase(deleteAllTasksAction.rejected, (state, { payload }) => {
                state.error = payload.name
                state.isLoading = false;
            })
    },
})


export default tasksSlice.reducer

export const { clearError } = tasksSlice.actions

export const showTasks = (state: any) => state.tasks.tasks

export const showTodayTasks = (state: any) => state.tasks.todayTasks

export const showError = (state: any) => state.tasks.error

export const isLoading = (state: any) => state.tasks.isLoading

export const isLoadingActionOnTask = (id: number) =>
    (state: any) => state.tasks.tasks.find((task: Task) => task.id === id)?.isLoading

export const showTasksCount = (state: any) => state.tasks.count

export const showTodaysTasksCount = (state: any) => state.tasks.todaysTasksCount

export const showTodayCompletedTasksCount = (state: any) => state.tasks.todaysCompletedTasksCount

export const showCompletedTasksCount = (state: any) => state.tasks.completedTasksCount
