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

interface iTaskLoading {
    tasksIsLoading: boolean,
    addedTaskIsLoading: boolean,
    editedTaskIsLoading: boolean,
    deletedTaskIsLoading: boolean,
    allDeletedTasksIsLoading: boolean,
}

interface iInitialState {
    tasks: Task[],
    directories: Directory[],
    error: string | null,
    isLoading: iTaskLoading,
}



const initialState: iInitialState = {
    tasks: [],
    directories: [],
    isLoading: {
        tasksIsLoading: false,
        addedTaskIsLoading: false,
        allDeletedTasksIsLoading: false,
        deletedTaskIsLoading: false,
        editedTaskIsLoading: false
    },
    error: null,
};

export const fetchTasks: any = createAsyncThunk('tasks/getTasks',
    async (params: {}, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/tasks`, { params })
            return data.tasks;
        } catch (error) {
            return rejectWithValue("We couldn't load your tasks. Try again soon.");
        }
    });

export const addTaskAction: any = createAsyncThunk('tasks/addTasks',
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`/api/tasks`, params)
            return data.task;
        } catch (error) {
            return rejectWithValue("We couldn't add the new task. Try again soon.");
        }
    });

export const editTaskAction: any = createAsyncThunk('tasks/editTasks',
    async (params: Task, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`/api/tasks/${params.id}`, params)
            return data.task;
        } catch (error) {
            return rejectWithValue("We couldn't edit the task. Try again soon.");
        }
    });

export const deleteTaskAction: any = createAsyncThunk('tasks/deleteTasks',
    async (params: Task, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`/api/tasks/${params.id}`)
            return data.tasks;
        } catch (error) {
            return rejectWithValue("We couldn't delete the task. Try again soon.");
        }
    });

export const deleteAllDataAction: any = createAsyncThunk('tasks/deleteAllTasks',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`/api/tasks`)
            return data.tasks;
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
            .addCase(fetchTasks.pending, (state) => {
                state.isLoading.tasksIsLoading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, { payload }) => {
                state.tasks = payload;
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
                const newTask = payload;
                state.tasks.push(newTask)
                state.isLoading.addedTaskIsLoading = false;
                state.error = null;
            })
            .addCase(addTaskAction.rejected, (state, { payload }) => {
                state.error = payload.name
                state.isLoading.addedTaskIsLoading = false;
            })
            .addCase(editTaskAction.pending, (state) => {
                state.isLoading.editedTaskIsLoading = true;
            })
            .addCase(editTaskAction.fulfilled, (state, { payload }) => {
                const id = payload.id;
                const task = state.tasks.find(task => task.id === id)!
                const index = state.tasks.indexOf(task);
                state.tasks[index] = payload
                state.isLoading.editedTaskIsLoading = false;
                state.error = null;
            })
            .addCase(editTaskAction.rejected, (state, { payload }) => {
                state.error = payload.name
                state.isLoading.editedTaskIsLoading = false;
            })
            .addCase(deleteTaskAction.pending, (state) => {
                state.isLoading.deletedTaskIsLoading = true;
            })
            .addCase(deleteTaskAction.fulfilled, (state, { payload }) => {
                state.tasks = payload
                state.isLoading.deletedTaskIsLoading = false;
                state.error = null;
            })
            .addCase(deleteTaskAction.rejected, (state, { payload }) => {
                state.error = payload.name
                state.isLoading.deletedTaskIsLoading = false;
            })
            .addCase(deleteAllDataAction.pending, (state) => {
                state.isLoading.allDeletedTasksIsLoading = true;
            })
            .addCase(deleteAllDataAction.fulfilled, (state, { payload }) => {
                state.tasks = payload
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

export const showTasks = (state: any) => state.tasks.tasks

export const getCompletedTasks = (state: any) => state.tasks.tasks?.filter((task: Task) => task.completed)


export const getUncompletedTasks = (state: any) => state.tasks.tasks?.filter((task: Task) => !task.completed)

export const getImportantTasks = (state: any) => state.tasks.tasks?.filter((task: Task) => task.important)

export const getError = (state: any) => state.tasks.error

export const isLoading = (state: any) => state.tasks.isLoading.tasksIsLoading

export const getTodayTasks = (state: any) => {
    const todayDate = new Date()
    const day = todayDate.getDate().toString().padStart(2, '0')
    const month = (todayDate.getMonth() + 1).toString().padStart(2, '0')
    const year = todayDate.getFullYear()

    const todayToStr: string = `${year}-${month}-${day}`

    return state.tasks.tasks.filter((task: Task) => task.created === todayToStr)
}
