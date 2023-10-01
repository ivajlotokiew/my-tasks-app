import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export interface User {
    id: number,
    name: string,
    imgURL: string,
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
}

export interface Directory {
    id: number;
    name: string;
}

interface iTaskLoading {
    tasksIsLoading: boolean,
    addedTaskIsLoading: boolean,
    editedTaskIsLoading: boolean,
    deletedTaskIsLoading: boolean,
    allDeletedTasksIsLoading: boolean,
    userIsLoading: boolean,
}

interface iInitialState {
    user: User,
    tasks: Task[],
    directories: Directory[],
    error: string | null,
    isLoading: iTaskLoading,
    count: number,
    todaysTasksCount: number,
    completedTasksCount: number,
    todaysCompletedTasksCount: number,
}

const initialState: iInitialState = {
    user: { id: 0, name: '', imgURL: '' },
    tasks: [],
    directories: [],
    isLoading: {
        tasksIsLoading: false,
        addedTaskIsLoading: false,
        allDeletedTasksIsLoading: false,
        deletedTaskIsLoading: false,
        editedTaskIsLoading: false,
        userIsLoading: false,
    },
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
            const { data } = await axios.get(`/api/tasks`, { params })
            return data
        } catch (error) {
            return rejectWithValue("We couldn't load your tasks. Try again soon.");
        }
    });

export const addTaskAction: any = createAsyncThunk('tasks/addTasks',
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`/api/tasks`, params)
            return data;
        } catch (error) {
            return rejectWithValue("We couldn't add the new task. Try again soon.");
        }
    });

export const editTaskAction: any = createAsyncThunk('tasks/editTasks',
    async (params: Task, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`/api/tasks/${params.id}`, params)
            return data;
        } catch (error) {
            return rejectWithValue("We couldn't edit the task. Try again soon.");
        }
    });

export const deleteTaskAction: any = createAsyncThunk('tasks/deleteTasks',
    async (params: Task, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`/api/tasks/${params.id}`)
            return data
        } catch (error) {
            return rejectWithValue("We couldn't delete the task. Try again soon.");
        }
    });

export const deleteAllDataAction: any = createAsyncThunk('tasks/deleteAllTasks',
    async (_, { rejectWithValue }) => {
        try {
            debugger
            const { data } = await axios.delete(`/api/tasks`)
            return data
        } catch (error) {
            return rejectWithValue("We couldn't delete the all tasks. Try again soon.");
        }
    });

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.isLoading.userIsLoading = true;
            })
            .addCase(fetchUser.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.error = null;
                state.isLoading.userIsLoading = false;
                state.count = payload.allTasksCount;
                state.todaysTasksCount = payload.todaysTasksCount;
                state.todaysCompletedTasksCount = payload.todaysCompletedTasksCount;
                state.completedTasksCount = payload.completedTasksCount;
            })
            .addCase(fetchUser.rejected, (state, { payload }) => {
                state.error = payload.name
                state.isLoading.userIsLoading = false;
            })
            .addCase(fetchTasks.pending, (state) => {
                state.isLoading.tasksIsLoading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, { payload }) => {
                state.tasks = payload.tasks;
                state.isLoading.tasksIsLoading = false;
                state.error = null;
            })
            .addCase(fetchTasks.rejected, (state, { payload }) => {
                state.error = payload.name
                state.isLoading.tasksIsLoading = false;
            })
            .addCase(addTaskAction.pending, (state) => {
                state.isLoading.addedTaskIsLoading = true;
            })
            .addCase(addTaskAction.fulfilled, (state, { payload }) => {
                const newTask = payload.task;
                state.tasks.push(newTask)
                state.isLoading.addedTaskIsLoading = false;
                state.error = null;
                state.count = payload.allTasksCount;
                state.todaysTasksCount = payload.todaysTasksCount;
                state.todaysCompletedTasksCount = payload.todaysCompletedTasksCount;
                state.completedTasksCount = payload.completedTasksCount;
            })
            .addCase(addTaskAction.rejected, (state, { payload }) => {
                state.error = payload.name
                state.isLoading.addedTaskIsLoading = false;
            })
            .addCase(editTaskAction.pending, (state) => {
                state.isLoading.editedTaskIsLoading = true;
            })
            .addCase(editTaskAction.fulfilled, (state, { payload }) => {
                const id = payload.task.id;
                const task = state.tasks.find(task => task.id === id)!
                const index = state.tasks.indexOf(task);
                state.tasks[index] = payload.task
                state.isLoading.editedTaskIsLoading = false;
                state.error = null;
                state.todaysTasksCount = payload.todaysTasksCount;
                state.todaysCompletedTasksCount = payload.todaysCompletedTasksCount;
                state.completedTasksCount = payload.completedTasksCount;
            })
            .addCase(editTaskAction.rejected, (state, { payload }) => {
                state.error = payload.name
                state.isLoading.editedTaskIsLoading = false;
            })
            .addCase(deleteTaskAction.pending, (state) => {
                state.isLoading.deletedTaskIsLoading = true;
            })
            .addCase(deleteTaskAction.fulfilled, (state, { payload }) => {
                state.tasks = payload.tasks
                state.isLoading.deletedTaskIsLoading = false
                state.error = null
                state.count = payload.allTasksCount;
                state.todaysTasksCount = payload.todaysTasksCount;
                state.todaysCompletedTasksCount = payload.todaysCompletedTasksCount;
                state.completedTasksCount = payload.completedTasksCount;
            })
            .addCase(deleteTaskAction.rejected, (state, { payload }) => {
                state.error = payload.name
                state.isLoading.deletedTaskIsLoading = false;
            })
            .addCase(deleteAllDataAction.pending, (state) => {
                state.isLoading.allDeletedTasksIsLoading = true;
            })
            .addCase(deleteAllDataAction.fulfilled, (state, { payload }) => {
                state.tasks = payload.tasks
                state.isLoading.allDeletedTasksIsLoading = false;
                state.error = null;
            })
            .addCase(deleteAllDataAction.rejected, (state, { payload }) => {
                state.error = payload.name
                state.isLoading.allDeletedTasksIsLoading = false;
            })
    },
})

export default tasksSlice.reducer

export const showUserData = (state: any) => state.tasks.user

export const showTasks = (state: any) => state.tasks.tasks

export const getError = (state: any) => state.tasks.error

export const isLoading = (state: any) => state.tasks.isLoading.tasksIsLoading

export const isLoadingAddedTask = (state: any) => state.tasks.isLoading.addedTaskIsLoading

export const isLoadingEditedTask = (state: any) => state.tasks.isLoading.editedTaskIsLoading

export const isLoadingDeletedTask = (state: any) => state.tasks.isLoading.deletedTaskIsLoading

export const isLoadingAllDeletedTasks = (state: any) => state.tasks.isLoading.allDeletedTasksIsLoading

export const isLoadingUserData = (state: any) => state.tasks.isLoading.userIsLoading

export const showTasksCount = (state: any) => state.tasks.count

export const showTodaysTasksCount = (state: any) => state.tasks.todaysTasksCount

export const showTodayCompletedTasksCount = (state: any) => state.tasks.todaysCompletedTasksCount

export const showCompletedTasksCount = (state: any) => state.tasks.completedTasksCount
