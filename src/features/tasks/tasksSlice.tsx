import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export interface Task {
    id?: number;
    directoryId?: number;
    dir?: string;
    title: string;
    description?: string;
    created: string;
    important: boolean;
    completed: boolean;
}

export interface Directory {
    id: number;
    name: string;
}

interface iInitialState {
    tasks: Task[],
    directories: Directory[],
}

const initialState: iInitialState = {
    tasks: [],
    directories: [],
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //   .addCase(fetchTasks.pending, (state) => {
            //     state.isLoading = true;
            //     state.error = {} as ServerError;
            //   })
            .addCase(fetchTasks.fulfilled, (state, { payload }) => {
                state.tasks = payload;
                // state.count = payload.count;
                // state.isLoading = false;
                // state.error = {} as ServerError;
            })
            //   .addCase(fetchTasks.rejected, (state, { payload }) => {
            //     const msg = payload.message
            //     const status = payload.response.status
            //     state.error = { statusCode: Number(status), description: msg };
            //     state.isLoading = false;
            //   });
            .addCase(addTaskReducer.fulfilled, (state, { payload }) => {
                const newTask = payload;
                state.tasks.push(newTask)
                // state.count = payload.count;
                // state.isLoading = false;
                // state.error = {} as ServerError;
            })
            .addCase(editTaskReducer.fulfilled, (state, { payload }) => {
                const id = payload.id;
                const task = state.tasks.find(task => task.id === id)!
                const index = state.tasks.indexOf(task);
                state.tasks[index] = payload
                // state.count = payload.count;
                // state.isLoading = false;
                // state.error = {} as ServerError;
            })
            .addCase(deleteTaskReducer.fulfilled, (state, { payload }) => {
                state.tasks = payload
                // state.count = payload.count;
                // state.isLoading = false;
                // state.error = {} as ServerError;
            })
    },
})

export const fetchTasks: any = createAsyncThunk('tasks/gatTasks',
    async (params: {}, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/tasks`, { params })
            return data.tasks;
        } catch (error) {
            return rejectWithValue(error);
        }
    });

export const addTaskReducer: any = createAsyncThunk('tasks/addTasks',
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`/api/tasks`, params)
            return data.task;
        } catch (error) {
            return rejectWithValue(error);
        }
    });

export const editTaskReducer: any = createAsyncThunk('tasks/editTasks',
    async (params: Task, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`/api/tasks/${params.id}`, params)
            return data.task;
        } catch (error) {
            return rejectWithValue(error);
        }
    });

export const deleteTaskReducer: any = createAsyncThunk('tasks/deleteTasks',
    async (params: Task, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`/api/tasks/${params.id}`)
            return data.tasks;
        } catch (error) {
            return rejectWithValue(error);
        }
    });

export const deleteAllDataReducer: any = createAsyncThunk('tasks/deleteTasks',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`/api/tasks`)
            return data.tasks;
        } catch (error) {
            return rejectWithValue(error);
        }
    });

export default tasksSlice.reducer

export const showTasks = (state: any) => state.tasks.tasks

export const getCompletedTasks = (state: any) => state.tasks.tasks?.filter((task: Task) => task.completed)

export const getUncompletedTasks = (state: any) => state.tasks.tasks?.filter((task: Task) => !task.completed)

export const getImportantTasks = (state: any) => state.tasks.tasks?.filter((task: Task) => task.important)

export const getTodayTasks = (state: any) => {
    const todayDate = new Date()
    const day = todayDate.getDate().toString().padStart(2, '0')
    const month = (todayDate.getMonth() + 1).toString().padStart(2, '0')
    const year = todayDate.getFullYear()

    const todayToStr: string = `${year}-${month}-${day}`

    return state.tasks.tasks.filter((task: Task) => task.created === todayToStr)
}
